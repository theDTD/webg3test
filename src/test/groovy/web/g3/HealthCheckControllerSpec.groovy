package web.g3

import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import grails.util.Holders
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(HealthCheckController)
class HealthCheckControllerSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test index - all endpoints OK"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        def expectedResponse = [null, HttpStatus.SC_OK, null]

        and:
        apiUtil.demand.with {
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.apiUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                expectedResponse
            }
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.sourceUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                expectedResponse
            }
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.buybackUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                expectedResponse
            }
        }

        when:
        apiUtil.use {
            controller.index()
        }

        then:
        response.status == HttpStatus.SC_OK
    }

    void "test index - failed endpoint"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        def expectedResponse = [null, HttpStatus.SC_OK, null]
        def failedResponse = [null, HttpStatus.SC_INTERNAL_SERVER_ERROR, null]

        and:
        apiUtil.demand.with {
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.apiUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                expectedResponse
            }
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.sourceUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                expectedResponse
            }
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.buybackUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                failedResponse
            }
        }

        when:
        apiUtil.use {
            controller.index()
        }

        then:
        response.status == HttpStatus.SC_INTERNAL_SERVER_ERROR
    }

    void "test exception"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        def expectedResponse = [null, HttpStatus.SC_OK, null]

        and:
        apiUtil.demand.with {
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.apiUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                expectedResponse
            }
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.sourceUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                expectedResponse
            }
            get(1) { args ->
                assert args.domain == Holders.grailsApplication.config.valore.buybackUrl
                assert args.path == 'healthCheck/index'
                assert args.includeStatus
                throw new URISyntaxException("input", "reason")
            }
        }

        when:
        apiUtil.use {
            controller.index()
        }

        then:
        response.status == HttpStatus.SC_INTERNAL_SERVER_ERROR
    }
}
