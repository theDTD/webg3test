package com.valore

import com.valore.analytics.TrackingService
import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import org.grails.web.json.JSONObject
import spock.lang.Specification
import spock.lang.Unroll

@TestFor(ProductController)
class ProductControllerSpec extends Specification {
    String testApiUrl = "testUrl"

    def result
    def json

    def setup() {
        grailsApplication.config.valore.apiUrl = testApiUrl
        grailsApplication.config.valore.apiKey = 'testKey'
        grailsApplication.config.valore.legacyUrl = "legacyUrl"
        controller.trackingService = Mock(TrackingService)
        controller.seoService = Mock(SeoService)
    }

    def cleanup() {
    }

    void "test details bad isbn"() {
        given:
        params.id = 1

        when:
        result = controller.details()

        then:
        1 * controller.trackingService.enhancedEcommerceViewEvent(1)
        0 * controller.trackingService.enhancedEcommerceCompletionEvent(1)
        response.redirectUrl == "legacyUrl/Search.ISBNResults.do?old=yes&isbn=$params.id"
        result == null
    }

    void "test details getProduct call fails"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.id = 9780321558237

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == params.id.toString()
                null
            }
        }

        when:
        apiUtil.use {
            result = controller.details()
        }

        then:
        1 * controller.trackingService.enhancedEcommerceViewEvent(1)
        0 * controller.trackingService.enhancedEcommerceCompletionEvent(1)
        response.redirectUrl == "legacyUrl/Search.ISBNResults.do?old=yes&isbn=$params.id"
        result == null
    }

    void "test details ok"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.id = 9780321558237
        json = [name: "product", edition: "1", productCode: "978123", isbn10: "012345"]

        apiUtil.demand.with {
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == params.id.toString()
                json
            }
            get(1) { def args ->
                assert args['path'] == 'saleListing/best'
                assert args['id'] == params.id.toString()
                json
            }
        }

        when:
        apiUtil.use {
            controller.details()
        }

        then:
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/product/details"
        controller.modelAndView.model.size() == 3
        controller.modelAndView.model.product == json
        controller.modelAndView.model.best == json
        controller.modelAndView.model.pageTitle == "product 1st Edition | Rent 978123 | 012345"
        1 * controller.trackingService.enhancedEcommerceViewEvent(1)
        1 * controller.trackingService.enhancedEcommerceCompletionEvent(1)
    }

    void "test details - blacklisted"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.id = 9780321558237
        json = [blacklisted: true]

        apiUtil.demand.with {
            get(1) { def args ->
                assert args['path'] == 'productDetails'
                assert args['id'] == params.id.toString()
                json
            }
        }

        when:
        apiUtil.use {
            controller.details()
        }

        then:
        1 * controller.trackingService.enhancedEcommerceViewEvent(1)
        response.status == HttpStatus.SC_MOVED_TEMPORARILY
        response.redirectUrl == "/"
    }

    void "test listingsSummary"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.id = '1'
        json = [key: "value"] as JSONObject

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args['path'] == 'saleListing/summary'
                assert args['id'] == params.id.toString()
                json
            }
        }

        when:
        apiUtil.use {
            controller.listingsSummary()
        }

        then:
        response.status == HttpStatus.SC_OK
        response.getText() == json.toString()
    }

    void "test listings"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.id = '1'
        params.offset = '1'
        params.max = '50'
        params.type = 'New'
        json = [key: "value"] as JSONObject

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args['path'] == 'saleListing/inventory'
                assert args['id'] == params.id.toString()
                assert args['query']['offset'] == params.offset
                assert args['query']['max'] == params.max
                assert args['query']['type'] == params.type
                json
            }
        }

        when:
        apiUtil.use {
            controller.listings()
        }

        then:
        response.status == HttpStatus.SC_OK
        response.getText() == json.toString()
    }

    void "test listings (URISyntaxException)"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.id = '1'
        params.offset = '1'
        params.max = '50'
        params.type = 'New'
        json = [key: "value"] as JSONObject

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args['path'] == 'saleListing/inventory'
                assert args['id'] == params.id.toString()
                assert args['query']['offset'] == params.offset
                assert args['query']['max'] == params.max
                assert args['query']['type'] == params.type
                throw new URISyntaxException("input", "reason")
            }
        }

        when:
        apiUtil.use {
            controller.listings()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
        response.text == "Invalid request"
    }

    void "test reviews"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        params.id = '1'
        params.max = '50'
        json = [key: "value"] as JSONObject

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args['path'] == 'productReview'
                assert args['query']['productId'] == params.id
                assert args['query']['max'] == params.max
                json
            }
        }

        when:
        apiUtil.use {
            result = controller.reviews()
        }

        then:
        response.status == HttpStatus.SC_OK
        response.getText() == json.toString()
    }

}
