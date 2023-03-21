package com.valore

import grails.util.Environment

class BuyTextbooksController {

    def index() {
        if (Environment.current == Environment.PRODUCTION) {
            redirect(url: "/")
        } else render(view: '/buyTextbooks/index')
    }
}
