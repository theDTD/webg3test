package com.valore

import com.valore.util.ProductImageUrlUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import spock.lang.Specification

@TestFor(ProductTagLib)
class ProductTagLibSpec extends Specification {
    def actual

    def setup() {
    }

    def cleanup() {
    }

    void "test productLink"() {
        when:
        def body = {
            "Awesome Book Title Link"
        }
        def actual = tagLib.productLink(attrs, body)

        then:
        actual == expected

        where:
        attrs << [[:], [title: 'Awesome Book', edition: null, isbn: '1234'], [title: 'Awesome Book', edition: '9', isbn: '1234']]
        expected << ['<a href="/textbooks/unknown-title/null" >Awesome Book Title Link</a>',
                     '<a href="/textbooks/awesome-book/1234" >Awesome Book Title Link</a>',
                     '<a href="/textbooks/awesome-book-9th-edition/1234" >Awesome Book Title Link</a>']
    }

    void "test productImage"() {
        given:
        def productImageUrlUtil = new MockFor(ProductImageUrlUtil.class)

        and:
        productImageUrlUtil.demand.with {
            getProductImageUrl(1) { def productCode, def productCodeType, def hasImage, def size, def secure ->
                "$productCode $productCodeType $hasImage $size $secure"
            }
        }

        when:
        productImageUrlUtil.use {
            actual = tagLib.productImage(attrs)
        }

        then:
        actual == expected

        where:
        attrs << [[:], [hasImage: true, secure: true, productCode: 9780321558237, productCodeType: "ISBN", size: "large"]]
        expected << ['<img src="  false MEDIUM false" >', '<img src="9780321558237 ISBN true LARGE true" >']
    }

    void "test appendOrdinal"() {
        expect:
        tagLib.appendOrdinal(number: "nan") == "nan"
        tagLib.appendOrdinal(number: "110") == "110th"
        tagLib.appendOrdinal(number: "1") == "1st"
        tagLib.appendOrdinal(number: "2") == "2nd"
        tagLib.appendOrdinal(number: "3") == "3rd"
        tagLib.appendOrdinal(number: "4") == "4th"
        tagLib.appendOrdinal(number: "1.0") == "1.0"
        tagLib.appendOrdinal(number: "9789872266462") == "9789872266462nd"
    }

    void "test author"() {
        expect:
        !tagLib.author()
        !tagLib.author(attributes: [[type: 1]])
        tagLib.author(attributes: [[type: 4, value: "Benjamin|,Franklin"]]) == "by Benjamin Franklin"
    }
}
