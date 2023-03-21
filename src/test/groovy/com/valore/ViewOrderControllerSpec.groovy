package com.valore

import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import grails.util.Environment
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification
import spock.lang.Unroll

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ViewOrderController)

class ViewOrderControllerSpec extends Specification {

    void "test index"() {
        when:
        controller.index()

        then:
        controller.response.status == HttpStatus.SC_OK
    }


    @Unroll
    void "test searchOrder"() {
        given:
        request.JSON = json
        def api = new MockFor(ApiUtil)
        api.demand.post(post) { args ->
            assert args.path == "viewOrder/validateTrackingInfo"
            assert args.json == json
            postResult
        }

        when:
        api.use {
            controller.searchOrder()
        }

        then:
        response.status == expected.status
        if (expected.json)
            response.json == expected.json
        else
            response.text == expected.text

        where:
        json << [[], [id: 1, orderInfo: "email"], [id: 1, orderInfo: "not found"]]
        post << [0, 1, 1]
        postResult << [null, [[order: "found"], HttpStatus.SC_OK, null], [null, HttpStatus.SC_NOT_FOUND, "not found"]]
        expected << [
                [status: HttpStatus.SC_BAD_REQUEST, text: "Invalid request"],
                [status: HttpStatus.SC_OK, json: [order: "found"]],
                [status: HttpStatus.SC_NOT_FOUND, text: "not found"],
        ]

    }

    @Unroll
    void "test findMyOrders"() {
        given:
        request.JSON = [email: email]

        and:
        def apiUtil = new MockFor(ApiUtil)
        apiUtil.demand.post(apiCall) { args ->
            assert args.path == "viewOrder/enqueueOrderHistory"
            assert args.json == request.JSON
            assert args.includeStatus == true
            true
        }

        when:
        apiUtil.use {
            controller.findMyOrders()
        }

        then:
        response.status == expectedStatus
        response.text == expectedText

        where:
        email << ["valid@email.com", null]
        apiCall << [1, 0]
        expectedStatus << [HttpStatus.SC_OK, HttpStatus.SC_BAD_REQUEST]
        expectedText << ["success", "Invalid request"]
    }
}