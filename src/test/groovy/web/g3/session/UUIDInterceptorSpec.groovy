package web.g3.session

import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import spock.lang.Specification

import javax.servlet.http.Cookie

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(UUIDInterceptor)
class UUIDInterceptorSpec extends Specification {

    def setup() {
        interceptor.grailsApplication.config.valore.cookie.anon_id = 'anon_id'
        interceptor.grailsApplication.config.valore.cookie.user_id = 'user_id'
    }

    def cleanup() {

    }

    void "test before no cookies"() {
        when:
            withRequest(controller:"cart")
            interceptor.request.cookies = null
            def uuid = new UUID(123, 123)
            def uuidMock = new MockFor(UUID)
            uuidMock.demand.with {
                randomUUID(1) { ->
                    uuid
                }
                getMostSignificantBits(1) { ->
                    123
                }
                getLeastSignificantBits(1) { ->
                    123
                }
            }
            def result = false
            uuidMock.use {
                result = interceptor.before()
            }

        then:
            Cookie cookie = interceptor.response.getCookie('anon_id')
            cookie
            cookie.value == String.valueOf(UUIDInterceptor.uuidHash(uuid))
            cookie.path == '/'
            cookie.maxAge == Integer.MAX_VALUE
            interceptor.request.getAttribute('anon_id') == String.valueOf(UUIDInterceptor.uuidHash(uuid))
            result
    }

    void "test before with anon_id cookie"() {
        when:
        withRequest(controller:"cart")
        interceptor.request.cookies = [new Cookie('anon_id', '12321')]
        def uuidMock = new MockFor(UUID)
        uuidMock.demand.with {
            randomUUID(0)
            getMostSignificantBits(0)
            getLeastSignificantBits(0)
        }
        def result = false
        uuidMock.use {
            result = interceptor.before()
        }

        then:
        result
    }

    void "test before with user_id cookie"() {
        when:
        withRequest(controller:"cart")
        interceptor.request.cookies = [new Cookie('user_id', '12321')]
        def uuidMock = new MockFor(UUID)
        uuidMock.demand.with {
            randomUUID(0)
            getMostSignificantBits(0)
            getLeastSignificantBits(0)
        }
        def result = false
        uuidMock.use {
            result = interceptor.before()
        }

        then:
        result
    }
}
