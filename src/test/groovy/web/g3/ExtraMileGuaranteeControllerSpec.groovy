package web.g3

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(ExtraMileGuaranteeController)
class ExtraMileGuaranteeControllerSpec extends Specification {

    def setup() {
    }

    void "test index"() {
        when:
        controller.index()

        then:
        view == '/extraMileGuarantee/index'
    }
}
