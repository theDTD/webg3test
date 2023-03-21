package com.valore

import grails.util.Environment

class ErrorController {

    def notFound() {
        legacyError()
    }

    def internalError() {
        log.error 'INTERNAL ERROR', request.exception.cause
        if (Environment.current != Environment.PRODUCTION) {
            render view: '/error', model: [exception: request.exception]
        } else {
            legacyError()
        }
    }

    def legacyError() {
        redirect uri: '/error', base: grailsApplication.config.valore.legacyUrl
    }
}
