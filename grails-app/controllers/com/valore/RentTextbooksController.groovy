package com.valore

import com.valore.util.ApiUtil
import grails.util.Environment
import org.apache.http.HttpStatus

class RentTextbooksController {

    def index() {
        if (Environment.current == Environment.PRODUCTION) {
            redirect(url: "/")
        } else {
            def(json, status) = ApiUtil.get(path: 'product/listPopularRentalProducts', includeStatus: true)
            render(view: '/rentTextbooks/index', model: [popularRentalProducts: json])
        }
    }
}
