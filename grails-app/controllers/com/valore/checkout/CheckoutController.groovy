package com.valore.checkout

import com.maxmind.geoip.Country
import com.maxmind.geoip.LookupService
import com.valore.util.ApiUtil
import com.valore.util.MiscUtil
import com.valore.util.sale.CartUtil

import grails.converters.JSON
import grails.util.Environment
import org.apache.http.HttpStatus

class CheckoutController {
    def cartService
    def checkoutService
    def cookieService
    def encryptedCookieService
    def trackingService
    def lookupService = new LookupService(this.class.classLoader.getResource('GeoIP.dat').file)

    static final List<String> ALLOWED_COUNTRIES = ['US', '--'] // Country code is '--' if not detected

    def index() {
        boolean showCaptcha = false

        String ipAddress = request.getHeader(Environment.current != Environment.PRODUCTION ? 'testip_addr' : 'geoip_addr')

        if (ipAddress) {
            Country country = lookupService.getCountry(ipAddress)
            String countryCode = country?.code

            if (countryCode && !(ALLOWED_COUNTRIES.contains(countryCode))) {
                showCaptcha = true
            }
        }

        def cartId = cartService.getCartIdFromCookie(false)
        def cart = cartService.getCart(cartId)
        if(!cart?.items) {
            redirect controller: 'cart', action: 'index'
            return
        }

        trackingService.enhancedEcommerceViewEvent(3)

        ApiUtil.post path: 'cart/lock', id: cartId

        if (cartService.shouldUserAcknowledgeRNAItems(cart.items, params.int("rnaItemCount"))){
            redirect controller: 'cart', action: 'index'
            return
        }
        def totals = cartService.getTotals(cart.items)

        String vantivOrderId = MiscUtil.randomId
        String litleOnlineJs = grailsApplication.config.valore.litleOnline.jsUrl
        String litleOnlineJsAPI = grailsApplication.config.valore.litleOnline.jsLitleApiUrl

        String vantivReportGroup = CartUtil.getCartTypeForVantiv(cart) ?: grailsApplication.config.valore.litleOnline.reportGroup

//        def segmentEvent = buildSegmentModel(cart.items, totals)
//        if( segmentEvent ) trackingService.trackEvent( request, segmentEvent.eventName, segmentEvent.attributes )

//        trackingService.pageView( request, params )
        trackingService.enhancedEcommerceCompletionEvent(3)

        def recyclingDate = checkoutService.computeRecyclingDate(cart.items)

        Boolean cartContainsRental = cart.items.find { it.renterMarketId != null }

        render (view:'/checkout/index',
                model: [showCaptcha: showCaptcha, vantivOrderId: vantivOrderId, vantivReportGroup: vantivReportGroup,
                        litleOnlineJs:litleOnlineJs, litleOnlineJsAPI: litleOnlineJsAPI, cart: cart,
                        recyclingDate: recyclingDate, cartContainsRental: cartContainsRental] << totals)
    }

    def buildSegmentModel(def items, def totals) {
        def products = []
        def orderAffiliation

        items.each{ item ->
            def affiliation
            switch( item.saleType ){
                case "Purchase":
                    affiliation = "Sale"
                    break
                case "Drop Ship Rental":
                    affiliation = "Drop Ship Rental"
                    break
                case "Rental":
                    affiliation = "Rentals"
                    break
            }

            if (!orderAffiliation && affiliation)
                orderAffiliation = affiliation

            if (orderAffiliation && orderAffiliation != affiliation)
                orderAffiliation = "Mixed Sales"

            products << [ name: item.product.name,
                          id: item.product.id.toString(),
                          isbn: item.product.productCode,
                          price: item.currentPrice / 100,
                          quantity: item.quantity,
                          seller: item.seller?.marketUserUserName ?: null,
                          ecomm_prodid: item.product.id.toString(),
                        ]
        }

        [
            eventName: 'Proceeded To Checkout',
            attributes: [ products: products,
                          ecomm_pagetype: "cart",
                          ecomm_totalvalue: totals.itemTotal / 100,
                          affiliation: orderAffiliation
            ]
        ]
    }

