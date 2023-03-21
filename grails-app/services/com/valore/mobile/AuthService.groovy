package com.valore.mobile

import com.valore.util.ApiUtil
import grails.transaction.Transactional
import org.apache.http.HttpStatus

@Transactional
class AuthService {

    def login(username, password) {

        if (!username || !password) {
            return
        }

        def response = peformApiRequest(url: 'auth/login', json: [username: username, password: password])

        if(!response)
            return

        if (response[1] == HttpStatus.SC_OK) {
            return response[0]
        }
    }

    Boolean checkSession(token, sellerId) {

        if (!token || !sellerId) {
            return false
        }

        def response = peformApiRequest(url: 'auth/session', json: [ token: token, sellerId: sellerId])

        if(!response)
            return false

        if (response[1] != HttpStatus.SC_OK) {
            return false
        }

        true
    }

    private peformApiRequest(def args) {

        def (url, json) = [args.url, args.json]

        ApiUtil.post(path: url, includeStatus: true, json: json)
    }
}
