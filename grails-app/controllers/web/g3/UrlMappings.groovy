package web.g3

import grails.util.Environment

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/buy-textbooks" controller: "BuyTextbooks", action: "index"
        "/BuyTextbooks" redirect: "/buy-textbooks"
        "/rent-textbooks" controller: "RentTextbooks", action: "index"
        "/extra-mile-guarantee" controller: "ExtraMileGuarantee", action: "index"

        "/" redirect: [uri:'/', base: "https://${Environment.current == Environment.PRODUCTION ? 'www' : 'uat'}.valorebooks.com"]

        "404" controller: 'error', action: 'notFound'
        "500" controller: 'error', action: 'internalError'
    }
}
