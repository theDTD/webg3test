package web.g3.mobile

import org.springframework.http.HttpStatus


class AuthInterceptor {

    def authService

    AuthInterceptor() {
        match(controller: 'order')
    }

    boolean before() {
        checkSession(request, response)
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }

    private boolean checkSession(request, response) {
        def token    = request.getHeader('token')
        def sellerId = request.getHeader('sellerId')

        if(!authService.checkSession(token, sellerId)){
            response.setStatus HttpStatus.UNAUTHORIZED.value()
            return false
        }

        true
    }
}
