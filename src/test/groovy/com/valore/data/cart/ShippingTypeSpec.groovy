package com.valore.data.cart

import spock.lang.Specification

class ShippingTypeSpec extends Specification {
    static List<ShippingType> shippingTypes = ShippingType.values()
    ShippingType actual

    def setup() {
    }

    def cleanup() {
    }

    def "test getShippingType (exact match)"() {
        when:
        actual = ShippingType.getShippingType(expected.name)

        then:
        actual == expected

        where:
        expected << shippingTypes
    }

    def "test getShippingType (all lowercase)"() {
        when:
        actual = ShippingType.getShippingType(expected.name.toLowerCase())

        then:
        actual == expected

        where:
        expected << shippingTypes
    }

    def "test getShippingType (all uppercase)"() {
        when:
        actual = ShippingType.getShippingType(expected.name.toUpperCase())

        then:
        actual == expected

        where:
        expected << shippingTypes
    }

    def "test getShippingType (no matches)"() {
        when:
        actual = ShippingType.getShippingType("Not" + expected.name)

        then:
        actual == null

        where:
        expected << shippingTypes
    }
}
