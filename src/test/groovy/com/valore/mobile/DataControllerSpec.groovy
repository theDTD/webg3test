package com.valore.mobile

import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification

@TestFor(DataController)
class DataControllerSpec extends Specification {

    def apiUtilMock

    def setup() {
        apiUtilMock = new MockFor(ApiUtil)
    }

    def cleanup() {
    }

    void "test product - no product details received from API"() {
        given:
        params.id = '9781234567890'

        and:
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                null
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'buybackListing/best'
                [price: 1000]
            }
        }

        when:
        apiUtilMock.use {
            controller.product()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test product - no price received from API"() {
        given:
        params.id = '9781234567890'

        and:
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                [name: 'Test Book', image: 'http://img.valorebooks.com/blah.jpg', author: ['Test Author'],
                 productCode: '9781234567890', isbn10: '0123456789']
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'buybackListing/best'
                null
            }
        }

        when:
        apiUtilMock.use {
            controller.product()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test product - best price for listing is 0"() {
        given:
        params.id = '9781234567890'

        and:
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                [name: 'Test Book', image: 'http://img.valorebooks.com/blah.jpg', author: ['Test Author'],
                 productCode: '9781234567890', isbn10: '0123456789']
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'buybackListing/best'
                [price: 0]
            }
        }

        when:
        apiUtilMock.use {
            controller.product()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test product details - with authors"() {
        given:
        params.id = '9781234567890'
        def authors = ['Test Author1', 'Test Author2']
        def pdResponse = [name: 'Test Book', image: 'http://img.valorebooks.com/blah.jpg', author: authors,
                          productCode: '9781234567890', isbn10: '0123456789', dummy: 'lol']

        and:
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                pdResponse
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'buybackListing/best'
                [price: 1000]
            }
        }

        when:
        apiUtilMock.use {
            controller.product()
        }

        then:
        response.status == HttpStatus.SC_OK
        def json = response.json
        json.name == pdResponse.name
        json.image == pdResponse.image
        json.author == ("by " + authors.join(', ').replace('"', ''))
        json.productCode == pdResponse.productCode
        json.isbn10 == pdResponse.isbn10
        json.price == 10.0
        !json.dummy
    }

    void "test product details - without authors"() {
        given:
        params.id = '9781234567890'
        def pdResponse = [name: 'Test Book', image: 'http://img.valorebooks.com/blah.jpg', author: [],
                          productCode: '9781234567890', isbn10: '0123456789', dummy: 'lol']

        and:
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'productDetails'
                pdResponse
            }
            get(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'buybackListing/best'
                [price: 1000]
            }
        }

        when:
        apiUtilMock.use {
            controller.product()
        }

        then:
        response.status == HttpStatus.SC_OK
        def json = response.json
        json.name == pdResponse.name
        json.image == pdResponse.image
        json.author == ''
        json.productCode == pdResponse.productCode
        json.isbn10 == pdResponse.isbn10
        json.price == 10.0
        !json.dummy
    }
}
