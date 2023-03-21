package com.valore.mobile

import grails.converters.JSON
import org.apache.http.HttpStatus

class AuthController {

    def authService

    def login() {

        def username = request.JSON.username
        def password = request.JSON.password

        def response = authService.login(username, password)

        if(!response){
            return render(status: HttpStatus.SC_UNAUTHORIZED, text: "Unauthorized action")
        }

        render(response as JSON)
    }
}
