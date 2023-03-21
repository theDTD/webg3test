package web.g3.mobile

import com.valore.mobile.AuthService
import grails.test.mixin.TestFor
import spock.lang.Specification
/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(AuthInterceptor)
class AuthInterceptorSpec extends Specification {

    def setup() {
        interceptor.authService = Mock(AuthService)
    }

    def cleanup() {

    }

    void "test auth interceptor not matching"() {
        when:"A request does not match the interceptor"
            withRequest(controller:"cart")

        then:"The interceptor does match"
            !interceptor.doesMatch()
    }

    void "test auth interceptor before, bad session variables"() {
        when:
            withRequest(controller: 'order')
            interceptor.request.addHeader('token', 'badtoken')
            interceptor.request.addHeader('sellerId', 2)
            boolean result = interceptor.before()

        then:
            interceptor.doesMatch()
            1 * interceptor.authService.checkSession('badtoken', '2') >> false
            !result
    }

    void "test auth interceptor before, good session variables"() {
        when:
        withRequest(controller: 'order')
        interceptor.request.addHeader('token', 'goodtoken')
        interceptor.request.addHeader('sellerId', 2)
        boolean result = interceptor.before()

        then:
        interceptor.doesMatch()
        1 * interceptor.authService.checkSession('goodtoken', '2') >> true
        result
    }
}
