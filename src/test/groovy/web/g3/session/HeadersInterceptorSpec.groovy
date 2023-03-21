package web.g3.session

import grails.test.mixin.TestFor
import spock.lang.Specification
/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(HeadersInterceptor)
class HeadersInterceptorSpec extends Specification {

    def setup() {
    }

    def cleanup() {

    }

    void "test headers after"() {
        when:
            withRequest(controller:"cart")
            interceptor.request.serverName = 'serverName'
            def result = interceptor.after()

        then:
            interceptor.doesMatch()
            interceptor.response.header('x-valore-server') == "${'serverName'.hashCode()}"
            result
    }
}
