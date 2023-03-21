package com.valore.legacy

import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import org.grails.web.json.JSONObject
import spock.lang.Specification
import spock.lang.Unroll

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ProductSearchController)
class ProductSearchControllerSpec extends Specification {

    def apiUtilMock
    def json

    def setup() {
        apiUtilMock = new MockFor(ApiUtil)
    }

    def cleanup() {
    }

    void "test search -- ok"() {
        given:
        params.query = "test"
        String url = "${grailsApplication.config.valore.legacyUrl}"
        json = [query: params.query] as JSONObject

        and:
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 4
                assert args['domain'] == url
                assert args['path'] == "Search.SearchSuggest.do"
                assert args['query'] == [query: params.query, department: "All+Departments"]
                [json, HttpStatus.SC_OK, null]
            }
        }

        when:
        apiUtilMock.use {
            controller.search()
        }

        then:
        response.status == HttpStatus.SC_OK

    }

    @Unroll
    void "test search -- bad request"() {
        given:
        params.query = ""
        String url = "${grailsApplication.config.valore.legacyUrl}"
        json = [query: params.query] as JSONObject
        def responseArr = [json, statusCode, null]

        and:
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 4
                assert args['domain'] == url
                assert args['path'] == "Search.SearchSuggest.do"
                assert args['query'] == [query: params.query, department: "All+Departments"]
                responseArr
            }
        }

        when:
        apiUtilMock.use {
            controller.search()
        }

        then:
        response.status == HttpStatus.SC_NOT_FOUND
        response.text == "An error occurred while retrieving search results for ${params.query}"

        where:
        statusCode << [HttpStatus.SC_NOT_FOUND, HttpStatus.SC_BAD_REQUEST]
    }

}
