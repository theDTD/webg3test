package com.valore.checkout

import com.valore.EncryptedCookieService
import com.valore.analytics.TrackingService
import com.valore.util.ApiUtil
import com.valore.util.MiscUtil
import grails.plugin.cookie.CookieService
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import org.grails.plugins.testing.GrailsMockHttpServletRequest
import spock.lang.Specification
import spock.lang.Unroll

import javax.servlet.http.HttpServletResponse
import java.text.SimpleDateFormat

@TestFor(CheckoutController)
class CheckoutControllerSpec extends Specification {

    String legacyUrl = "legacyUrl"

    def setup() {
        grailsApplication.config.valore.legacyUrl = legacyUrl
        GrailsMockHttpServletRequest.metaClass.getCookie = { String name -> name }
    }

    def cleanup() {
        GroovySystem.metaClassRegistry.removeMetaClass(GrailsMockHttpServletRequest)
    }

    @Unroll
    void "test index"() {
        given:
        assert !controller.ALLOWED_COUNTRIES.contains('FR') && controller.ALLOWED_COUNTRIES.contains('US')
        request.addHeader('testip_addr', ip)
        CheckoutController checkoutController = Spy(CheckoutController)
        checkoutController.trackingService = Mock(TrackingService)
        String randomId = "4321"
        def cartId = 1234
        def items = [[id: 1,
                      product: [id: 1, name: 'book', productCode: '0000000000001'],
                      currentPrice: 1000,
                      quantity: 1,
                      sale: true
                     ]]
        def cart = [items: items]
        def totals = [itemTotal: 100, shippingTotal: 10]
        params.rnaItemCount = 0
        checkoutController.trackingService = Mock(TrackingService)
        checkoutController.cartService = Mock(CartService)
        checkoutController.cartService.getCart(cartId) >> cart
        checkoutController.cartService.shouldUserAcknowledgeRNAItems(cart.items, params.rnaItemCount) >> false
        checkoutController.cartService.getTotals(cart.items) >> totals
        checkoutController.checkoutService = Mock(CheckoutService)
        checkoutController.checkoutService.computeRecyclingDate(cart.items) >> "01/01/2020"
        def jsUrl = "jsUrl"
        def jsLitleApiUrl = 'jsLitleApiUrl'
        grailsApplication.config.valore.litleOnline.jsUrl = jsUrl
        grailsApplication.config.valore.litleOnline.jsLitleApiUrl = jsLitleApiUrl

        and:
        def miscUtilMock = new MockFor(MiscUtil)
        miscUtilMock.demand.with {
            getRandomId(1) { -> randomId }
        }

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert(args.path == 'cart/lock')
                assert(args.id == cartId)
            }
        }

        when:
        miscUtilMock.use {
            apiUtilMock.use {
                checkoutController.index()
            }
        }

        then:
        response.status == HttpServletResponse.SC_OK
        1 * checkoutController.cartService.getCartIdFromCookie(false) >> cartId
        checkoutController.modelAndView.viewName == "/checkout/index"
        checkoutController.modelAndView.model.size() == 10
        checkoutController.modelAndView.model.showCaptcha == showCaptcha
        checkoutController.modelAndView.model.vantivReportGroup == "Sales"
        checkoutController.modelAndView.model.vantivOrderId == randomId
        checkoutController.modelAndView.model.litleOnlineJs == jsUrl
        checkoutController.modelAndView.model.litleOnlineJsAPI == jsLitleApiUrl
        checkoutController.modelAndView.model.cart == cart
        checkoutController.modelAndView.model.recyclingDate == "01/01/2020"
        checkoutController.modelAndView.model.totals == totals['totals']
        !checkoutController.modelAndView.model.cartContainsRental
        1 * checkoutController.trackingService.enhancedEcommerceViewEvent(3)
        1 * checkoutController.trackingService.enhancedEcommerceCompletionEvent(3)

        where:
        ip << ['83.206.36.224', '64.17.254.216']
        showCaptcha << [true, false]
    }

    void "test index mixed cart"() {
        given:
        CheckoutController checkoutController = Spy(CheckoutController)
        checkoutController.trackingService = Mock(TrackingService)
        String randomId = "4321"
        def cartId = 1234
        def items = [[id: 1,
                      product: [id: 1, name: 'book', productCode: '0000000000001'],
                      currentPrice: 1000,
                      quantity: 1,
                      sale: true
                     ],
                     [id: 2,
                      product: [id: 1, name: 'book', productCode: '0000000000001'],
                      currentPrice: 1000,
                      quantity: 1,
                      rental: true,
                      renterMarketId: 1
                     ]]
        def cart = [items: items]
        def totals = [itemTotal: 100, shippingTotal: 10]
        params.rnaItemCount = 0
        checkoutController.trackingService = Mock(TrackingService)
        checkoutController.cartService = Mock(CartService)
        checkoutController.cartService.getCart(cartId) >> cart
        checkoutController.cartService.shouldUserAcknowledgeRNAItems(cart.items, params.rnaItemCount) >> false
        checkoutController.cartService.getTotals(cart.items) >> totals
        checkoutController.checkoutService = Mock(CheckoutService)
        checkoutController.checkoutService.computeRecyclingDate(cart.items) >> "01/01/2020"

        def jsUrl = "jsUrl"
        def jsLitleApiUrl = 'jsLitleApiUrl'
        grailsApplication.config.valore.litleOnline.jsUrl = jsUrl
        grailsApplication.config.valore.litleOnline.jsLitleApiUrl = jsLitleApiUrl

        and:
        def miscUtilMock = new MockFor(MiscUtil)
        miscUtilMock.demand.with {
            getRandomId(1) { -> randomId }
        }

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert(args.path == 'cart/lock')
                assert(args.id == cartId)
            }
        }

        when:
        miscUtilMock.use {
            apiUtilMock.use {
                checkoutController.index()
            }
        }

        then:
        response.status == HttpServletResponse.SC_OK
        1 * checkoutController.cartService.getCartIdFromCookie(false) >> cartId
        checkoutController.modelAndView.viewName == "/checkout/index"
        checkoutController.modelAndView.model.size() == 10
        checkoutController.modelAndView.model.showCaptcha == false
        checkoutController.modelAndView.model.vantivReportGroup == "Mixed"
        checkoutController.modelAndView.model.vantivOrderId == randomId
        checkoutController.modelAndView.model.litleOnlineJs == jsUrl
        checkoutController.modelAndView.model.litleOnlineJsAPI == jsLitleApiUrl
        checkoutController.modelAndView.model.cart == cart
        checkoutController.modelAndView.model.totals == totals['totals']
        checkoutController.modelAndView.model.recyclingDate == "01/01/2020"
        checkoutController.modelAndView.model.cartContainsRental
        1 * checkoutController.trackingService.enhancedEcommerceViewEvent(3)
        1 * checkoutController.trackingService.enhancedEcommerceCompletionEvent(3)
    }

    void "test index with empty cart"() {
        given:
        CheckoutController checkoutController = Spy(CheckoutController)
        checkoutController.trackingService = Mock(TrackingService)
        def cartId = 1234
        def cart = []
        checkoutController.trackingService = Mock(TrackingService)
        checkoutController.cartService = Mock(CartService)
        checkoutController.cartService.getCartIdFromCookie(false) >> cartId
        checkoutController.cartService.getCart(cartId) >> cart

        when:
        checkoutController.index()

        then:
        0 * checkoutController.trackingService.enhancedEcommerceViewEvent(3)
        0 * checkoutController.trackingService.enhancedEcommerceCompletionEvent(3)
        response.redirectUrl == "/cart/index"
    }

    void "test index in test mode"() {
        given:
        CheckoutController checkoutController = Spy(CheckoutController)
        String randomId = "4321"
        def cartId = 1234
        def items = [[id: 1,
                      product: [id: 1, name: 'book', productCode: '0000000000001'],
                      currentPrice: 1000,
                      quantity: 1,
                      rental: true,
                      renterMarketId: 1
                     ]]
        def cart = [items: items]
        def totals = [itemTotal: 100, shippingTotal: 10]
        params.rnaItemCount = 0
        checkoutController.trackingService = Mock(TrackingService)
        checkoutController.cartService = Mock(CartService)
        checkoutController.cartService.getCart(cartId) >> cart
        checkoutController.cartService.shouldUserAcknowledgeRNAItems(cart.items, params.rnaItemCount) >> false
        checkoutController.cartService.getTotals(cart.items) >> totals
        checkoutController.checkoutService = Mock(CheckoutService)
        checkoutController.checkoutService.computeRecyclingDate(cart.items) >> "01/01/2020"

        def jsUrl = "jsUrl"
        def jsLitleApiUrl = 'jsLitleApiUrl'
        grailsApplication.config.valore.litleOnline.jsUrlTest = jsUrl
        grailsApplication.config.valore.litleOnline.jsLitleApiUrlTest = jsLitleApiUrl
        params.rnaItemCount = 0

        and:
        def miscUtilMock = new MockFor(MiscUtil)
        miscUtilMock.demand.with {
            getRandomId(1) { -> randomId }
        }

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert(args.path == 'cart/lock')
                assert(args.id == cartId)
            }
        }

        when:
        miscUtilMock.use {
            apiUtilMock.use {
                checkoutController.index()
            }
        }

        then:
        response.status == HttpServletResponse.SC_OK
        1 * checkoutController.cartService.getCartIdFromCookie(false) >> cartId
        checkoutController.modelAndView.viewName == "/checkout/index"
        checkoutController.modelAndView.model.size() == 10
        checkoutController.modelAndView.model.showCaptcha == false
        checkoutController.modelAndView.model.vantivReportGroup == "Rental"
        checkoutController.modelAndView.model.vantivOrderId == randomId
        checkoutController.modelAndView.model.litleOnlineJs == jsUrl
        checkoutController.modelAndView.model.litleOnlineJsAPI == jsLitleApiUrl
        checkoutController.modelAndView.model.cart == cart
        checkoutController.modelAndView.model.totals == totals['totals']
        checkoutController.modelAndView.model.recyclingDate == "01/01/2020"
        checkoutController.modelAndView.model.cartContainsRental
    }

    void "test index when current RNA count > old RNA count"() {
        given:
        CheckoutController checkoutController = Spy(CheckoutController)
        checkoutController.trackingService = Mock(TrackingService)
        def cartId = 1234
        def items = [[id: 1]]
        def cart = [items: items]
        params.rnaItemCount = 0
        checkoutController.trackingService = Mock(TrackingService)
        checkoutController.cartService = Mock(CartService)
        checkoutController.cartService.getCart(cartId) >> cart
        checkoutController.cartService.shouldUserAcknowledgeRNAItems(cart.items, params.rnaItemCount) >> true
        checkoutController.cartService.getCartIdFromCookie(false) >> cartId
        checkoutController.checkoutService = Mock(CheckoutService)
        checkoutController.checkoutService.computeRecyclingDate(cart.items) >> "01/01/2020"

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert(args.path == 'cart/lock')
                assert(args.id == cartId)
            }
        }

        when:
        apiUtilMock.use {
            checkoutController.index()
        }

        then:
        1 * checkoutController.trackingService.enhancedEcommerceViewEvent(3)
        0 * checkoutController.trackingService.enhancedEcommerceCompletionEvent(3)
        response.redirectUrl == "/cart/index"
    }

    void "test buildSegmentModel"() {
        given:
        def items = [[id: 1,
                      product: [id: 123, name: 'book1', productCode: '0000000000001'],
                      currentPrice: 1000,
                      quantity: 4,
                      sale: true
                     ],
                     [id: 2,
                      product: [id: 456, name: 'book2', productCode: '0000000000002'],
                      currentPrice: 2000,
                      quantity: 5,
                      sale: false,
                      RBB: true
                     ]]
        def totals = [itemTotal: 300, shippingTotal: 400]

        when:
        def segment = controller.buildSegmentModel(items, totals)

        then:
        segment.eventName == 'Proceeded To Checkout'
        segment.attributes.size() == 4
        segment.attributes.ecomm_totalvalue == 3.00

        def prod1 = segment.attributes.products[0]
        prod1.name == 'book1'
        prod1.id == '123'
        prod1.isbn == '0000000000001'
        prod1.price == 10.00
        prod1.quantity == 4
        prod1.ecomm_prodid == '123'

        def prod2 = segment.attributes.products[1]
        prod2.name == 'book2'
        prod2.id == '456'
        prod2.isbn == '0000000000002'
        prod2.price == 20.00
        prod2.quantity == 5
        prod2.ecomm_prodid == '456'
    }

    void "test calculateTax (amounts do not exist)"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        controller.cartService = Mock(CartService)
        def cart = "cart"
        def zip = "02210"
        params.zip = zip

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/taxes"
                assert args['id'] == cart
                assert args['query'] == [zip: zip]
                assert args['includeStatus']
                [items, HttpStatus.SC_OK, null]
            }
        }

        when:
        apiUtil.use {
            controller.calculateTax()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> cart
        response.status == HttpStatus.SC_OK
        response.text == "0"

        where:
        items << [[1: [taxes: [city: [:], state: [:], country: [:]]],
                   2: [taxes: [city: [:], state: [:], country: [:]]]],
                  [1: [taxes: [:]],
                   2: [taxes: [:]]],
                  [1: [:],
                   2: [:]],
                  [:]]
    }

    void "test calculateTax (taxes endpoint returns a 404 for no taxRates)"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        controller.cartService = Mock(CartService)
        def cart = "cart"
        def zip = "02210"
        params.zip = zip

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/taxes"
                assert args['id'] == cart
                assert args['query'] == [zip: zip]
                assert args['includeStatus']
                [null, HttpStatus.SC_NOT_FOUND, null]
            }
        }

        when:
        apiUtil.use {
            controller.calculateTax()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> cart
        response.status == HttpStatus.SC_NOT_FOUND
        response.text == "Could not find a taxRates record for zip $zip."
    }

    void "test calculateTax (amounts exist)"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        controller.cartService = Mock(CartService)
        def cart = "cart"
        def zip = "02210"
        params.zip = zip
        def items = [1: [taxes: [city: [amount: 5], state: [amount: 10], country: [amount: 15]]],
                     2: [taxes: [city: [amount: 20], state: [amount: 25], country: [amount: 30]]]]
        def taxTotal = 0
        items.values()?.each { item -> item['taxes'].values()?.each { tax -> taxTotal += tax?.amount }}

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/taxes"
                assert args['id'] == cart
                assert args['query'] == [zip: zip]
                assert args['includeStatus']
                [items, HttpStatus.SC_OK, null]
            }
        }

        when:
        apiUtil.use {
            controller.calculateTax()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> cart
        taxTotal != 0
        response.status == HttpStatus.SC_OK
        response.text == "$taxTotal"
    }

    void "test submit (missing captcha)"() {
        given:
        assert !controller.ALLOWED_COUNTRIES.contains('FR')
        controller.checkoutService = Mock(CheckoutService)
        String remoteIp = '83.206.36.224'
        request.addHeader('testip_addr', remoteIp)

        and:
        def apiUtil = new MockFor(ApiUtil)
        apiUtil.demand.with {
            post(0) { }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        0 * controller.checkoutService.searchConsumer(*_)
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == 'reCAPTCHA is required.'
    }

    void "test submit (invalid captcha)"() {
        given:
        assert !controller.ALLOWED_COUNTRIES.contains('FR')
        controller.checkoutService = Mock(CheckoutService)
        String remoteIp = '83.206.36.224'
        request.addHeader('testip_addr', remoteIp)
        String recaptchaResponse = 'response'
        request.JSON = [recaptchaResponse: recaptchaResponse]

        and:
        def apiUtil = new MockFor(ApiUtil.class)
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'recaptcha/submit'
                assert args['includeStatus'] == true
                assert args['json'] == [recaptchaResponse: recaptchaResponse, remoteIp: remoteIp]
                [null, HttpStatus.SC_BAD_REQUEST, null]
            }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        0 * controller.checkoutService.searchConsumer(*_)
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == 'reCAPTCHA is invalid.'
    }

    void "test submit (null consumer)"() {
        given:
        controller.checkoutService = Mock(CheckoutService)
        String firstName = "Victor"
        String lastName = "Valore"
        String email = "test@valore.com"
        String country = "US"
        def initialRequestJson = [firstName: firstName,
                                  lastName: lastName,
                                  email: email,
                                  defaultShipping: [:],
                                  defaultBilling: [:]]
        request.JSON = initialRequestJson
        def apiUtil = new MockFor(ApiUtil.class)

        and:
        apiUtil.demand.with {
            post(0) { def args -> }
            put(0) { def args -> }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        1 * controller.checkoutService.searchConsumer(email) >> null
        response.status == HttpServletResponse.SC_BAD_REQUEST
    }

    void "test submit (empty consumer)"() {
        given:
        def initialCartId = 345
        controller.cartService = Mock(CartService)
        controller.checkoutService = Mock(CheckoutService)
        controller.cookieService = Mock(CookieService)
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.trackingService = Mock(TrackingService)

        String firstName = "Victor"
        String lastName = "Valore"
        String email = "test@valore.com"
        String country = "US"
        def firstRequestJson = [firstName: firstName,
                                lastName: lastName,
                                email: email,
                                expMonth: '12',
                                expYear: '3456',
                                defaultShipping: [:],
                                defaultBilling: [:],
                                orderNumber: 1234,
                                registrationId: 'TEST']
        request.JSON = firstRequestJson
        def secondRequestJson = firstRequestJson.clone() << [defaultShipping: [firstName: firstName,
                                                                               lastName: lastName,
                                                                               line2: null,
                                                                               country: country],
                                                              defaultBilling: [line2: null,
                                                                               country: country],
                                                              school: null,
                                                              graduationYear: null,
                                                              password: null]
        def consumerId = 54321
        Map consumer = [id: consumerId, defaultBilling: [id: 1], defaultShipping: [id :2], email: "test@valore.com", emailOptIn: true]
        grailsApplication.config.valore.litleOnline.antiFraud.sessionPrefix = 'prefix'
        def thirdRequestJson = [:]
        thirdRequestJson.consumerId = consumer.id
        thirdRequestJson.billingAddressId = consumer.defaultBilling.id
        thirdRequestJson.shippingAddressId = consumer.defaultShipping.id
        thirdRequestJson.affSiteId = null
        thirdRequestJson.affTrackingId = null
        thirdRequestJson.orderNumber = firstRequestJson.orderNumber
        thirdRequestJson.registrationId = firstRequestJson.registrationId
        thirdRequestJson.afSessionId = "${grailsApplication.config.valore.litleOnline.antiFraud.sessionPrefix}-${initialCartId}"
        thirdRequestJson.expDate = '1256'
        thirdRequestJson.phoneNumber = null

        def apiUtil = new MockFor(ApiUtil.class)
        def transactionId = 12345
        def transaction = [[id: transactionId], null, null]

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 2
                assert args['path'] == "consumer"
                assert args['json'] == secondRequestJson
                consumer
            }
            put(0) { def args -> }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/checkout"
                assert args['id'] == initialCartId
                assert args['json'] == thirdRequestJson
                assert args['includeStatus'] == true
                transaction
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "responsys/optIn"
                assert args['id'] == null
                assert args['json'] == [email: consumer.email, source: "buy_checkout"]
                assert args['includeStatus'] == true
            }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> initialCartId
        1 * controller.checkoutService.searchConsumer(email) >> ""
        1 * controller.cartService.resetCookies(transactionId)
        response.status == HttpServletResponse.SC_OK
    }

    void "test submit (consumer found, useOneAddress null)"() {
        given:
        def initialCartId = 345
        controller.cartService = Mock(CartService)
        controller.checkoutService = Mock(CheckoutService)
        controller.cookieService = Mock(CookieService)
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.trackingService = Mock(TrackingService)

        String firstName = "Victor"
        String lastName = "Valore"
        String email = "test@valore.com"
        String country = "US"
        def firstRequestJson = [firstName: firstName,
                                lastName: lastName,
                                email: email,
                                expMonth: '12',
                                expYear: '3456',
                                defaultShipping: [:],
                                defaultBilling: [:],
                                orderNumber: 1234,
                                registrationId: 'TEST',
                                phone: '555-555-5555'
                                ]
        request.JSON = firstRequestJson
        def secondRequestJson = firstRequestJson.clone() << [defaultShipping: [firstName: firstName,
                                                                               lastName: lastName,
                                                                               line2: null,
                                                                               country: country],
                                                             defaultBilling: [line2: null,
                                                                              country: country],
                                                             school: null,
                                                             graduationYear: null,
                                                             password: null]
        def consumerId = 54321
        Map consumer = [id: consumerId, defaultBilling: [id: 1], defaultShipping: [id :2], email: "test@valore.com", emailOptIn: true]
        Map newConsumer = consumer.clone() << [updated: true]
        def thirdRequestJson = [:]
        thirdRequestJson.consumerId = newConsumer.id
        thirdRequestJson.billingAddressId = consumer.defaultBilling.id
        thirdRequestJson.shippingAddressId = consumer.defaultShipping.id
        thirdRequestJson.affSiteId = null
        thirdRequestJson.affTrackingId = null
        thirdRequestJson.orderNumber = firstRequestJson.orderNumber
        thirdRequestJson.registrationId = firstRequestJson.registrationId
        thirdRequestJson.afSessionId = "${grailsApplication.config.valore.litleOnline.antiFraud.sessionPrefix}-${initialCartId}"
        thirdRequestJson.expDate = '1256'
        thirdRequestJson.phoneNumber = '555-555-5555'
        def apiUtil = new MockFor(ApiUtil.class)
        def transactionId = 12345
        def transaction = [[id: transactionId], null, null]

        and:
        apiUtil.demand.with {
            post(0) { def args -> }
            put(1) { def args ->
                assert args.size() == 3
                assert args['path'] == "consumer"
                assert args['id'] == consumerId
                assert args['json'] == secondRequestJson
                newConsumer
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/checkout"
                assert args['id'] == initialCartId
                assert args['json'] == thirdRequestJson
                assert args['includeStatus'] == true
                transaction
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "responsys/optIn"
                assert args['id'] == null
                assert args['json'] == [email: consumer.email, source: "buy_checkout"]
                assert args['includeStatus'] == true
            }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> initialCartId
        1 * controller.checkoutService.searchConsumer(email) >> consumer
        1 * controller.cartService.resetCookies(transactionId)
        response.status == HttpServletResponse.SC_OK
    }

    void "test submit (consumer found, useOneAddress true)"() {
        given:
        def initialCartId = 345
        controller.cartService = Mock(CartService)
        controller.checkoutService = Mock(CheckoutService)
        controller.cookieService = Mock(CookieService)
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.trackingService = Mock(TrackingService)
        String firstName = "Victor"
        String lastName = "Valore"
        String email = "test@valore.com"
        String country = "US"
        def firstRequestJson = [firstName: firstName,
                                lastName: lastName,
                                email: email,
                                expMonth: '12',
                                expYear: '3456',
                                defaultShipping: [:],
                                defaultBilling: [:],
                                useOneAddress: true,
                                orderNumber: 1234,
                                registrationId: 'TEST']
        request.JSON = firstRequestJson
        Map addressData = [firstName: firstName,
                           lastName: lastName,
                           line2: null,
                           country: country]
        def secondRequestJson = firstRequestJson.clone() << [defaultShipping: addressData,
                                                             defaultBilling: addressData,
                                                             school: null,
                                                             graduationYear: null,
                                                             password: null]
        def consumerId = 54321
        Map consumer = [id: consumerId, defaultBilling: [id: 1], defaultShipping: [id :2], email: "test@valore.com", emailOptIn: true]
        Map newConsumer = consumer.clone() << [updated: true]
        def thirdRequestJson = [:]
        thirdRequestJson.consumerId = newConsumer.id
        thirdRequestJson.billingAddressId = consumer.defaultBilling.id
        thirdRequestJson.shippingAddressId = consumer.defaultShipping.id
        thirdRequestJson.affSiteId = null
        thirdRequestJson.affTrackingId = null
        thirdRequestJson.orderNumber = firstRequestJson.orderNumber
        thirdRequestJson.registrationId = firstRequestJson.registrationId
        thirdRequestJson.afSessionId = "${grailsApplication.config.valore.litleOnline.antiFraud.sessionPrefix}-${initialCartId}"
        thirdRequestJson.expDate = '1256'
        thirdRequestJson.phoneNumber = null
        def apiUtil = new MockFor(ApiUtil.class)
        def transactionId = 12345
        Long rentalProductId = 1L
        Date rentalProductDate = new Date(1462468785000)
        String rentalProductDateToString = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(rentalProductDate)
        def rentalMap = [(rentalProductId): rentalProductDateToString]
        def transaction = [[id: transactionId, rentalProductMap: rentalMap], null, null]
        grailsApplication.config.valore.cookie.segmentTraits = 'segmentTraits'

        and:
        apiUtil.demand.with {
            post(0) { def args -> }
            put(1) { def args ->
                assert args.size() == 3
                assert args['path'] == "consumer"
                assert args['id'] == consumerId
                assert args['json'] == secondRequestJson
                newConsumer
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/checkout"
                assert args['id']  == initialCartId
                assert args['json'] == thirdRequestJson
                assert args['includeStatus'] == true
                transaction
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "responsys/optIn"
                assert args['id'] == null
                assert args['json'] == [email: consumer.email, source: "buy_checkout"]
                assert args['includeStatus'] == true
            }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> initialCartId
        1 * controller.checkoutService.searchConsumer(email) >> consumer
        1 * controller.checkoutService.schedulePostRentalEvents(transactionId, rentalMap , email) >> { Long idArg, Map mapArg, String emailAddr ->
            mapArg.each {
                def dueDate = Date.parse("yyyy-MM-dd'T'HH:mm:ss'Z'", "$it.value")
                assert dueDate.time == rentalProductDate.time
            }
        }
        1 * controller.cartService.resetCookies(transactionId)
        response.status == HttpServletResponse.SC_OK
    }

    void "test submit test mode"() {
        given:
        def initialCartId = 345
        controller.cartService = Mock(CartService)
        controller.checkoutService = Mock(CheckoutService)
        controller.cookieService = Mock(CookieService)
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.trackingService = Mock(TrackingService)
        String firstName = "Victor"
        String lastName = "Valore"
        String email = "test@valore.com"
        def firstRequestJson = [firstName: firstName,
                                lastName: lastName,
                                email: email,
                                expMonth: '12',
                                expYear: '3456',
                                defaultShipping: [:],
                                defaultBilling: [:],
                                useOneAddress: true,
                                orderNumber: 1234,
                                registrationId: 'TEST']
        request.JSON = firstRequestJson

        def consumerId = 54321
        Map consumer = [id: consumerId, defaultBilling: [id: 1], defaultShipping: [id :2], email: "test@valore.com", emailOptIn: true]
        Map newConsumer = consumer.clone() << [updated: true]
        def apiUtil = new MockFor(ApiUtil.class)
        def transactionId = null
        def transaction = [[id: transactionId], null, null]

        and:
        apiUtil.demand.with {
            post(0) { def args -> }
            put(1) { def args ->
                assert args.size() == 3
                assert args['path'] == "consumer"
                assert args['id'] == consumerId
                newConsumer
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/checkout"
                assert args['id']  == initialCartId
                assert args['includeStatus'] == true
                transaction
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "responsys/optIn"
                assert args['id'] == null
                assert args['json'] == [email: consumer.email, source: "buy_checkout"]
                assert args['includeStatus'] == true
            }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        1 * controller.getCartService().getCartIdFromCookie(false) >> initialCartId
        1 * controller.checkoutService.searchConsumer(email) >> consumer
        1 * controller.cartService.resetCookies(transactionId)
        response.status == HttpServletResponse.SC_OK
    }

    void "test submit not in test mode"() {
        given:
        def initialCartId = 345
        controller.cartService = Mock(CartService)
        controller.checkoutService = Mock(CheckoutService)
        controller.cookieService = Mock(CookieService)
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.trackingService = Mock(TrackingService)
        String firstName = "Victor"
        String lastName = "Valore"
        String email = "test@valore.com"
        def firstRequestJson = [firstName: firstName,
                                lastName: lastName,
                                email: email,
                                expMonth: '12',
                                expYear: '3456',
                                defaultShipping: [:],
                                defaultBilling: [:],
                                useOneAddress: true,
                                orderNumber: 1234,
                                registrationId: 'TEST']
        request.JSON = firstRequestJson

        def consumerId = 54321
        Map consumer = [id: consumerId, defaultBilling: [id: 1], defaultShipping: [id :2], email: "test@valore.com", emailOptIn: true]
        Map newConsumer = consumer.clone() << [updated: true]
        def apiUtil = new MockFor(ApiUtil.class)
        def transactionId = 1234
        def transaction = [[id: transactionId], null, null]

        and:
        apiUtil.demand.with {
            post(0) { def args -> }
            put(1) { def args ->
                assert args.size() == 3
                assert args['path'] == "consumer"
                assert args['id'] == consumerId
                newConsumer
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/checkout"
                assert args['id']  == initialCartId
                assert args['includeStatus'] == true
                transaction
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "responsys/optIn"
                assert args['id'] == null
                assert args['json'] == [email: consumer.email, source: "buy_checkout"]
                assert args['includeStatus'] == true
            }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> initialCartId
        1 * controller.checkoutService.searchConsumer(email) >> consumer
        1 * controller.cartService.resetCookies(transactionId)
        response.status == HttpServletResponse.SC_OK
    }

    void "test submit (failed to post to transaction api)"() {
        given:
        controller.checkoutService = Mock(CheckoutService)
        controller.cookieService = Mock(CookieService)
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.cartService = Mock(CartService)
        controller.trackingService = Mock(TrackingService)
        def initialCartId = 345
        String firstName = "Victor"
        String lastName = "Valore"
        String email = "test@valore.com"
        String country = "US"
        def firstRequestJson = [firstName: firstName,
                                lastName: lastName,
                                email: email,
                                expMonth: '12',
                                expYear: '3456',
                                defaultShipping: [:],
                                defaultBilling: [:],
                                useOneAddress: true,
                                orderNumber: 1234,
                                registrationId: 'TEST']
        request.JSON = firstRequestJson
        Map addressData = [firstName: firstName,
                           lastName: lastName,
                           line2: null,
                           country: country]
        def secondRequestJson = firstRequestJson.clone() << [defaultShipping: addressData,
                                                             defaultBilling: addressData,
                                                             school: null,
                                                             graduationYear: null,
                                                             password: null]
        def consumerId = 54321
        Map consumer = [id: consumerId, defaultBilling: [id: 1], defaultShipping: [id :2]]
        Map newConsumer = consumer.clone() << [updated: true]
        def thirdRequestJson = [:]
        thirdRequestJson.consumerId = newConsumer.id
        thirdRequestJson.billingAddressId = consumer.defaultBilling.id
        thirdRequestJson.shippingAddressId = consumer.defaultShipping.id
        thirdRequestJson.affSiteId = firstRequestJson.affSiteId
        thirdRequestJson.affTrackingId = firstRequestJson.affTrackingId
        thirdRequestJson.orderNumber = firstRequestJson.orderNumber
        thirdRequestJson.registrationId = firstRequestJson.registrationId
        thirdRequestJson.afSessionId = "${grailsApplication.config.valore.litleOnline.antiFraud.sessionPrefix}-${initialCartId}"
        thirdRequestJson.expDate = '1256'
        thirdRequestJson.phoneNumber = null
        def apiUtil = new MockFor(ApiUtil.class)

        and:
        apiUtil.demand.with {
            post(0) { def args -> }
            put(1) { def args ->
                assert args.size() == 3
                assert args['path'] == "consumer"
                assert args['id'] == consumerId
                assert args['json'] == secondRequestJson
                newConsumer
            }
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == "cart/checkout"
                assert args['id'] == initialCartId
                assert args['json'] == thirdRequestJson
                assert args['includeStatus'] == true
                [null, HttpServletResponse.SC_BAD_REQUEST, null]
            }
        }

        when:
        apiUtil.use {
            controller.submit()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> initialCartId
        1 * controller.checkoutService.searchConsumer(email) >> consumer
        0 * controller.checkoutService.schedulePostRentalEvents(_, _, _)
        response.status == HttpServletResponse.SC_BAD_REQUEST
    }

    void "test thankYou (not testing, no params.id and no transaction id in session)"() {
        given:
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.cookieService = Mock(CookieService)
        controller.trackingService = Mock(TrackingService)
        grailsApplication.config.valore.cookie.prevTransId = 'prevTransId'

        when:
        controller.thankYou()

        then:
        1 * controller.encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.prevTransId) >> null
        0 * controller.trackingService.enhancedEcommerceViewEvent(4)
        0 * controller.trackingService.enhancedEcommerceCompletionEvent(4)
        response.status == HttpServletResponse.SC_FOUND
        response.redirectUrl == "$legacyUrl/"
    }

    void "test thankYou (no transaction id in session)"() {
        given:
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        controller.cookieService = Mock(CookieService)
        controller.trackingService = Mock(TrackingService)
        grailsApplication.config.valore.cookie.prevTransId = 'prevTransId'

        when:
        controller.thankYou()

        then:
        1 * controller.encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.prevTransId) >> null
        0 * controller.trackingService.enhancedEcommerceViewEvent(4)
        0 * controller.trackingService.enhancedEcommerceCompletionEvent(4)
        response.status == HttpServletResponse.SC_FOUND
        response.redirectUrl == "$legacyUrl/"
    }

    void "test buildThankYouSegmentModel"() {
        given:
        def response
        def total = 20000
        def transaction = [
                id: 00000001,
                total: total,
                saleTransactionProducts: [
                        [
                                itemAmount: 9000,
                                shippingAmount: 1000,
                                productId: 1,
                                saleType: "Purchase",
                                promotionAmount: 0,
                                product: [
                                        name: 'book 1',
                                        productCode: '1111111111111'
                                ],
                                seller: [
                                        marketUserUserName: 'user'
                                ],
                                shippingType: [
                                        name: 'standard'
                                ],
                                taxAmount: 200,
                                specialDistrictTaxAmount: 300
                        ],
                        [
                                itemAmount: 9000,
                                shippingAmount: 1000,
                                productId: 2,
                                saleType: "Drop Ship Rental",
                                promotionAmount: 10,
                                product: [
                                        name: 'book 2',
                                        productCode: '2222222222222'
                                ],
                                seller: [
                                        marketUserUserName: 'user'
                                ],
                                shippingType: [
                                        name: 'standard'
                                ],
                                taxAmount: 100,
                                specialDistrictTaxAmount: 300
                        ]
                ]
        ]

        when:
        response = controller.buildThankYouSegmentModel( transaction )

        then:
        response.attributes.total == total / 100
        response.attributes.revenue == 18000 / 100
        response.attributes.shipping == 2000 / 100
        response.attributes.tax == 300 / 100
        def products = response.attributes.products
        products.size() == 2
        products[0].name == "book 1"
        products[1].name == "book 2"

    }
}
