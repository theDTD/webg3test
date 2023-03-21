package com.valore.mobile

import grails.converters.JSON
import grails.test.mixin.TestFor
import org.apache.http.HttpStatus
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(AuthController)
class AuthControllerSpec extends Specification {

    def username
    def password
    def authService

    def setup() {
        authService = Mock(AuthService)
        username = 'Jhon Doe'
        password = 'jhonDoePass'
    }

    def cleanup() {
    }

    void "test login successful"() {
        given:
        def res = [sellerId: 99652, token: 'eyJhbGciOiJIUzI1NiJ9']
        request.JSON.username = username
        request.JSON.password = password
        controller.authService = authService
        controller.authService.login(username, password) >> res

        when:
        controller.login()

        then:
        response.status == HttpStatus.SC_OK
        response.text == '{"sellerId":99652,"token":"eyJhbGciOiJIUzI1NiJ9"}'

    }

    void "test login fail"() {
        given:
        request.JSON.username = username
        request.JSON.password = password
        controller.authService = authService
        controller.authService.login(username, password) >> false

        when:
        controller.login()

        then:
        response.status == HttpStatus.SC_UNAUTHORIZED
        response.text == "Unauthorized action"

    }

    void "test login with no username"() {
        given:
        request.JSON.username = null
        request.JSON.password = password
        controller.authService = authService

        when:
        controller.login()

        then:
        response.status == HttpStatus.SC_UNAUTHORIZED
        response.text == "Unauthorized action"

    }

    void "test login with no password"() {
        given:
        request.JSON.username = 'JhonDoe'
        request.JSON.password = null
        controller.authService = authService

        when:
        controller.login()

        then:
        response.status == HttpStatus.SC_UNAUTHORIZED
        response.text == "Unauthorized action"

    }
}
