package com.valore.checkout

import com.valore.EncryptedCookieService
import com.valore.analytics.TrackingService
import com.valore.data.cart.ShippingType
import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import org.grails.web.json.JSONObject
import spock.lang.Specification


@TestFor(CartController)
class CartControllerSpec extends Specification {

    def setup() {
        controller.cartService = Mock(CartService)
        controller.trackingService = Mock(TrackingService)
        grailsApplication.config.valore.cart.lockTime.cart = 10
        grailsApplication.config.valore.legacyUrl = "http://valore.legacy"
    }

    def cleanup() {
    }

    void "test index"() {
        given:
        def sessionCart = [cart: "cart"]
        def items = ['items']
        def cart = [items: items]
        def totals = [totals: "totals"]
        controller.cartService.getCartIdFromCookie(false) >> sessionCart
        controller.cartService.getCart(sessionCart) >> cart
        controller.cartService.getTotals(items) >> totals
        controller.cartService.getRNAItemCount(cart.items) >> 0

        when:
        controller.index()

        then:
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/cart/index"
        controller.modelAndView.model.size() == 4
        controller.modelAndView.model.cart == cart
        controller.modelAndView.model.totals == totals.totals
        controller.modelAndView.model.referer == null
        controller.modelAndView.model.rnaItemCount == 0
    }

