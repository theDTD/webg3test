package com.valore

import com.valore.util.ApiUtil
import grails.converters.JSON
import grails.util.Environment
import org.apache.http.HttpStatus

class ViewOrderController {

    def index() {
        render(view: '/viewOrder/index')
    }

    def searchOrder() {
        if (!request.JSON["id"] || !request.JSON["orderInfo"]) {
            render status: HttpStatus.SC_BAD_REQUEST, text: "Invalid request"
            return
        }

        def (json, status, text) = ApiUtil.post(path: "viewOrder/validateTrackingInfo", json: request.JSON, includeStatus: true)
        if (status != HttpStatus.SC_OK){
            render status: status, text: text
            return
        }

        render json as JSON
    }

    def findMyOrders() {
        if (!request.JSON["email"]) {
            render status: HttpStatus.SC_BAD_REQUEST, text: "Invalid request"
            return
        }

        ApiUtil.post(path: "viewOrder/enqueueOrderHistory", json: request.JSON, includeStatus: true)
        render status: HttpStatus.SC_OK, text: "success"
    }
}