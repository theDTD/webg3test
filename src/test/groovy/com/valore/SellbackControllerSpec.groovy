package com.valore

import com.valore.checkout.CartService
import com.valore.util.ApiUtil
import grails.converters.JSON
import grails.test.mixin.TestFor
import grails.util.Environment
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import org.slf4j.Logger
import spock.lang.Specification
import spock.lang.Unroll

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(SellbackController)
class SellbackControllerSpec extends Specification {

    def setup() {
        controller.sellbackService = Mock(SellbackService)
        controller.cartService = Mock(CartService)
        controller.encryptedCookieService = Mock(EncryptedCookieService)
    }

    def cleanup() {
    }

    @Unroll
    void "test index"() {
        given:
        params.modifier = modifier

        List<Map> faq = [[id: 1, question: "question", answer: "answer"]]
        List<Map> howItWorks = [[id: 1, icon: "icon", header: "header", body: "body"]]
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
            "faq": faq,
            "how-it-works": howItWorks,
            "header-banner": headerBanner,
            "footer-banner": footerBanner,
            "modifier": modifier
        ]
        Map<String, String> images = [
            headerLogo: 'header-logo.svg',
            upperSearch: 'search-upper.png',
            lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
            knowledgeBase: faq,
            howItWorksData: howItWorks,
            headerBannerData: headerBanner,
            footerBannerData: footerBanner,
            images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/${modifier}/$v"]}
        ]

        when:
        controller.index()

        then:
        1 * controller.sellbackService.returnFileContentAsMap(modifier) >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> null
        0 * controller.cartService.getSellbackCart(*_)
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/sellback/index"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.initialItemData == "${[] as JSON}"
        controller.modelAndView.model.staticData == "${expectedStaticData as JSON}"
        controller.modelAndView.model.whitelabel == modifier