    void "test index with checked out cart"() {
        given:
        controller.encryptedCookieService = Mock(EncryptedCookieService)
        def sessionCart = [cart: "cart"]
        def items = ['items']
        def cart = [items: items, state : 'CHECKED_OUT']
        def totals = [totals: "totals"]
        controller.cartService.getCartIdFromCookie(false) >> sessionCart
        controller.cartService.getCart(sessionCart) >> cart
        controller.cartService.getTotals(null) >> totals
        controller.cartService.getRNAItemCount(null) >> 0
        grailsApplication.config.valore.cookie.cartId = 'cartCookie'

        when:
        controller.index()

        then:
        1 * controller.encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.cartId)
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/cart/index"
        controller.modelAndView.model.size() == 4
        controller.modelAndView.model.cart == null
        controller.modelAndView.model.totals == totals.totals
        controller.modelAndView.model.referer == null
        controller.modelAndView.model.rnaItemCount == 0
    }


    void "test index (with referer)"() {
        given:
        def sessionCart = [cart: "cart"]
        def items = ['items']
        def cart = [items: items]
        def totals = [totals: "totals"]
        controller.cartService.getCartIdFromCookie(false) >> sessionCart
        controller.cartService.getCart(sessionCart) >> cart
        controller.cartService.getTotals(items) >> totals
        request.addHeader("Referer", "http://valorebooks.com")
        controller.cartService.getRNAItemCount(cart.items) >> 0


        when:
        controller.index()

        then:
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/cart/index"
        controller.modelAndView.model.size() == 4
        controller.modelAndView.model.cart == cart
        controller.modelAndView.model.totals == totals.totals
        controller.modelAndView.model.referer == "http://valorebooks.com"
        controller.modelAndView.model.rnaItemCount == 0
    }

    void "test updateCartItem"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        params.id = 1234
        params.rentalTerm = rentalTerm
        params.shippingMethod = shippingType?.name
        def json = [key: "value"] as JSONObject

        and:
        apiUtil.demand.with {
            get(expectedApiUtilGets) { def args ->
                assert args.size() == 3
                assert args['path'] == 'cartItem/rentalPrice'
                assert args['id'] == params.id
                assert args['query'] == [rentalTerm: params.rentalTerm]
                ['price': 100]
            }
            put(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'cartItem'
                assert args['id'] == params.id
                assert args['json'] == expectedJsonArgForPut
                json
            }
        }

        when:
        apiUtil.use {
            controller.updateCartItem()
        }

        then:
        response.status == HttpStatus.SC_OK
        response.json == json

        where:
        shippingType << [null, ShippingType.STANDARD, ShippingType.STANDARD]
        rentalTerm << [null, null, "SEMESTER"]
        expectedApiUtilGets << [0, 0, 1]
        expectedJsonArgForPut << [[:],
                                  [shippingType: ShippingType.STANDARD.id],
                                  [shippingType: ShippingType.STANDARD.id,
                                   currentPrice: 100,
                                   consumerPrice: 100,
                                   rentalTerm: "SEMESTER"]]
    }


    void "test addItem (no params)"() {
        given:
        CartController cartController = Spy(CartController)
        cartController.cartService = Spy(CartService)

        when:
        cartController.addItem()

        then:
        1 * cartController.cartService.getCartIdFromCookie() >> 1234
        response.redirectedUrl == '/cart/index'
    }

    void "test addItem - error during api post"() {
        given:
        CartController cartController = Spy(CartController)
        cartController.cartService = Spy(CartService)
        cartController.trackingService = Mock(TrackingService)
        def apiUtil = new MockFor(ApiUtil.class)
        def cartId = 1234
        ShippingType shippingType = ShippingType.STANDARD
        def price = 10
        def product = '9780321558237'
        def renterMarket = '1'
        def sellerMarket = '2'
        def map = [shippingType: shippingType.name,
                   price: price,
                   quantity: 1,
                   product_id: product,
                   listing_id: renterMarket,
                   sellerMarket_id: sellerMarket,
                   term: "SEMESTER",
                   semesterRentalPrice : '123',
                   isbn : '1234']
        cartController.params.putAll(map)

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'cartItem'
                null
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                [name:'book', edition:'1']
            }
        }

        when:
        apiUtil.use {
            cartController.addItem()
        }

        then:
        1 * cartController.trackingService.enhancedEcommerceViewEvent(2)
        0 * cartController.trackingService.enhancedEcommerceCompletionEvent(2)
        1 * cartController.cartService.getCart(cartId) >> [state : 'ACTIVE']
        1 * cartController.cartService.getCartIdFromCookie() >> cartId
        1 * cartController.redirect([uri: "/textbooks/book-1st-edition/$map.isbn", base: "http://valore.legacy"])
    }

    void "test addItem to checked out cart"() {
        given:
        CartController cartController = Spy(CartController)
        cartController.cartService = Spy(CartService)
        cartController.encryptedCookieService = Mock(EncryptedCookieService)
        cartController.trackingService = Mock(TrackingService)
        def apiUtil = new MockFor(ApiUtil.class)
        def cartId = 1234
        grailsApplication.config.valore.cookie.cartId = 'cartCookie'
        def map = [shippingType: ShippingType.STANDARD.name,
                   price: 10,
                   quantity: 1,
                   product_id: '123456789',
                   listing_id: 1,
                   sellerMarket_id: 2,
                   term: "SEMESTER",
                   semesterRentalPrice : '123',
                   isbn : '1234']
        cartController.params.putAll(map)

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'cartItem'
                null
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                [name:'book', edition:'1']
            }
        }

        when:
        apiUtil.use {
            cartController.addItem()
        }

        then:
        1 * cartController.trackingService.enhancedEcommerceViewEvent(2)
        0 * cartController.trackingService.enhancedEcommerceCompletionEvent(2)
        1 * cartController.cartService.getCart(cartId) >> [state : 'CHECKED_OUT']
        1 * cartController.encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.cartId)
        1 * cartController.cartService.getCartIdFromCookie() >> cartId
        1 * cartController.redirect([uri: "/textbooks/book-1st-edition/$map.isbn", base: "http://valore.legacy"])

    }

    void "test addItem"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        def cartId = 1234
        ShippingType shippingType = ShippingType.STANDARD
        def mapQuantity = givenQuantity
        def jsonQuantity = expectedQuantity
        def product = '9780321558237'
        def renterMarket = '1'
        def sellerMarket = '2'
        def term = givenTerm
        def rentalTerm = expectedRentalTerm
        def map = [shippingType: shippingType.name,
                   quantity: mapQuantity,
                   product_id: product,
                   listing_id: renterMarket,
                   sellerMarket_id: sellerMarket,
                   term: term]
        Map json = [shippingType: shippingType.id,
                    quantity: jsonQuantity,
                    product_id: product,
                    listing_id: renterMarket,
                    sellerMarket_id: sellerMarket,
                    term: term,
                    cart: cartId,
                    product: product,
                    renterMarketId: renterMarket,
                    sellerMarketId: sellerMarket,
                    rentalTerm: rentalTerm]
        params.putAll(map)
        def addedItemId = 4321
        def addedItem = [id: addedItemId]
        def items = [[
                id: addedItemId,
                product: [name: 'book', productCode: '0000000000001'],
                productId: 1,
                currentPrice: 1000,
                quantity: 1,
                sale: true
        ]]
        def cart = [items: items]
        def totals = [itemTotal: 1000]
        controller.cartService.getCart(cartId) >> cart
        controller.cartService.getTotals(items) >> totals
        controller.cartService.getRNAItemCount(items) >> 0
        grailsApplication.config.valore.cart.lockTime.item = lockTimeItem

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'cartItem'
                def jsonSize = 11
                def argsJson = args['json']
                if (argsJson['unlockTime']) {
                    json['unlockTime'] = argsJson['unlockTime']
                }
                if (!rentalTerm) {
                    json.remove('rentalTerm')
                    jsonSize--
                }
                assert argsJson.size() == jsonSize
                assert argsJson['shippingType'] == json.shippingType
                assert argsJson['quantity'] == json.quantity
                assert argsJson['product_id'] == json.product_id
                assert argsJson['listing_id'] == json.listing_id
                assert argsJson['sellerMarket_id'] == json.sellerMarket_id
                assert argsJson['term'] == json.term
                assert argsJson['cart'] == json.cart
                assert argsJson['product'] == json.product
                assert argsJson['renterMarketId'] == json.renterMarketId
                assert argsJson['sellerMarketId'] == json.sellerMarketId
                assert argsJson['rentalTerm'] == json.rentalTerm
                addedItem
            }
        }

        when:
        apiUtil.use {
            controller.addItem()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie() >> cartId
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/cart/index"
        controller.modelAndView.model.size() == 4
        controller.modelAndView.model.cart == cart
        controller.modelAndView.model.addedItem == addedItemId
        controller.modelAndView.model.totals == totals.totals
        controller.modelAndView.model.rnaItemCount == 0
        1 * controller.trackingService.enhancedEcommerceViewEvent(2)
        1 * controller.trackingService.enhancedEcommerceCompletionEvent(2)

        where:
        givenQuantity << [5, null]
        expectedQuantity << [5, 1]
        givenTerm << ["SEMESTER", null]
        expectedRentalTerm << ["SEMESTER", null]
        lockTimeItem << [5, 0]
    }

    void "test removeItem (response from get is null)"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        def cartId = 1234
        params.id = 4321

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'cartItem/remove'
                assert args['id'] == params.id
                assert args['query'] == ['cart': cartId]
                null
            }
        }

        when:
        apiUtil.use {
            controller.removeItem()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> cartId
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test removeItem (response from get not null)"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        def cartId = 1234
        params.id = 4321
        def json = [not: "empty"]

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'cartItem/remove'
                assert args['id'] == params.id
                assert args['query'] == ['cart': cartId]
                json
            }
        }

        when:
        apiUtil.use {
            controller.removeItem()
        }

        then:
        1 * controller.cartService.getCartIdFromCookie(false) >> cartId
        response.status == HttpStatus.SC_OK
    }

}
