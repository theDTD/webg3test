package com.valore

import grails.test.mixin.TestFor
import grails.util.Environment
import spock.lang.Specification

@TestFor(ErrorController)
class ErrorControllerSpec extends Specification {

    def setup() {
        grailsApplication.config.valore.legacyUrl = "http://valore.legacy"
    }

    def cleanup() {
    }

    void "test notFound"() {
        given:
        ErrorController errorSpy = Spy(ErrorController)

        when:
        errorSpy.notFound()

        then:
        1 * errorSpy.redirect([uri: "/error", base: "http://valore.legacy"])
    }

    void "test internalError - DEV"() {
        given:
        ErrorController errorSpy = Spy(ErrorController)

        Environment.metaClass.static.getCurrent = {
            Environment.DEVELOPMENT
        }

        request.exception = [cause: new Exception()]

        when:
        errorSpy.internalError()

        then:
        1 * errorSpy.render([view: '/error', model: [exception: request.exception]])

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)
    }

    void "test internalError - PROD"() {
        given:
        ErrorController errorSpy = Spy(ErrorController)

        Environment.metaClass.static.getCurrent = {
            Environment.PRODUCTION
        }

        request.exception = [cause: new Exception()]

        when:
        errorSpy.internalError()

        then:
        1 * errorSpy.redirect([uri: "/error", base: "http://valore.legacy"])

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)
    }
}
