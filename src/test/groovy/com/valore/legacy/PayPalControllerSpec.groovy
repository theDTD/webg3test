package com.valore.legacy

import grails.test.mixin.TestFor
import org.apache.http.HttpStatus
import spock.lang.Specification

@TestFor(PayPalController)
class PayPalControllerSpec extends Specification {


    def payPalServiceMock = Mock(PaypalService)

    def setup() {
        controller.paypalService = payPalServiceMock
    }

    def cleanup() {}

    void "test - auth - no code param"() {
        when:
        controller.auth()

        then:
        response.status == HttpStatus.SC_MOVED_TEMPORARILY
        response.redirectedUrl.contains("/SellBack.ShipmentOptions.do?paymentOption=2&errorPaypal=true")
    }

    void "test - auth - no PayPal Access Token"() {
        given:
        def code = 12345
        def tokenType = type
        def accessToken = token
        params.code = code

        when:
        controller.auth()

        then:
        1 * payPalServiceMock.getPayPalAccessToken(code) >> [tokenType, accessToken]

        response.status == HttpStatus.SC_MOVED_TEMPORARILY
        response.redirectedUrl.contains("/SellBack.ShipmentOptions.do?paymentOption=2&errorPaypal=true")

        where:
        type << [null, "A"]
        token << ["123456", null]
    }

    void "test - auth - no PayPal User Data"() {
        given:
        def code = 12345
        def tokenType = "Bearer"
        def accessToken = "123456"
        params.code = code

        when:
        controller.auth()

        then:
        1 * payPalServiceMock.getPayPalAccessToken(code) >> [tokenType, accessToken]
        1 * payPalServiceMock.getPayPalUserData(tokenType, accessToken, true) >> null

        response.status == HttpStatus.SC_MOVED_TEMPORARILY
        response.redirectedUrl.contains("/SellBack.ShipmentOptions.do?paymentOption=2&errorPaypal=true")
    }

    void "test - auth - success"() {
        given:
        def code = 12345
        def tokenType = "Bearer"
        def accessToken = "123456"
        def base64 = "SOME-BASE64-USER-INFO"
        params.code = code

        when:
        controller.auth()

        then:
        1 * payPalServiceMock.getPayPalAccessToken(code) >> [tokenType, accessToken]
        1 * payPalServiceMock.getPayPalUserData(tokenType, accessToken, true) >> base64

        response.status == HttpStatus.SC_MOVED_TEMPORARILY
        response.redirectedUrl.contains("/SellBack.ShipmentOptions.do?paymentOption=2&userInfo=${base64}")
    }
}
