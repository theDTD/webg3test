package com.valore

import com.valore.checkout.CartService
import com.valore.util.ApiUtil
import com.valore.util.ISBNUtil
import grails.converters.JSON
import grails.util.Environment
import org.apache.http.HttpStatus

import java.text.SimpleDateFormat

class SellbackController {
    SellbackService sellbackService
    CartService cartService
    EncryptedCookieService encryptedCookieService

    def index() {
        if (Environment.current == Environment.PRODUCTION) {
            redirect(url: "/")
        } else {
            render view: '/sellback/index', model: getData()
        }
    }

    def addItem() {
        Long cartId = cartService.getSellbackCartIdFromCookie()

        def isbn13 = ISBNUtil.validateISBN(params.isbn)
        if (!isbn13) {
            render status: HttpStatus.SC_BAD_REQUEST, text: "An invalid ISBN was provided."
            return
        }

        Map map = [isbn: params.isbn, cartId: cartId, buybackPrice: params.int('buybackPrice')]
        def (json, status, text) = ApiUtil.post(path: 'sellbackCartItem', json: map, includeStatus: true)
        if (status != HttpStatus.SC_OK) {
            def cart = cartService.getSellbackCart(cartId)
            if (cart?.state == 'CHECKED_OUT') {
                log.error("Cannot add item to a CHECKED_OUT sellback cart: $cartId")
                encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.sellbackCartId as String)
            } else {
                log.error("An error occurred while adding an item to cart: $cartId")
                log.error("Error: $text")
            }

            if (text.equalsIgnoreCase("Obtained a quote of \$0 for the given ISBN")) {
                render status: status, text: text
                return
            }

            render status: status, text: "Cannot add item to cart $cartId"
            return
        }

        List cartItems = json.items
        List sortedCartItems = cartItems.sort { item1, item2 ->
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
            sdf.parse("$item2.dateCreated") <=> sdf.parse("$item1.dateCreated")
        }

        def firstCartItem = sortedCartItems.first()

        (json, status, text) = ApiUtil.post(
                path: 'productDetails',
                id: firstCartItem.product.productCode,
                includeStatus: true
        )

        if (status != HttpStatus.SC_OK) {
            log.error("An error occurred while trying to find product details for item: $firstCartItem.id")
            log.error("Error: $text")
            render status: status, text: "Cannot get product details for item $firstCartItem.id"
            return
        }

        firstCartItem.price = firstCartItem.price / 100
        if (firstCartItem.buybackPrice) {
            firstCartItem.buybackPrice = firstCartItem.buybackPrice / 100
        }

        render([addedItem: firstCartItem, productDetails: json] as JSON)
    }

    def removeItem() {
        def cartId = cartService.getSellbackCartIdFromCookie(false)

        def (json, status, text) = ApiUtil.post(path: 'sellbackCartItem/remove', id: params.id, json: [cartId: cartId],
                includeStatus: true)

        if (status == HttpStatus.SC_OK) {
            render status: HttpStatus.SC_OK
        } else {
            log.error("Error occurred while deleting item $params.id from cart: $text")
            render status: HttpStatus.SC_BAD_REQUEST
        }
    }

    def signIn(){
        if (Environment.current == Environment.PRODUCTION) {
            redirect(url: "/")
        } else {
            render view: '/sellback/sign-in', model: getData()
        }
    }

    def createAccount(){
        if (Environment.current == Environment.PRODUCTION) {
            redirect(url: "/")
        } else {
            render view: '/sellback/create-account'
        }
    }


    def payment(){
        if (Environment.current == Environment.PRODUCTION) {
            redirect(url: "/")
        } else {
            render view: '/sellback/payment', model: getData()}
    }

    def getData() {
        boolean isNotProduction = Environment.current != Environment.PRODUCTION
        String modifier = null

        if (isNotProduction && params.modifier) {
            modifier = params.modifier
        } else {
            String host = new URI("$request.requestURL").host
            if (host.indexOf('.') > 0) {
                modifier = host.substring(0, host.indexOf('.'))
            }
        }

        String siteId = sellbackService.getSiteIdFromDynamoDB(modifier)
        if (siteId) {
            encryptedCookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String,
                    siteId, 432000, null, null, null, false)
        }

        Map<String, Object> content = sellbackService.returnFileContentAsMap(modifier)
        if (content['modifier'] != modifier) {
            modifier = content['modifier']
        }

        String imageBasePath =
                "https://${isNotProduction ? 'valore-images-qa.s3.amazonaws' : 'img.valorebooks'}.com/sellback/landing/${modifier}/"

        Map<String, String> images = [
                headerLogo: "${imageBasePath}header-logo.svg",
                upperSearch: "${imageBasePath}search-upper.png",
                lowerSearch: "${imageBasePath}search-lower.png"
        ]

        Map staticData = [knowledgeBase: content['faq'],
                          howItWorksData: content['how-it-works'],
                          headerBannerData: content['header-banner'],
                          footerBannerData: content['footer-banner'],
                          images: images]

        Long cartId = cartService.getSellbackCartIdFromCookie()
        List<Map> sellbackCartItems = []
        if (cartId) {
            def cart = cartService.getSellbackCart(cartId)
            if (cart?.state == 'ACTIVE') {
                log.debug("Found an active cart. Loading existing items onto page...")
                cart.items.each { item ->
                    item.price /= 100
                    def (json, status, text) = ApiUtil.post(
                            path: 'productDetails',
                            id: item.product.productCode,
                            includeStatus: true
                    )

                    if (status == HttpStatus.SC_OK) {
                        sellbackCartItems.add([addedItem: item, productDetails: json])
                    } else {
                        log.error("Received an error while retrieving product details for item $item.id")
                        log.error("Error: $text")
                    }
                }
            }
        }

        return [
                whitelabel: modifier,
                staticData:  "${staticData as JSON}",
                initialItemData:  "${sellbackCartItems as JSON}"
        ]
    }

}
