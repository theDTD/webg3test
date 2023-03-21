package com.valore.checkout

import com.valore.data.cart.ShippingType
import com.valore.util.ApiUtil
import com.valore.util.ProductUrlUtil
import groovy.time.TimeCategory
import org.apache.http.HttpStatus

class CartController {
    def cartService
    def trackingService
    def encryptedCookieService

    def index() {
        def cartId = cartService.getCartIdFromCookie(false)
        def cart = cartService.getCart(cartId)
        if (cart?.state == 'CHECKED_OUT'){
            log.error("Cannot view a CHECKED_OUT cart: ${cartId}")
            encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.cartId as String)
            cart = null
        }
        def totals = cartService.getTotals(cart?.items)

        def referer = request.getHeader("Referer")
        if (referer) {
            def url = new URL(referer)
            if (!grailsApplication.config.valore.cart.approvedReferers.contains(url.host)
                    || url.path.toLowerCase().contains('/cart')) {
                referer = null
            }
        }

        def rnaItemCount = cartService.getRNAItemCount(cart?.items)

//        trackingService.pageView( request, params )
        
        render (view:'/cart/index', model: [cart: cart, referer: referer, rnaItemCount: rnaItemCount] << totals)
    }

    def updateCartItem() {
        def json = [:]
        if(params.shippingMethod)
            json.shippingType = ShippingType.getShippingType(params.shippingMethod).id

        if(params.rentalTerm){
            //get new price
            def res = ApiUtil.get( path: 'cartItem/rentalPrice', id: params.id, query: [rentalTerm:params.rentalTerm])
            json.currentPrice = res.price
            json.consumerPrice = res.price
            json.rentalTerm = params.rentalTerm
        }

        render ApiUtil.put( path: 'cartItem', id: params.id, json: json)
    }

    def addItem() {
        def cartId = cartService.getCartIdFromCookie()

        def map = params
        map.remove("controller")
        map.remove("format")
        map.remove("action")

        if (map) {
            trackingService.enhancedEcommerceViewEvent(2)

            Date unlockTime
            if (grailsApplication.config.valore.cart.lockTime.item != 0) {
                use(TimeCategory) {
                    unlockTime = new Date() + grailsApplication.config.valore.cart.lockTime.item.minutes
                }
            }

            map['shippingType'] = ShippingType.getShippingType(params.shippingType).id
            map['cart'] = cartId
            map['quantity'] = map['quantity'] ?: 1
            map['product'] = map['product_id']
            map['renterMarketId'] = map['listing_id']
            map['sellerMarketId'] = map['sellerMarket_id']
            if (map['term']) {
                map['rentalTerm'] = map['term']
            } else {
                map.remove('semesterRentalPrice')
            }

            //create the cartItem
            def addedItem = ApiUtil.post(path: 'cartItem', json: map)
            if (!addedItem) {
                def cart = cartService.getCart(cartId)
                if (cart?.state == 'CHECKED_OUT'){
                    log.error("Cannot add item to a CHECKED_OUT cart: ${cartId}")
                    encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.cartId as String)
                }

                def details = ApiUtil.get(path: 'productDetails', id: map.isbn)
                redirect uri: details ? ProductUrlUtil.generateURL(details.name, details.edition, map.isbn) : '/',
                        base: grailsApplication.config.valore.legacyUrl
                return
            }

            def cart = cartService.getCart(cartId)
            def totals = cartService.getTotals(cart?.items)
            def rnaItemCount = cartService.getRNAItemCount(cart?.items)

            // gets new items full information from cart
//            def fullItem = cart.items.find {
//                it.id == addedItem.id
//            }
//            def segmentEvent = fullItem ? buildAddItemSegmentModel( fullItem, totals ) : null
//            if( segmentEvent ) trackingService.trackEvent( request, segmentEvent.eventName, segmentEvent.attributes )

            def model = [cart: cart, addedItem: addedItem.id, rnaItemCount: rnaItemCount] << totals

//            trackingService.pageView( request, params )
            trackingService.enhancedEcommerceCompletionEvent(2)

            render (view: '/cart/index', model: model)
            return
        }

        redirect controller: 'cart', action: 'index'
    }

    def removeItem() {
        def cartId = cartService.getCartIdFromCookie(false)

        def resp = ApiUtil.get(path: 'cartItem/remove', id: params.id, query: [cart: cartId])

        if (resp != null)
            render status: HttpStatus.SC_OK
        else
            render status: HttpStatus.SC_BAD_REQUEST
    }

    def buildAddItemSegmentModel( def newItem, def totals ){
        [
        eventName : "Added Product",
        attributes: [
                name          : newItem.product.name.toString(),
                id            : newItem.productId.toString(),
                affiliation   : (newItem.sale ? "sale" : (newItem.RBB ? "drop ship rental" : (newItem.rental ? "rental" : ""))),
                isbn          : newItem.product.productCode.toString(),
                price         : newItem.currentPrice / 100,
                quantity      : newItem.quantity as int,
                seller        : newItem.seller?.marketUserUserName ?: null,
                ecomm_prodid  : newItem.productId.toString(),
                ecomm_pagetype: "cart",
                ecomm_totalvalue: totals.itemTotal / 100,
            ]
        ]
    }
}