    def calculateTax() {
        def cartId = cartService.getCartIdFromCookie(false)
        def (items, status, text) = ApiUtil.get(path: 'cart/taxes', id: cartId, query: [zip:params.zip],
                includeStatus: true) as Map

        if (items == null && status == HttpStatus.SC_NOT_FOUND) {
            render status: HttpStatus.SC_NOT_FOUND, text: "Could not find a taxRates record for zip $params.zip."
            return
        }

        def taxTotal = 0
        items?.values()?.each { item ->
            item.taxes?.values()?.each { tax ->
                taxTotal += (tax?.amount ? tax?.amount : 0)
            }
        }

        render taxTotal
    }

    def submit() {
        def requestJson = request.JSON

        String ipAddress = request.getHeader(Environment.current != Environment.PRODUCTION ? 'testip_addr' : 'geoip_addr')

        if (ipAddress) {
            Country country = lookupService.getCountry(ipAddress)
            String countryCode = country?.code

            if (countryCode && !(ALLOWED_COUNTRIES.contains(countryCode))) {
                def recaptchaResponse = requestJson.recaptchaResponse

                if (!recaptchaResponse) {
                    render status: HttpStatus.SC_BAD_REQUEST, text: 'reCAPTCHA is required.'
                    return
                }

                def params = [
                        recaptchaResponse: recaptchaResponse,
                        remoteIp: ipAddress
                ]

                def (json, status, text) = ApiUtil.post(path: 'recaptcha/submit', json: params, includeStatus: true)

                boolean captchaResult = status == HttpStatus.SC_OK

                if (!captchaResult) {
                    render status: HttpStatus.SC_BAD_REQUEST, text: 'reCAPTCHA is invalid.'
                    return
                }
            }
        }

        def email = requestJson['email']
        def consumer = checkoutService.searchConsumer(email)

        // Some overrides for the default shipping address
        requestJson['defaultShipping']['firstName'] = requestJson['firstName']
        requestJson['defaultShipping']['lastName'] = requestJson['lastName']
        if (!requestJson['defaultShipping']['line2']) { requestJson['defaultShipping']['line2'] = null }
        requestJson['defaultShipping']['country'] = "US"

        // Some overrides for the default billing address
        if (requestJson['useOneAddress']) {
            requestJson['defaultBilling'] = requestJson['defaultShipping']
        }
        else {
            if (!requestJson['defaultBilling']['line2']) { requestJson['defaultBilling']['line2'] = null }
            requestJson['defaultBilling']['country'] = "US"
        }

        // Some overrides for the school name and grad year
        if (!requestJson['school']) { requestJson['school'] = null }
        if (!requestJson['graduationYear']) { requestJson['graduationYear'] = null }

        // Temporary overrides
        requestJson['password'] = null // TODO: Change when implementing accounts

        // TODO: Fix this during validation story
        if (consumer != null) {
            if (!consumer) {
                consumer = ApiUtil.post path: 'consumer', json: requestJson
            }
            else {
                consumer = ApiUtil.put path: 'consumer', id: consumer['id'], json: requestJson
            }
        }

        if (!consumer) {
            render status: HttpStatus.SC_BAD_REQUEST
        }
        else {
            def cartId = cartService.getCartIdFromCookie(false)
            def json = [:]
            json.consumerId = consumer.id
            json.billingAddressId = consumer.defaultBilling.id
            json.shippingAddressId = consumer.defaultShipping.id
            json.affSiteId = cookieService.getCookie(grailsApplication.config.valore.cookie.affSiteId)
            json.affTrackingId = cookieService.getCookie(grailsApplication.config.valore.cookie.affTrackingId)
            json.orderNumber = requestJson.orderNumber
            json.registrationId = requestJson.registrationId
            json.afSessionId = "${grailsApplication.config.valore.litleOnline.antiFraud.sessionPrefix}-${cartId}"
            json.phoneNumber = requestJson.phone

            if (requestJson['expMonth'] && requestJson['expYear']) {
                try{
                    json.expDate = "${requestJson['expMonth'].padLeft(2,'0')}${requestJson['expYear'][-2..-1]}"
                }catch (Exception e){}
            }

            def (respJson, respStatus, respText) = ApiUtil.post(path: 'cart/checkout', id: cartId, json: json, includeStatus: true)

            if (consumer.emailOptIn) {
                ApiUtil.post(path: "responsys/optIn", id: null, json: [email: consumer.email, source: "buy_checkout"], includeStatus: true)
            }

            String userTraits = ([
                    name: (consumer.firstName ?: "") + " " + (consumer.lastName ?: ""),
                    schoolName: consumer.school ?: "",
                    gradYear: consumer.graduationYear ? consumer.graduationYear.toString():"",
                    email: consumer.email ?: "",
                    emailOptIn: consumer.emailOptIn ?: "",
                    hasPurchased: true
            ] as JSON).toString(true)

            encryptedCookieService.setCookie(grailsApplication.config.valore.cookie.checkoutIdentify, userTraits, Integer.MAX_VALUE, null, null, null, false)

            def rentalProducts = respJson?.rentalProductMap

            if(rentalProducts) {
                checkoutService.schedulePostRentalEvents(respJson.id, rentalProducts, email)
            }

            if (respJson) {
                cartService.resetCookies(respJson.id)
                render status: HttpStatus.SC_OK
            }
            else render status: respStatus
        }
    }

