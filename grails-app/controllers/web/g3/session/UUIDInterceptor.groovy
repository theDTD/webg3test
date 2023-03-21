package web.g3.session

import javax.servlet.http.Cookie


class UUIDInterceptor {

    UUIDInterceptor() {
        matchAll()
    }

    boolean before() {
        Cookie[] cookies = request.cookies

        def anon = false
        def user = false
        if (cookies != null)
            for (cookie in cookies) {
                if (cookie.name == grailsApplication.config.valore.cookie.anon_id) {
                    anon = true
                } else if (cookie.name == grailsApplication.config.valore.cookie.user_id) {
                    user = true
                }
            }

        if (!anon && !user) {
            String uuid = String.valueOf(uuidHash(UUID.randomUUID()))
            Cookie anonId = new Cookie(grailsApplication.config.valore.cookie.anon_id, uuid)
            anonId.path = "/"
            anonId.maxAge = Integer.MAX_VALUE
            response.addCookie anonId

            // ensures this is accessible, even in the originating request
            request.setAttribute(grailsApplication.config.valore.cookie.anon_id, uuid)
        }

        true
    }

    boolean after() { true }

    void afterView() {
        // no-op
    }

    static long uuidHash(UUID uuid) {
        long hash
        long mostSig = uuid.mostSignificantBits
        long leastSig = uuid.leastSignificantBits

        hash = (mostSig >> 32 ^ mostSig ^ leastSig >> 32 ^ leastSig) >> 32

        hash
    }
}
