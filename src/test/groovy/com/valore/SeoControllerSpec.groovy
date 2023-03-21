package com.valore

import com.valore.util.ISBNUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification
import spock.lang.Unroll

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(SeoController)
class SeoControllerSpec extends Specification {

    def seoService
    def isbnUtil

    def setup() {
        seoService = Mock(SeoService)
        controller.seoService = seoService
        isbnUtil = new MockFor(ISBNUtil)
    }

    def cleanup() {
    }

    @Unroll
    void "test index"() {
        given:
        params.isbn = isbn

        and:
        isbnUtil.demand.validateISBN(1) { def arg ->
            assert arg == isbn
            validIsbn
        }

        when:
        isbnUtil.use {
            controller.index()
        }

        then:
        dbCall * controller.seoService.dbData(isbn) >> dbResponse

        response.status == expectedStatus

        where:
        isbn << ["123", "inv", "123"]
        validIsbn << [true, false, true]
        dbCall << [1, 0, 1]
        dbResponse << [[ok:1], null, null]
        expectedStatus << [HttpStatus.SC_OK, HttpStatus.SC_BAD_REQUEST, HttpStatus.SC_NOT_FOUND]
    }


    @Unroll
    void "test edit"() {
        given:
        params.isbn = isbn

        and:
        isbnUtil.demand.validateISBN(1) { def arg ->
            assert arg == isbn
            validIsbn
        }

        when:
        isbnUtil.use {
            controller.edit()
        }

        then:
        dbCall * controller.seoService.dbData(isbn) >> dbResponse

        response.status == expectedStatus

        where:
        isbn << ["123", "inv", "123"]
        validIsbn << [true, false, true]
        dbCall << [1, 0, 1]
        dbResponse << [[ok:1], null, null]
        expectedStatus << [HttpStatus.SC_OK, HttpStatus.SC_BAD_REQUEST, HttpStatus.SC_NOT_FOUND]
    }

    @Unroll
    void "test save"() {
        given:
        request.JSON = json

        when:
        controller.save()

        then:
        response.status == expectedStatus

        where:
        json << [[ok: 1], [:]]
        expectedStatus << [HttpStatus.SC_OK, HttpStatus.SC_BAD_REQUEST]
    }
}
