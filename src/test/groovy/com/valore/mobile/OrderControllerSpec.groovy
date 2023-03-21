package com.valore.mobile

import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification

@TestFor(OrderController)
class OrderControllerSpec extends Specification {

    def apiUtilMock

    def setup() {
        apiUtilMock = new MockFor(ApiUtil)
    }

    def cleanup() {
    }

    void "test addItem - order not created"() {
        given:
        params.id = '1'

        and:
        apiUtilMock.demand.with {
            post(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'buybackTransaction/createOrAddToDailyOpenOrder'
                null
            }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test addItem"() {
        given:
        params.id = '1'
        def orderResponse = [estimatedItemAmount: 1234]
        request.JSON.price = 1234
        request.JSON.email = "test@valore.com"
        request.JSON.isbn = 9781118771334
        request.JSON.paymentType = "Check"

        and:
        apiUtilMock.demand.with {
            post(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'buybackTransaction/createOrAddToDailyOpenOrder'
                assert args['json'].price == 1234
                assert args['json'].email == "test@valore.com"
                assert args['json'].isbn == 9781118771334
                assert args['json'].paymentType == 'Check'
                orderResponse
            }
        }

        when:
        apiUtilMock.use {
            controller.addItem()
        }

        then:
        response.status == HttpStatus.SC_OK
        def json = response.json
        json.amount == orderResponse.estimatedItemAmount / 100
    }
}