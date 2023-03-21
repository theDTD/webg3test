package com.valore.mobile

import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(AuthService)
class AuthServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test login"() {
        given:
        def username = 'JhonDoe'
        def password = 'jhondoepass'
        def expected = '{"sellerId":99652,"token":"eyJhbGciOiJIUzI1NiJ9"}'
        def res      = [expected, 200]
        def path     = 'auth/login'
        def json = [username: username, password: password]

        and:
        def apiUtil = new MockFor(ApiUtil)

        apiUtil.demand.with {
            post(1) { args ->
                assert args.path == path
                assert args.json == json
                res
            }
        }

        when:
        def result

        apiUtil.use {
            result = service.login(username, password)
        }

        then:
        result == expected
    }

    void "test login with wrong credentials"() {
        given:
        def username = 'JhonDoe'
        def password = 'wrong'
        def expected = null
        def res      = [expected, 401]
        def json = [username: username, password: password]

        and:
        def apiUtil = new MockFor(ApiUtil)

        apiUtil.demand.with {
            post(1) { args ->
                assert args.json == json
                res
            }
        }

        when:
        def result

        apiUtil.use {
            result = service.login(username, password)
        }

        then:
        result == expected
    }

    void "test login with no API response"() {
        given:
        def username = 'JhonDoe'
        def password = 'wrong'
        def json = [username: username, password: password]

        and:
        def apiUtil = new MockFor(ApiUtil)

        apiUtil.demand.with {
            post(1) { args ->
                assert args.json == json
                null
            }
        }

        when:
        def result

        apiUtil.use {
            result = service.login(username, password)
        }

        then:
        result == null
    }

    void "test login with with no username"() {
        when:
        def result = service.login(null, 'pass')

        then:
        result == null
    }

    void "test login with with no password"() {
        when:
        def result = service.login('jhonDoe', null)

        then:
        result == null
    }

    void "test checkSession"() {
        given:
        def token    = 'eyJhbGciOiJIUzI1NiJ9'
        def sellerId = '99652'
        def path     = 'auth/session'
        def res      = [_, 200]
        def json = [token: token, sellerId: sellerId]

        and:
        def apiUtil = new MockFor(ApiUtil)

        apiUtil.demand.with {
            post(1) { args ->
                assert args.path == path
                assert args.json == json
                res
            }
        }

        when:
        def result

        apiUtil.use {
            result = service.checkSession(token, sellerId)
        }

        then:
        result == true
    }

    void "test checkSession with wrong credentials"() {
        given:
        def token    = 'wrong'
        def sellerId = 'wrong'
        def path     = 'auth/session'
        def res      = [_, 401]
        def json = [token: token, sellerId: sellerId]

        and:
        def apiUtil = new MockFor(ApiUtil)

        apiUtil.demand.with {
            post(1) { args ->
                assert args.path == path
                assert args.json == json
                res
            }
        }

        when:
        def result

        apiUtil.use {
            result = service.checkSession(token, sellerId)
        }

        then:
        result == false
    }


    void "test cehckSession() with with no sellerId"() {
        when:
        def result = service.checkSession('eyJhbGciOiJIUzI1NiJ9', null)

        then:
        result == false
    }

    void "test cehckSession() with with no token"() {
        when:
        def result = service.checkSession(null, 99652)

        then:
        result == false
    }
}
