package com.valore.util

import grails.test.mixin.TestMixin
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestMixin(TagUtil)
class TagUtilSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "attribute to string"() {
        given:
        Map map = [hello: "world"]

        when:
        def result = attributeToString(map.entrySet().first())

        then:
        result == 'hello="world"'
    }

    void "attributes to string"() {
        given:
        Map map = [hello: "world", sun: "moon"]

        when:
        def result = attributesToString(map)

        then:
        result == 'hello="world" sun="moon" '
    }

    void "create image"() {
        given:
        Map map = [hello: "world", sun: "moon"]

        when:
        def result = createImage(map)

        then:
        result == '<img hello="world" sun="moon" >'
    }

    void "create link"() {
        given:
        Map map = [hello: "world", sun: "moon"]
        def body = "My body tells me no."

        when:
        def result = createLink(map, body)

        then:
        result == '<a hello="world" sun="moon" >' + body + '</a>'
    }
}