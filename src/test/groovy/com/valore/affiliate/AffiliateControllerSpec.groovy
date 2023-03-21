package com.valore.affiliate

import com.valore.util.ApiUtil
import grails.plugin.cookie.CookieService
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import spock.lang.Specification
/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(AffiliateController)
class AffiliateControllerSpec extends Specification {
    def rentalListing = [
            "comment"    : "High-quality textbook rentals since 2006. We do not ship to Alaska, Hawaii or any off-shore territories.",
            "condition"  : "Very Good",
            "dueDate"    : [
                    "quarter" : "4/13/2016",
                    "semester": "5/31/2016"
            ],
            "id"         : 1,
            "price"      : [
                    "semester": "51.59",
                    "quarter" : "43.85"
            ],
            "provider"   : [
                    "city"             : null,
                    "id"               : 19706,
                    "name"             : "BookRenter",
                    "rating"           : 4044,
                    "ratingPercent"    : 89,
                    "recommended"      : true,
                    "shippingMethods"  : [
                            "Standard"
                    ],
                    "state"            : null,
                    "trackingAvailable": true
            ],
            "quantity"   : 1,
            "rbbSaleId"  : null,
            "shippingFee": "3.95",
            "type"       : "rental"
    ]
    def saleListing = [
            "comment": "May include moderately worn cover, writing, markings or slight discoloration. SKU:9780078021732-4-0-3 Orders ship the same or next business day. Expedited shipping within U.S. will arrive in 3-5 days. Hassle free 14 day return policy. Contact Customer Service for questions.",
            "condition": "Good",
            "dueDate": null,
            "id": 1332308505,
            "price": [
                    "sale": "121.90"
            ],
            "provider": [
                    "city": "Salem",
                    "id": 19022,
                    "name": "Bookbyte",
                    "rating": 1828,
                    "ratingPercent": 90,
                    "recommended": true,
                    "shippingMethods": [
                            "Standard",
                            "Expedited"
                    ],
                    "state": "OR",
                    "trackingAvailable": true,
            ],
            "quantity": 1,
            "rbbSaleId": null,
            "shippingFee": "3.95",
            "type": "used"
    ]
    def rbbListing = [
            "comment": "May include moderately worn cover, writing, markings or slight discoloration. SKU:9780078021732-4-0-3 Orders ship the same or next business day. Expedited shipping within U.S. will arrive in 3-5 days. Hassle free 14 day return policy. Contact Customer Service for questions.",
            "condition": "Good",
            "dueDate": [
                    "quarter": "4/13/2016",
                    "semester": "5/31/2016"
            ],
            "id": 1,
            "price": [
                    "semester": "19.16",
                    "quarter": "17.98"
            ],
            "provider": [
                    "city": "Salem",
                    "id": 17072,
                    "name": "Marketplace Rentals",
                    "rating": 14072,
                    "ratingPercent": 83,
                    "recommended": true,
                    "shippingMethods": [
                            "Standard",
                            "Expedited"
                    ],
                    "state": "OR",
                    "trackingAvailable": true,
            ],
            "quantity": 63,
            "rbbSaleId": 12,
            "shippingFee": "3.95",
            "type": "rental"
    ]
    def product = [
            "class": "com.valore.data.product.Product",
            "id": 100,
            "asin": null,
            "attributes": null,
            "createdDatetime": null,
            "description": [
                    "class": "com.valore.data.product.ProductDescription",
                    "id": 5322328
            ],
            "dimensions": null,
            "hasDescription": 1,
            "hasImage": true,
            "hasLargeImage": 1,
            "hideProduct": 0,
            "lastModifiedDatetime": null,
            "listPrice": 1995,
            "manufacturer": null,
            "name": "Social Stratification in the United States The American Profile Poster",
            "productCategoryId": 3865,
            "productCode": "9781595581556",
            "reviewTotals": null,
            "type": [
                    "productCodeType": "ISBN",
                    "name": "Book"
            ],
            "weight": null,
            edition: "9"
    ]
    def bestListings = [
            "alternate": [
                    "best": [
                            "comment": "9 This is an International Edition, Brand new in shrink wrap, All listed items are in-stock, we do not drop-shipping, ship within 48 hours by UPS, DHL, Fedex, TNT global express, Free tracking, Delivery within 3-5 business days, Items may be shipped from New Jersey, New York, Thailand, or Singapore depends upon availability, CD-ROM and/or Access code and/or Acessories may or may not come along with the book.International edition textbook",
                            "condition": "New",
                            "dueDate": null,
                            "id": 1188700440,
                            "price": [
                                    "sale": "37.80"
                            ],
                            "provider": [
                                    "city": "Brooklyn",
                                    "id": 18798,
                                    "name": "Textbookcorp",
                                    "rating": 87,
                                    "ratingPercent": 76,
                                    "recommended": false,
                                    "shippingMethods": [
                                            "Standard",
                                            "Expedited"
                                    ],
                                    "state": "NY",
                                    "trackingAvailable": false,
                            ],
                            "quantity": 2,
                            "rbbSaleId": null,
                            "shippingFee": "3.95",
                            "type": "alternate"
                    ],
                    "totalQuantity": 30
            ],
            "new": [
                    "best": [
                            "comment": "Please allow 4-14 business days for Media Mail delivery. Brand New, Perfect Condition, 100% Money Back Guarantee, Over 1,000,000 customers served",
                            "condition": "New",
                            "dueDate": null,
                            "id": 1294093518,
                            "price": [
                                    "sale": "241.75"
                            ],
                            "provider": [
                                    "city": null,
                                    "id": 13954,
                                    "name": "GreatBookPrices",
                                    "rating": 2030,
                                    "ratingPercent": 77,
                                    "recommended": false,
                                    "shippingMethods": [
                                            "Standard"
                                    ],
                                    "state": null,
                                    "trackingAvailable": false,
                            ],
                            "quantity": 50,
                            "rbbSaleId": null,
                            "shippingFee": "3.95",
                            "type": "new"
                    ],
                    "totalQuantity": 51
            ],
            "used": [
                    "best": [
                            "comment": "May include moderately worn cover, writing, markings or slight discoloration. SKU:9780078021732-4-0-3 Orders ship the same or next business day. Expedited shipping within U.S. will arrive in 3-5 days. Hassle free 14 day return policy. Contact Customer Service for questions.",
                            "condition": "Good",
                            "dueDate": null,
                            "id": 1332308505,
                            "price": [
                                    "sale": "121.90"
                            ],
                            "provider": [
                                    "city": "Salem",
                                    "id": 19022,
                                    "name": "Bookbyte",
                                    "rating": 1828,
                                    "ratingPercent": 90,
                                    "recommended": true,
                                    "shippingMethods": [
                                            "Standard",
                                            "Expedited"
                                    ],
                                    "state": "OR",
                                    "trackingAvailable": true,
                            ],
                            "quantity": 1,
                            "rbbSaleId": null,
                            "shippingFee": "3.95",
                            "type": "used"
                    ],
                    "totalQuantity": 64
            ],
            "rental": [
                    "best": [
                            "comment": "May include moderately worn cover, writing, markings or slight discoloration. SKU:9780078021732-4-0-3 Orders ship the same or next business day. Expedited shipping within U.S. will arrive in 3-5 days. Hassle free 14 day return policy. Contact Customer Service for questions.",
                            "condition": "Good",
                            "dueDate": [
                                    "quarter": "4/13/2016",
                                    "semester": "5/31/2016"
                            ],
                            "id": 896791477,
                            "price": [
                                    "semester": "19.16",
                                    "quarter": "17.98"
                            ],
                            "provider": [
                                    "city": "Salem",
                                    "id": 17072,
                                    "name": "Marketplace Rentals",
                                    "rating": 14072,
                                    "ratingPercent": 83,
                                    "recommended": true,
                                    "shippingMethods": [
                                            "Standard",
                                            "Expedited"
                                    ],
                                    "state": "OR",
                                    "trackingAvailable": true,
                            ],
                            "quantity": 63,
                            "rbbSaleId": 1332308505,
                            "shippingFee": "3.95",
                            "type": "rental"
                    ],
                    "totalQuantity": 182
            ],
            "recommended": [
                    "best": [
                            "comment": "May include moderately worn cover, writing, markings or slight discoloration. SKU:9780078021732-4-0-3 Orders ship the same or next business day. Expedited shipping within U.S. will arrive in 3-5 days. Hassle free 14 day return policy. Contact Customer Service for questions.",
                            "condition": "Good",
                            "dueDate": [
                                    "quarter": "4/13/2016",
                                    "semester": "5/31/2016"
                            ],
                            "id": 896791477,
                            "price": [
                                    "semester": "19.16",
                                    "quarter": "17.98"
                            ],
                            "provider": [
                                    "city": "Salem",
                                    "id": 17072,
                                    "name": "Marketplace Rentals",
                                    "rating": 14072,
                                    "ratingPercent": 83,
                                    "recommended": true,
                                    "shippingMethods": [
                                            "Standard",
                                            "Expedited"
                                    ],
                                    "state": "OR",
                                    "trackingAvailable": true,
                            ],
                            "quantity": 63,
                            "rbbSaleId": 1332308505,
                            "shippingFee": "3.95",
                            "type": "rental"
                    ],
                    "totalQuantity": 123
            ]
    ]

