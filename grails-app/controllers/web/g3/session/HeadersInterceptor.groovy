package web.g3.session


class HeadersInterceptor {

    HeadersInterceptor() {
        matchAll()
    }

    boolean before() { true }

    boolean after() {
        response.addHeader('x-valore-server', "${request.serverName.hashCode()}")
        true
    }

    void afterView() {
        // no-op
    }
}
