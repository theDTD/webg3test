package web.g3

import grails.plugin.springsecurity.SecurityFilterPosition
import grails.plugin.springsecurity.SpringSecurityUtils

class BootStrap {

    def init = { servletContext ->
        log.info 'Adding SecurityHeaderFilter bean to Spring Security'
        SpringSecurityUtils.clientRegisterFilter('securityHeaderFilter', SecurityFilterPosition.OPENID_FILTER.order + 10)
    }
    def destroy = {
    }
}
