package com.valore

import grails.plugin.cookie.CookieService
import javax.servlet.http.Cookie


public class EncryptedCookieService extends CookieService{

    @Override
    String getCookie(String name) {
        assert name
        String cookieValue = findCookie(name)?.value
        if(!cookieValue)
            return null
        return cookieValue?.decodeAES128()
    }

    @Override
    Cookie setCookie(String name, String value, Integer maxAge = null, String path = null, String domain = null, Boolean secure = null, Boolean httpOnly = null) {
        if (!value)
            return null

        return super.setCookie(name, value?.encodeAsAES128(), maxAge, path, domain, secure, httpOnly)
    }
}
