package com.valore.legacy

import com.valore.codec.AES128Codec
import grails.plugins.rest.client.RestBuilder
import grails.transaction.Transactional
import groovyx.net.http.URIBuilder

@Transactional
class PaypalService {

    def grailsApplication

    def getPayPalAccessToken(def code) {

        if(!code)
            return null

        def response = peformRequest(
                method: "post",
                path: "${grailsApplication.config.valore.paypalApi}/identity/openidconnect/tokenservice",
                query: [grant_type: "authorization_code", code: code],
                headers: [
                        "Authorization" : grailsApplication.config.valore.paypalAuthToken,
                        "Content-Type"  : "application/x-www-form-urlencoded"
                ]
        )

        if(!response)
            return null

        [response.json.token_type, response.json.access_token]
    }

    def getPayPalUserData(def tokenType, def accessToken, base64 = false) {

        if(!tokenType || !accessToken)
            return null

        def authHeader = "${tokenType} ${accessToken}"
        def response = peformRequest(
                method: "get",
                path: "${grailsApplication.config.valore.paypalApi}/oauth2/token/userinfo",
                query: [schema: "openid"],
                headers: [
                        "Authorization" : authHeader,
                        "Content-Type"  : "application/json"
                ]
        )

        if(!response)
            return null

        def encodedMessage = AES128Codec.encode(response.text)

        base64 ? encodedMessage.bytes.encodeBase64().toString() : encodedMessage
    }

    private def peformRequest(def args){
        def (method, path, query, headers) = [args.method, args.path, args.query, args.headers]

        RestBuilder rest = new RestBuilder()
        URIBuilder uri = new URIBuilder(path)

        if(query)
            uri.setQuery(query)

        def response = rest."$method"(uri.toURL().toString()){
            if(headers)
                headers.each { key, value -> header(key, value) }
        }

        if(response.statusCode.value() != 200){
            log.error("Paypal Request failure. Status: ${response.statusCode}, args: ${args}")
            return null
        }

        response
    }
}