    def setup() {
        controller.cookieService = Mock(CookieService)
//        controller.trackingService = Mock(TrackingService)
        grailsApplication.config.valore.cookie.affSiteId = 'affsiteid'
        grailsApplication.config.valore.cookie.affTrackingId = 'afftrackid'
    }

    def cleanup() {
    }

    void "test affiliate rental"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.listing_id = 1
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = 100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'rentalListing'
                assert args['id'] == params.listing_id
                return rentalListing
            }
            get(1) { def args ->
                assert args['path'] == 'product'
                assert args['id'] == params.product_id
                return product
            }
        }

        when:
        apiUtil.use {
            controller.rental()
        }

        then:
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
        response.redirectedUrl == '/cart/addItem?site_id=KeViN&product_id=100&listing_id=1&sellerMarket_id=&shippingType=Standard&condition=Very+Good&term=semester'
    }

    void "test affiliate rental with bad product id"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.listing_id = 1
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = 100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'rentalListing'
                assert args['id'] == params.listing_id
                return rentalListing
            }
            get(1) { def args ->
                assert args['path'] == 'product'
                assert args['id'] == params.product_id
                return null
            }
        }

        when:
        apiUtil.use {
            controller.rental()
        }

        then:
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
        response.redirectedUrl == '/?site_id=KeViN'
    }

    void "test affiliate rbb"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.listing_id = 1
        params.sellerMarket_id = 12
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = 100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'rentalListing'
                assert args['id'] == params.listing_id
                assert args['query'] == [rbbId: 12]
                return rbbListing
            }
            get(1) { def args ->
                assert args['path'] == 'product'
                assert args['id'] == params.product_id
                return product
            }
        }

        when:
        apiUtil.use {
            controller.rental()
        }

        then:
        response.redirectedUrl == '/cart/addItem?site_id=KeViN&product_id=100&listing_id=1&sellerMarket_id=12&shippingType=Standard&condition=Good&term=semester'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
    }

    void "test bad rental listing id"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.listing_id = -11
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = 100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'rentalListing'
                assert args['id'] == params.listing_id
                return null
            }
            get(1) { def args ->
                assert args['path'] == 'product'
                assert args['id'] == params.product_id
                return product
            }
        }

        when:
        apiUtil.use {
            controller.rental()
        }

        then:
        response.redirectedUrl == '/textbooks/social-stratification-in-the-united-states-the-american-profile-poster-9th-edition/9781595581556?site_id=KeViN'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
    }

    void "test bad rental listing id and bad product code"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.listing_id = -11
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = -100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'rentalListing'
                assert args['id'] == params.listing_id
                return null
            }
            get(1) { def args ->
                assert args['path'] == 'product'
                assert args['id'] == params.product_id
                return null
            }
        }

        when:
        apiUtil.use {
            controller.rental()
        }

        then:
        response.redirectedUrl == '/?site_id=KeViN'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
    }

    void "test affiliate sale from legacy lookup url"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.sellerMarket_id = 1
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = 100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'product'
                assert args['id'] == params.product_id
                return product
            }
            get(1) { def args ->
                assert args['path'] == 'saleListing'
                assert args['id'] == params.sellerMarket_id
                return saleListing
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/cart/addItem?site_id=KeViN&product_id=100&listing_id=&sellerMarket_id=1332308505&shippingType=Standard&condition=Good'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
    }

    void "test affiliate sale from legacy lookup url with bad product id"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.sellerMarket_id = 1
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = 100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['id'] == params.product_id
                return null
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/?site_id=KeViN'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
    }

    void "test affiliate sale from legacy lookup url with bad listing id"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.sellerMarket_id = 1
        params.site_id = "KeViN"
        params.t_id = "1234"
        params.product_id = 100

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'product'
                assert args['id'] == params.product_id
                return product
            }
            get(1) { def args ->
                assert args['path'] == 'saleListing'
                assert args['id'] == params.sellerMarket_id
                return null
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/textbooks/social-stratification-in-the-united-states-the-american-profile-poster-9th-edition/9781595581556?site_id=KeViN'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, '1234', 432000, null, null, null, false)
    }

    void "test really dumb legacy url structure without a type"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.site_id = 'KeViN'
        params.isbn = '9780321558237'

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                [name:'book', edition:'1']
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/textbooks/book-1st-edition/9780321558237?site_id=KeViN'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)    }

    void "test really dumb legacy url structure with a type and bad isbn"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.site_id = 'KeViN'
        params.isbn = '9780321558237'
        params.default = 'buy'

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == '9780321558237'
                return null
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/?site_id=KeViN'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
    }

    void "test really dumb legacy url structure with a type of buy"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.site_id = 'KeViN'
        params.isbn = '9780321558237'
        params.default = 'buy'

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == '9780321558237'
                return product
            }
            get(1) { def args ->
                assert args['path'] == 'saleListing/best'
                assert args['id'] == '9780321558237'
                return bestListings
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/cart/addItem?site_id=KeViN&product_id=100&listing_id=&sellerMarket_id=1188700440&shippingType=Standard&condition=New'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
    }

    void "test really dumb legacy url structure with a type of new_and_used"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.site_id = 'KeViN'
        params.isbn = '9780321558237'
        params.default = 'new_and_used'

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == '9780321558237'
                return product
            }
            get(1) { def args ->
                assert args['path'] == 'saleListing/best'
                assert args['id'] == '9780321558237'
                return bestListings
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/cart/addItem?site_id=KeViN&product_id=100&listing_id=&sellerMarket_id=1332308505&shippingType=Standard&condition=Good'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
    }

    void "test really dumb legacy url structure with a type of rent"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.site_id = 'KeViN'
        params.isbn = '9780321558237'
        params.default = 'rent'

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == '9780321558237'
                return product
            }
            get(1) { def args ->
                assert args['path'] == 'saleListing/best'
                assert args['id'] == '9780321558237'
                return bestListings
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/cart/addItem?site_id=KeViN&product_id=100&listing_id=896791477&sellerMarket_id=1332308505&shippingType=Standard&condition=Good&term=semester'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
    }

    void "test really dumb legacy url structure with a type and no listings"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.site_id = 'KeViN'
        params.isbn = '9780321558237'
        params.default = 'buy'

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args['path'] == 'affiliate/click'
                assert args['id'] == params.site_id
                assert args['json'].ipAddress == '127.0.0.1'
                return true
            }
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == '9780321558237'
                return product
            }
            get (1) { def args ->
                assert args['path'] == 'saleListing/best'
                assert args['id'] == '9780321558237'
                return []
            }
        }

        when:
        apiUtil.use {
            controller.sale()
        }

        then:
        response.redirectedUrl == '/textbooks/social-stratification-in-the-united-states-the-american-profile-poster-9th-edition/9781595581556?site_id=KeViN'
        1 * controller.cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, 'KeViN', 432000, null, null, null, false)
    }

    void "test add listing to cart method"() {
        when:
        controller.addListingToCart(rentalListing, product)

        then:
        response.redirectedUrl == "/cart/addItem?product_id=100&listing_id=1&sellerMarket_id=&shippingType=Standard&condition=Very+Good&term=semester"
    }
}
