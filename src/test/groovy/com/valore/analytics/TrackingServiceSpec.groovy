package com.valore.analytics

import grails.plugin.cookie.CookieService
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.grails.plugins.testing.GrailsMockHttpServletRequest
import org.grails.web.servlet.mvc.GrailsWebRequest
import org.grails.web.util.WebUtils
import org.slf4j.Logger
import spock.lang.Specification

@TestFor(TrackingService)
class TrackingServiceSpec extends Specification{

    def setup() {
        service.segmentIOService = Mock(SegmentIOService)
        service.cookieService = Mock(CookieService)
    }

    def cleanup() {
    }

    void "test pageView"() {
        given:
        def uri = '/some/page'
        def referer = "http://www.google.com"
        def ip = "1.1.1.1"
        def siteId = 'somethin'
        def request = Mock(GrailsMockHttpServletRequest)
        service.metaClass.getGAClientId = { -> return "jibba.jabba" }

        def params = [
                utm_source: 'hi',
                utm_medium: 'sup',
                utm_campaign: 'hello',
                utm_term: 'greetings',
                utm_content: 'bye'
        ]

        when:
        service.pageView(request, params)

        then:
        1 * service.cookieService.getCookie('ValoreUserID') >> null
        1 * service.cookieService.getCookie('ValoreAnonID') >> 1
        1 * service.cookieService.getCookie('VAffSiteID') >> siteId
        1 * request.getHeader('x-forwarded-for') >> ip
        1 * request.getHeader('referer') >> referer
        1 * request.getProperty('forwardURI') >> uri
        1 * service.segmentIOService.page( *_ ) >> { args ->
            def (user, uriParam, category, properties, date, context) = args
            assert user == '1'
            assert uriParam == uri
            assert category == null

            assert properties.siteId == siteId

            assert date instanceof org.joda.time.DateTime

            assert context.campaign.source == params.utm_source
            assert context.campaign.medium == params.utm_medium
            assert context.campaign.name == params.utm_campaign
            assert context.campaign.term == params.utm_term
            assert context.campaign.content == params.utm_content

            assert context.integrations == service.integrations
        }

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(service.class)
    }

    void "test pageView with spider user agent"() {
        given:
        service.metaClass.getGAClientId = { -> return "jibba.jabba" }
        def request = Mock(GrailsMockHttpServletRequest)
        def userAgent = 'Baiduspider'

        def params = [
                utm_source: 'hi',
                utm_medium: 'sup',
                utm_campaign: 'hello',
                utm_term: 'greetings',
                utm_content: 'bye'
        ]

        when:
        service.pageView(request, params)

        then:
        1 * request.getHeader('User-Agent') >> userAgent
        0 * service.cookieService.getCookie('ValoreUserID')
        0 * request.getHeader('x-forwarded-for')
        0 * service.segmentIOService.page( *_ )

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(service.class)
    }

    void "test identify"() {
        given:
        def traits = [ param: 'value' ]
        def request = Mock(GrailsMockHttpServletRequest)
        def grailsWebReq = Mock(GrailsWebRequest)
        def webUtilMock = new MockFor(WebUtils)
        webUtilMock.demand.with {
            retrieveGrailsWebRequest(1) { return grailsWebReq }
        }

        when:
        webUtilMock.use {
            service.identify(traits)
        }

        then:
        1 * grailsWebReq.getCurrentRequest() >> request
        1 * service.cookieService.getCookie('ValoreUserID') >> 1
        1 * service.segmentIOService.identify( *_ ) >> { args ->
            def (user, traitMap) = args
            assert user == '1'
            assert traitMap.param == traits.param
        }
    }

    void "test identify - no user id"() {
        given:
        def traits = [ param: 'value' ]
        service.log = Mock(Logger)
        def request = Mock(GrailsMockHttpServletRequest)
        def grailsWebReq = Mock(GrailsWebRequest)
        def webUtilMock = new MockFor(WebUtils)
        webUtilMock.demand.with {
            retrieveGrailsWebRequest(1) { return grailsWebReq }
        }

        when:
        webUtilMock.use {
            service.identify(traits)
        }

        then:
        1 * grailsWebReq.getCurrentRequest() >> request
        1 * service.cookieService.getCookie('ValoreUserID') >> null
        1 * service.log.error('NO userId available when attempting to identify user to segment.')
        0 * service.segmentIOService.identify( *_ )
    }

