package com.valore

import grails.test.mixin.TestFor
import grails.util.Environment
import org.apache.http.HttpStatus
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(BuyTextbooksController)
class BuyTextbooksControllerSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test index"() {
        when:
        controller.index()

        then:
        controller.response.status == HttpStatus.SC_OK
    }

    void "test redirect on production"() {
        given:
        BuyTextbooksController buyTextbooksControllerSpy = Spy(BuyTextbooksController)

        Environment.metaClass.static.getCurrent = {
            Environment.PRODUCTION
        }

        when:
        buyTextbooksControllerSpy.index()

        then:
        response.redirectUrl == "/"

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)

    }
}