        where:
        modifier << ['default', 'walmart']
    }

    void "test index - existing active cart and item data"() {
        given:
        params.modifier = 'walmart'

        List<Map> faq = [[id: 1, question: "question", answer: "answer"]]
        List<Map> howItWorks = [[id: 1, icon: "icon", header: "header", body: "body"]]
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
                "faq": faq,
                "how-it-works": howItWorks,
                "header-banner": headerBanner,
                "footer-banner": footerBanner,
                "modifier": 'walmart'
        ]
        Map<String, String> images = [
                headerLogo: 'header-logo.svg',
                upperSearch: 'search-upper.png',
                lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
                knowledgeBase: faq,
                howItWorksData: howItWorks,
                headerBannerData: headerBanner,
                footerBannerData: footerBanner,
                images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/walmart/$v"]}
        ]

        def apiUtilMockFor = new MockFor(ApiUtil)
        apiUtilMockFor.demand.with {
            post(1) { args ->
                assert args.path == 'productDetails'
                assert args.id == 'isbn1'
                assert args.includeStatus
                [[id: 1], HttpStatus.SC_OK, null]
            }
            post(1) { args ->
                assert args.path == 'productDetails'
                assert args.id == 'isbn2'
                assert args.includeStatus
                [null, HttpStatus.SC_INTERNAL_SERVER_ERROR, 'Error']
            }
        }

        controller.log = Mock(Logger)

        when:
        apiUtilMockFor.use {
            controller.index()
        }

        then:
        1 * controller.sellbackService.returnFileContentAsMap('walmart') >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> 123
        1 * controller.cartService.getSellbackCart(123) >> [
                id: 123,
                state: 'ACTIVE',
                items: [
                        [id: 1, price: 1000, product: [productCode: 'isbn1']],
                        [id: 2, price: 2000, product: [productCode: 'isbn2']]
                ]
        ]
        1 * controller.log.error("Received an error while retrieving product details for item 2")
        1 * controller.log.error("Error: Error")
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/sellback/index"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.initialItemData ==
                "${[[addedItem: [id: 1, price: 10, product: [productCode: 'isbn1']],productDetails: [id: 1]]] as JSON}"
        controller.modelAndView.model.staticData == "${expectedStaticData as JSON}"
        controller.modelAndView.model.whitelabel == 'walmart'
    }

    @Unroll
    void "test index with whitelabel subdomain"() {
        given:
        def uriMockFor = new MockFor(URI)
        uriMockFor.demand.with {
            getHost(1) {
                "${modifier}.valorebooks.com"
            }
        }

        and:
        List<Map> faq = [[id: 1, question: "question", answer: "answer"]]
        List<Map> howItWorks = [[id: 1, icon: "icon", header: "header", body: "body"]]
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
                "faq": faq,
                "how-it-works": howItWorks,
                "header-banner": headerBanner,
                "footer-banner": footerBanner,
                "modifier": modifier
        ]
        Map<String, String> images = [
                headerLogo: 'header-logo.svg',
                upperSearch: 'search-upper.png',
                lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
                knowledgeBase: faq,
                howItWorksData: howItWorks,
                headerBannerData: headerBanner,
                footerBannerData: footerBanner,
                images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/${modifier}/$v"]}
        ]

        when:
        uriMockFor.use {
            controller.index()
        }

        then:
        1 * controller.sellbackService.getSiteIdFromDynamoDB(modifier) >> expected
        call * controller.encryptedCookieService.setCookie(*_)
        1 * controller.sellbackService.returnFileContentAsMap(modifier) >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> null
        0 * controller.cartService.getSellbackCart(*_)
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/sellback/index"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.initialItemData == "${[] as JSON}"
        controller.modelAndView.model.staticData == "${expectedStaticData as JSON}"
        controller.modelAndView.model.whitelabel == modifier

        where:
        modifier << ["localhost", 'walmart']
        call << [0, 1]
        expected << [null, 'siteId']
    }

    void "test add item - bad isbn"() {
        given:
        params.isbn = 'bad'

        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(0) { args -> }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        1 * controller.cartService.getSellbackCartIdFromCookie() >> 123
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == 'An invalid ISBN was provided.'
    }

    void "test add item - bad response from api due to cart state of checked out"() {
        given:
        params.isbn = '9780000000019'

        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert args.path == 'sellbackCartItem'
                def jsonArg = args.json
                assert jsonArg?.isbn == '9780000000019'
                assert jsonArg?.cartId == 123
                assert jsonArg?.buybackPrice == null
                assert args.includeStatus
                [null, HttpStatus.SC_BAD_REQUEST, 'Error']
            }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        1 * controller.cartService.getSellbackCartIdFromCookie() >> 123
        1 * controller.cartService.getSellbackCart(123) >> [state: 'CHECKED_OUT']
        1 * controller.encryptedCookieService.deleteCookie('VSellbackCartID') >> null
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == 'Cannot add item to cart 123'
    }

    void "test add item - bad response from api"() {
        given:
        params.isbn = '9780000000019'

        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert args.path == 'sellbackCartItem'
                def jsonArg = args.json
                assert jsonArg?.isbn == '9780000000019'
                assert jsonArg?.cartId == 123
                assert jsonArg?.buybackPrice == null
                assert args.includeStatus
                [null, HttpStatus.SC_BAD_REQUEST, 'Error']
            }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        1 * controller.cartService.getSellbackCartIdFromCookie() >> 123
        1 * controller.cartService.getSellbackCart(123) >> [state: 'ACTIVE']
        0 * controller.encryptedCookieService.deleteCookie(*_)
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == 'Cannot add item to cart 123'
    }

    void "test add item - bad response from api no quote"() {
        given:
        params.isbn = '9780000000019'

        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert args.path == 'sellbackCartItem'
                def jsonArg = args.json
                assert jsonArg?.isbn == '9780000000019'
                assert jsonArg?.cartId == 123
                assert jsonArg?.buybackPrice == null
                assert args.includeStatus
                [null, HttpStatus.SC_BAD_REQUEST, 'Obtained a quote of $0 for the given ISBN']
            }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        1 * controller.cartService.getSellbackCartIdFromCookie() >> 123
        1 * controller.cartService.getSellbackCart(123) >> [state: 'ACTIVE']
        0 * controller.encryptedCookieService.deleteCookie(*_)
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == 'Obtained a quote of $0 for the given ISBN'
    }

    void "test add item - bad product details request"() {
        given:
        params.isbn = '9780000000019'

        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert args.path == 'sellbackCartItem'
                def jsonArg = args.json
                assert jsonArg?.isbn == '9780000000019'
                assert jsonArg?.cartId == 123
                assert jsonArg?.buybackPrice == null
                assert args.includeStatus
                [[items: [[id: 1, product: [productCode: 'productCode']]]], HttpStatus.SC_OK, null]
            }
            post(1) { args ->
                assert args.path == 'productDetails'
                assert args.id == 'productCode'
                assert args.includeStatus
                [null, HttpStatus.SC_BAD_REQUEST, 'Test']
            }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        1 * controller.cartService.getSellbackCartIdFromCookie() >> 123
        0 * controller.cartService.getSellbackCart(*_)
        0 * controller.encryptedCookieService.deleteCookie(*_)
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == "Cannot get product details for item 1"
    }

    void "test add item - success"() {
        given:
        params.isbn = '9780000000019'

        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert args.path == 'sellbackCartItem'
                def jsonArg = args.json
                assert jsonArg?.isbn == '9780000000019'
                assert jsonArg?.cartId == 123
                assert jsonArg?.buybackPrice == null
                assert args.includeStatus
                [[items: [[id: 1, product: [productCode: 'productCode'], price: 1234, buybackPrice: 4321]]],
                 HttpStatus.SC_OK, null]
            }
            post(1) { args ->
                assert args.path == 'productDetails'
                assert args.id == 'productCode'
                assert args.includeStatus
                [[id: 2], HttpStatus.SC_OK, null]
            }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        1 * controller.cartService.getSellbackCartIdFromCookie() >> 123
        0 * controller.cartService.getSellbackCart(*_)
        0 * controller.encryptedCookieService.deleteCookie(*_)
        response.status == HttpStatus.SC_OK
        response.json?.addedItem?.id == 1
        response.json?.productDetails?.id == 2
    }

    void "test removeItem"() {
        given:
        def id = 54321
        def cartId = 12345
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                args.path == 'sellbackCartItem/remove'
                args.id == id
                args.json?.cartId == cartId
                args.includeStatus
                [null, HttpStatus.SC_OK, null]
            }
        }
        params.id = id
        request.json = [cartId: cartId]

        when:
        apiUtilMock.use {
            controller.removeItem()
        }

        then:
        response.status == HttpStatus.SC_OK
    }

    void "test removeItem - api error"() {
        given:
        def id = 54321
        def cartId = 12345
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                args.path == 'sellbackCartItem/remove'
                args.id == id
                args.json?.cartId == cartId
                args.includeStatus
                [null, HttpStatus.SC_BAD_REQUEST, 'Error']
            }
        }
        params.id = id
        request.json = [cartId: cartId]

        when:
        apiUtilMock.use {
            controller.removeItem()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test createAccount"() {
        when:
        controller.createAccount()

        then:
        controller.modelAndView.viewName == "/sellback/create-account"
    }

    void "test payment"() {
        given:
        params.modifier = modifier

        List<Map> faq = [[id: 1, question: "question", answer: "answer"]]
        List<Map> howItWorks = [[id: 1, icon: "icon", header: "header", body: "body"]]
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
                "faq": faq,
                "how-it-works": howItWorks,
                "header-banner": headerBanner,
                "footer-banner": footerBanner,
                "modifier": modifier
        ]
        Map<String, String> images = [
                headerLogo: 'header-logo.svg',
                upperSearch: 'search-upper.png',
                lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
                knowledgeBase: faq,
                howItWorksData: howItWorks,
                headerBannerData: headerBanner,
                footerBannerData: footerBanner,
                images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/${modifier}/$v"]}
        ]

        when:
        controller.payment()

        then:
        1 * controller.sellbackService.returnFileContentAsMap(modifier) >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> null
        0 * controller.cartService.getSellbackCart(*_)
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/sellback/payment"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.initialItemData == "${[] as JSON}"
        controller.modelAndView.model.staticData == "${expectedStaticData as JSON}"
        controller.modelAndView.model.whitelabel == modifier

        where:
        modifier << ['default', 'walmart']
    }

    @Unroll
    void "test payment with whitelabel subdomain"() {
        given:
        def uriMockFor = new MockFor(URI)
        uriMockFor.demand.with {
            getHost(1) {
                "${modifier}.valorebooks.com"
            }
        }

        and:
        List<Map> faq = [[id: 1, question: "question", answer: "answer"]]
        List<Map> howItWorks = [[id: 1, icon: "icon", header: "header", body: "body"]]
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
                "faq": faq,
                "how-it-works": howItWorks,
                "header-banner": headerBanner,
                "footer-banner": footerBanner,
                "modifier": modifier
        ]
        Map<String, String> images = [
                headerLogo: 'header-logo.svg',
                upperSearch: 'search-upper.png',
                lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
                knowledgeBase: faq,
                howItWorksData: howItWorks,
                headerBannerData: headerBanner,
                footerBannerData: footerBanner,
                images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/${modifier}/$v"]}
        ]

        when:
        uriMockFor.use {
            controller.payment()
        }

        then:
        1 * controller.sellbackService.getSiteIdFromDynamoDB(modifier) >> expected
        call * controller.encryptedCookieService.setCookie(*_)
        1 * controller.sellbackService.returnFileContentAsMap(modifier) >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> null
        0 * controller.cartService.getSellbackCart(*_)
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/sellback/payment"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.initialItemData == "${[] as JSON}"
        controller.modelAndView.model.staticData == "${expectedStaticData as JSON}"
        controller.modelAndView.model.whitelabel == modifier

        where:
        modifier << ["localhost", 'walmart']
        call << [0, 1]
        expected << [null, 'siteId']
    }

    void "test signIn"() {
        given:
        params.modifier = modifier

        List<Map> faq = []
        List<Map> howItWorks = []
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
                "faq": faq,
                "how-it-works": howItWorks,
                "header-banner": headerBanner,
                "footer-banner": footerBanner,
                "modifier": modifier
        ]
        Map<String, String> images = [
                headerLogo: 'header-logo.svg',
                upperSearch: 'search-upper.png',
                lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
                knowledgeBase: faq,
                howItWorksData: howItWorks,
                headerBannerData: headerBanner,
                footerBannerData: footerBanner,
                images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/${modifier}/$v"]}
        ]

        when:
        controller.signIn()

        then:
        1 * controller.sellbackService.returnFileContentAsMap(modifier) >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> null
        0 * controller.cartService.getSellbackCart(*_)
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/sellback/sign-in"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.initialItemData == "${[] as JSON}"
        controller.modelAndView.model.staticData == "${expectedStaticData as JSON}"
        controller.modelAndView.model.whitelabel == modifier

        where:
        modifier << ['default', 'walmart']

    }

    @Unroll
    void "test signIn with whitelabel subdomain"() {
        given:
        def uriMockFor = new MockFor(URI)
        uriMockFor.demand.with {
            getHost(1) {
                "${modifier}.valorebooks.com"
            }
        }

        and:
        List<Map> faq = []
        List<Map> howItWorks = []
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
                "faq": faq,
                "how-it-works": howItWorks,
                "header-banner": headerBanner,
                "footer-banner": footerBanner,
                "modifier": modifier
        ]
        Map<String, String> images = [
                headerLogo: 'header-logo.svg',
                upperSearch: 'search-upper.png',
                lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
                knowledgeBase: faq,
                howItWorksData: howItWorks,
                headerBannerData: headerBanner,
                footerBannerData: footerBanner,
                images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/${modifier}/$v"]}
        ]

        when:
        uriMockFor.use {
            controller.payment()
        }

        then:
        1 * controller.sellbackService.getSiteIdFromDynamoDB(modifier) >> expected
        call * controller.encryptedCookieService.setCookie(*_)
        1 * controller.sellbackService.returnFileContentAsMap(modifier) >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> null
        0 * controller.cartService.getSellbackCart(*_)
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/sellback/payment"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.initialItemData == "${[] as JSON}"
        controller.modelAndView.model.staticData == "${expectedStaticData as JSON}"
        controller.modelAndView.model.whitelabel == modifier

        where:
        modifier << ["localhost", 'walmart']
        call << [0, 1]
        expected << [null, 'siteId']
    }

    void "test getData"() {
        given:
        def data = null
        params.modifier = modifier

        List<Map> faq = [[id: 1, question: "question", answer: "answer"]]
        List<Map> howItWorks = [[id: 1, icon: "icon", header: "header", body: "body"]]
        String headerBanner = 'headerBanner'
        String footerBanner = 'footerBanner'
        Map<String, Object> contentFromS3 = [
                "faq": faq,
                "how-it-works": howItWorks,
                "header-banner": headerBanner,
                "footer-banner": footerBanner,
                "modifier": modifier
        ]
        Map<String, String> images = [
                headerLogo: 'header-logo.svg',
                upperSearch: 'search-upper.png',
                lowerSearch: 'search-lower.png'
        ]
        Map expectedStaticData = [
                knowledgeBase: faq,
                howItWorksData: howItWorks,
                headerBannerData: headerBanner,
                footerBannerData: footerBanner,
                images: images.collectEntries {k, v -> [k, "https://valore-images-qa.s3.amazonaws.com/sellback/landing/${modifier}/$v"]}
        ]

        when:
        data = controller.getData()

        then:
        1 * controller.sellbackService.returnFileContentAsMap(modifier) >> contentFromS3
        1 * controller.cartService.getSellbackCartIdFromCookie() >> null
        0 * controller.cartService.getSellbackCart(*_)
        data.initialItemData == "${[] as JSON}"
        data.staticData == "${expectedStaticData as JSON}"
        data.whitelabel == modifier

        where:
        modifier << ['default', 'walmart']
    }

    void "test redirect on production - index"() {
        given:
        SellbackController sellbackSpy = Spy(SellbackController)

        Environment.metaClass.static.getCurrent = {
            Environment.PRODUCTION
        }

        when:
        sellbackSpy.index()

        then:
        response.redirectUrl == "/"

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)

    }

    void "test redirect on production - signIn"() {
        given:
        SellbackController sellbackSpy = Spy(SellbackController)

        Environment.metaClass.static.getCurrent = {
            Environment.PRODUCTION
        }

        when:
        sellbackSpy.signIn()

        then:
        response.redirectUrl == "/"

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)

    }

    void "test redirect on production - createAccount"() {
        given:
        SellbackController sellbackSpy = Spy(SellbackController)

        Environment.metaClass.static.getCurrent = {
            Environment.PRODUCTION
        }

        when:
        sellbackSpy.createAccount()

        then:
        response.redirectUrl == "/"

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)

    }

    void "test redirect on production - payment"() {
        given:
        SellbackController sellbackSpy = Spy(SellbackController)

        Environment.metaClass.static.getCurrent = {
            Environment.PRODUCTION
        }

        when:
        sellbackSpy.payment()

        then:
        response.redirectUrl == "/"

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)

    }

}