    def thankYou() {
        def transactionId = encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.prevTransId)
        def userTraitsCookie = encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.checkoutIdentify)
        def firstPageLoad = userTraitsCookie as Boolean
        def userTraits = firstPageLoad ? JSON.parse( userTraitsCookie ) : [:]

        if (transactionId) {
            try {
                trackingService.enhancedEcommerceViewEvent(4)
                def query = [deep: true]

                def transaction = ApiUtil.get(path: 'saleTransaction', id: transactionId, query: query)

                def token = transaction.tokenSaleTransaction.ccToken.token

                if( firstPageLoad && transaction ) {
                    def segmentEvent = buildThankYouSegmentModel(transaction)
                    encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.checkoutIdentify)
//                    trackingService.trackEvent( request, segmentEvent.eventName, segmentEvent.attributes )
//                    trackingService.identify( userTraits )
                }

//                trackingService.pageView( request, params )

                if( firstPageLoad && cookieService.getCookie(grailsApplication.config.valore.cookie.user_id) == null ){
                    // determines user_id or creates a new one
                    checkoutService.identifyConsumer( userTraits.email )
                }

                render(view: 'thankyou', model: [transaction: transaction, consumer: transaction.tokenSaleTransaction.ccToken.consumer, maskedToken: token[-4..-1].padLeft(16, 'X')])
            } catch(Exception e) {
                log.error('THANKYOU ERROR', e)
            }
        } else {
            redirect uri: '/', base: grailsApplication.config.valore.legacyUrl
        }
    }

    def buildThankYouSegmentModel( def transaction ){

        def products = []
        def itemTotal = 0
        def shippingTotal = 0
        def taxTotal = 0
        def discountTotal = 0
        def orderAffiliation

        transaction.saleTransactionProducts.each {
            def affiliation
            switch( it.saleType ){
                case "Purchase":
                    affiliation = "Sale"
                    break
                case "Drop Ship Rental":
                    affiliation = "Drop Ship Rental"
                    break
                case "Rental":
                    affiliation = "Rentals"
                    break
            }

            if (!orderAffiliation && affiliation)
                orderAffiliation = affiliation

            if (orderAffiliation && orderAffiliation != affiliation)
                orderAffiliation = "Mixed Sales"

            products.add([
                    id: it.productId.toString(),
                    name: it.product.name,
                    isbn: it.product.productCode,
                    price: it.itemAmount / 100,
                    itemID: it.id.toString(),
                    shippingOption: it.shippingType.name,
                    seller: it.seller?.marketUserUserName ?: null,
                    quantity: 1,
                    ecomm_prodid: it.product.id.toString()
            ])
            itemTotal       += it.itemAmount
            shippingTotal   += it.shippingAmount
            taxTotal        += it.taxAmount
            discountTotal   += it.promotionAmount
        }

        [
                eventName : "Completed Order",
                attributes: [
                        orderId         : transaction.id.toString(),
                        total           : transaction.total / 100,
                        revenue         : itemTotal / 100,
                        shipping        : shippingTotal / 100,
                        tax             : taxTotal / 100,
                        discount        : discountTotal / 100,
                        couponName      : "",
                        currency        : "USD",
                        products        : products,
                        affiliation     : orderAffiliation,
                        ecomm_pagetype  : "purchase",
                        ecomm_totalvalue: itemTotal / 100,
                ]
        ]
    }
}