    void "test trackEvent"() {
        given:
        def name = 'eventName'
        def props = [ param: 'value' ]
        def request = Mock(GrailsMockHttpServletRequest)
        service.metaClass.getGAClientId = { -> return "jibba.jabba" }

        when:
        service.trackEvent( request, name, props )

        then:
        1 * service.cookieService.getCookie('ValoreUserID') >> null
        1 * service.cookieService.getCookie('ValoreAnonID') >> 1
        1 * service.segmentIOService.track( *_ ) >> { args ->
            def (user, eventName, properties, date, context) = args

            assert user == '1'
            assert eventName == name
            assert properties.param == props.param
            assert date instanceof org.joda.time.DateTime
            assert context.integrations == service.integrations
        }

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(service.class)
    }

//    void "test enhancedEcommerceView"() {
//        given:
//        service.metaClass.getGAClientId = { -> return "jibba.jabba" }
//        def request = Mock(GrailsMockHttpServletRequest)
//        def grailsWebReq = Mock(GrailsWebRequest)
//        def webUtilMock = new MockFor(WebUtils)
//        webUtilMock.demand.with {
//            retrieveGrailsWebRequest(1) { return grailsWebReq }
//        }
//        def step = 1
//
//        when:
//        webUtilMock.use {
//            service.enhancedEcommerceViewEvent(step)
//        }
//
//        then:
//        1 * grailsWebReq.getCurrentRequest() >> request
//        1 * service.segmentIOService.track( *_ ) >> { args ->
//            def (user, eventName, properties, date, context) = args
//
//            assert eventName == 'Viewed Checkout Step'
//            assert properties.step == step
//        }
//
//        cleanup:
//        GroovySystem.metaClassRegistry.removeMetaClass(service.class)
//    }
//
//    void "test enhancedEcommerceCompletion"() {
//        given:
//        service.metaClass.getGAClientId = { -> return "jibba.jabba" }
//        def request = Mock(GrailsMockHttpServletRequest)
//        def grailsWebReq = Mock(GrailsWebRequest)
//        def webUtilMock = new MockFor(WebUtils)
//        webUtilMock.demand.with {
//            retrieveGrailsWebRequest(1) { return grailsWebReq }
//        }
//        def step = 1
//
//        when:
//        webUtilMock.use {
//            service.enhancedEcommerceCompletionEvent(step)
//        }
//
//        then:
//        1 * grailsWebReq.getCurrentRequest() >> request
//        1 * service.segmentIOService.track( *_ ) >> { args ->
//            def (user, eventName, properties, date, context) = args
//
//            assert eventName == 'Completed Checkout Step'
//            assert properties.step == step
//        }
//
//        cleanup:
//        GroovySystem.metaClassRegistry.removeMetaClass(service.class)
//    }
//
//    void "test enhancedEcommerceView as spider"() {
//        given:
//        def request = Mock(GrailsMockHttpServletRequest)
//        def grailsWebReq = Mock(GrailsWebRequest)
//        def webUtilMock = new MockFor(WebUtils)
//        def userAgent = "BaiduSpider"
//        webUtilMock.demand.with {
//            retrieveGrailsWebRequest(1) { return grailsWebReq }
//        }
//        def step = 1
//
//        when:
//        webUtilMock.use {
//            service.enhancedEcommerceViewEvent(step)
//        }
//
//        then:
//        1 * grailsWebReq.getCurrentRequest() >> request
//        1 * request.getHeader('User-Agent') >> userAgent
//        0 * service.segmentIOService.track( *_ )
//
//    }

    void "test getGAClientId"() {
        given:
        def clientId
        def grailsWebReq = Mock(GrailsWebRequest)
        def webUtilMock = new MockFor(WebUtils)
        webUtilMock.demand.with {
            retrieveGrailsWebRequest(1) { return grailsWebReq }
        }

        when:
        webUtilMock.use {
            clientId = service.getGAClientId()
        }

        then:
        1 * service.cookieService.getCookie("_ga") >> "GA1.1.327350844.1463159002"
        clientId == "327350844.1463159002"
    }


    void "test getGAClientId no cookie"() {
        given:
        def clientId
        def request = Mock(GrailsMockHttpServletRequest)
        def grailsWebReq = Mock(GrailsWebRequest)
        def webUtilMock = new MockFor(WebUtils)
        webUtilMock.demand.with {
            retrieveGrailsWebRequest(1) { return grailsWebReq }
        }

        when:
        webUtilMock.use {
            clientId = service.getGAClientId()
        }

        then:
        1 * grailsWebReq.getCurrentRequest() >> request
        1 * service.cookieService.getCookie("_ga") >> null
        1 * request.getAttribute("_ga") >> null
        clientId.contains(".")
    }

    void "test getGAClientId bad cookie"() {
        given:
        def clientId
        def request = Mock(GrailsMockHttpServletRequest)
        def grailsWebReq = Mock(GrailsWebRequest)
        def webUtilMock = new MockFor(WebUtils)
        webUtilMock.demand.with {
            retrieveGrailsWebRequest(2) { return grailsWebReq }
        }

        when:
        webUtilMock.use {
            clientId = service.getGAClientId()
        }

        then:
        1 * grailsWebReq.getCurrentRequest() >> request
        1 * service.cookieService.getCookie("_ga") >> "gbababababab........"
        1 * service.cookieService.deleteCookie("_ga")
        1 * grailsWebReq.getCurrentRequest() >> request
        1 * service.cookieService.getCookie("_ga")
        clientId.contains(".")
    }
}