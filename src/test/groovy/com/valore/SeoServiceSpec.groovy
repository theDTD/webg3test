package com.valore

import com.valore.util.ApiUtil
import com.valore.util.ProductUrlUtil
import grails.test.mixin.TestFor
import grails.util.Holders
import groovy.mock.interceptor.MockFor
import spock.lang.Specification
import spock.lang.Unroll

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(SeoService)
class SeoServiceSpec extends Specification {

    def apiUtil
    def productUrlUtil
    def serviceSpy

    def setup() {
        Holders.grailsApplication.config.valore.legacyUrl = "localhost/"

        apiUtil = new MockFor(ApiUtil)
        productUrlUtil = new MockFor(ProductUrlUtil)
        serviceSpy = Spy(SeoService)
        serviceSpy.transactionManager = transactionManager
        serviceSpy.grailsApplication = Holders.grailsApplication
    }

    def cleanup() {
    }

    void "test dbData - ok"() {
        given:
        String isbn = "123"

        and:
        Map apiResult = [
                id: 1,
                name: "name",
                author: "me",
                edition: "1",
                image: "img.url",
                productCode: isbn,
                description: "desc"
        ]

        and:
        Map bestResult = [price: 1, quantity: 1, type: "Rent"]

        and:
        apiUtil.demand.get(1) { def args ->
            assert args.path == "productDetails"
            assert args.id == isbn
            apiResult
        }

        and:
        productUrlUtil.demand.generateURL(1) { String name, String edition, String productCode ->
            assert name == apiResult.name
            assert edition == apiResult.edition
            assert productCode == apiResult.productCode
            isbn
        }

        and:
        String expectedTitle = "${apiResult.name} 1st Edition | Rent 123"
        String expectedProductUrl = "localhost/${isbn}"

        when:
        Map result
        apiUtil.use {
            productUrlUtil.use {
                result = serviceSpy.dbData(isbn)
            }
        }

        then:
        1 * serviceSpy.bestListing(isbn) >> bestResult

        result.title == expectedTitle
        result.description == apiResult.description
        result.product == apiResult << [price: bestResult.price,
                                      quantity: bestResult.quantity,
                                      type: bestResult.type,
                                      url: expectedProductUrl]
        result.meta == [
                [property: "og:image", content: apiResult.image],
                [property: "og:title", content: expectedTitle],
                [property: "og:description", content: apiResult.description],
                [property: "og:type", content: "Book"],
                [property: "og:url", content: expectedProductUrl]
        ]
    }

    void "test dbData - no result"() {
        given:
        String isbn = "123"
        apiUtil.demand.get(1) { def args ->
            assert args.path == "productDetails"
            assert args.id == isbn
            null
        }

        when:
        Map result
        apiUtil.use {
            result = serviceSpy.dbData(isbn)
        }

        then:
        result == [:]
    }

    @Unroll
    void "test bestListing" () {
        given:
        String isbn = "123"
        apiUtil.demand.get(1) { def args ->
            assert args.path == "saleListing/best"
            assert args.id == isbn
            apiResult
        }

        when:
        Map result
        apiUtil.use { result = serviceSpy.bestListing(isbn) }

        then:
        result == [price: expectedPrice, quantity: expectedQuantity, type: expectedType]

        where:
        apiResult << [[new: [totalQuantity: 2, best: [type: "new",price: [sale: 123]]]], null]
        expectedPrice << [123, 0]
        expectedQuantity << [2, 0]
        expectedType << ['new', 'rental']
    }

    @Unroll
    void "test appendOrdinal"() {
        when:
        String result = serviceSpy.appendOrdinal(val)

        then:
        result == expected

        where:
        val << ["1", "2", "3", "4", "11", "22", "5.3"]
        expected << ["1st", "2nd", "3rd", "4th", "11th", "22nd", "5.3"]
    }

}
