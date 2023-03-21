package com.valore.legacy

import com.valore.codec.AES128Codec
import grails.plugins.rest.client.RestBuilder
import grails.test.mixin.TestFor
import grails.util.Holders
import groovy.mock.interceptor.MockFor
import spock.lang.Specification
/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(PaypalService)
class PayPalServiceSpec extends Specification {

    def restBuilderMock

    def setup() {
        restBuilderMock = new MockFor(RestBuilder)

        Holders.grailsApplication.config.valore.paypalApi = "https://api.sandbox.paypal.com/v1"
        Holders.grailsApplication.config.valore.paypalAuthToken = "Basic 1inljkn230918hlajkshdlkjn1029u312="
    }

    def cleanup() {}

    def "test - getPayPalAccessToken - with no code"() {
        when:
        def result = service.getPayPalAccessToken(null)

        then:
        !result
    }

    def "test - getPayPalAccessToken - requesting paypal code return null"() {
        given:
        def result
        def code = "1234567890"

        PaypalService.metaClass.peformRequest = { args ->
            null
        }

        when:
        result = service.getPayPalAccessToken(code)

        then:
        !result

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(PaypalService)
    }

    def "test - getPayPalAccessToken - requesting paypal code"() {
        given:
        def result
        def code = "1234567890"
        def expectedResult = [statusCode: [value: 200], text: "text", json: [token_type: "1234", access_token: "123456"]]
        def serviceSpy = Spy(PaypalService)
        serviceSpy.grailsApplication = Holders.grailsApplication
        serviceSpy.transactionManager = transactionManager

        when:
        result = serviceSpy.getPayPalAccessToken(code)

        then:
        1 * serviceSpy.invokeMethod('peformRequest', _) >> { String name, def argsList ->
            assert argsList.size() > 0
            def args = argsList[0]
            assert args.method == "post"
            assert args.path == "https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice"
            assert args.query == [grant_type: "authorization_code", code: "1234567890"]
            assert args.headers == [Authorization: "Basic 1inljkn230918hlajkshdlkjn1029u312=", "Content-Type": "application/x-www-form-urlencoded"]
            expectedResult
        }
        result == [expectedResult.json.token_type, expectedResult.json.access_token]
    }

    def "test - getPayPalUserData - with no tokenType or access token"() {
        given:
        def tokenType = type
        def accessToken = token

        when:
        def result = service.getPayPalUserData(tokenType, accessToken)

        then:
        !result

        where:
        type  << [null, "1234"]
        token << ["1234", null]
    }

    def "test - getPayPalUserData - requesting paypal user info return null"() {
        given:
        def result
        def tokenType = "Bearer"
        def accessToken = "123455678910"

        PaypalService.metaClass.peformRequest = { args ->
            null
        }

        when:
        result = service.getPayPalUserData(tokenType, accessToken)

        then:
        !result

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(PaypalService)
    }

    def "test - getPayPalUserData - requesting paypal user info"() {
        given:
        def result
        def tokenType = "Bearer"
        def accessToken = "123455678910"
        def expectedResult = [statusCode: [value: 200], text: "TEXT"]
        def serviceSpy = Spy(PaypalService)
        serviceSpy.grailsApplication = Holders.grailsApplication
        serviceSpy.transactionManager = transactionManager

        AES128Codec.encode = { value -> value * 2 }

        when:
        result = serviceSpy.getPayPalUserData(tokenType, accessToken, base64)

        then:
        1 * serviceSpy.invokeMethod('peformRequest', _) >> { String name, def argsList ->
            assert argsList.size() > 0
            def args = argsList[0]
            assert args.method == "get"
            assert args.path == "https://api.sandbox.paypal.com/v1/oauth2/token/userinfo"
            assert args.query == [schema: "openid"]
            assert args.headers == [Authorization: "Bearer 123455678910", "Content-Type": "application/json"]

            expectedResult
        }
        result == expectedBase64

        where:
        base64 << [true, false]
        expectedBase64 << ["VEVYVFRFWFQ=", "TEXTTEXT"]
    }

}