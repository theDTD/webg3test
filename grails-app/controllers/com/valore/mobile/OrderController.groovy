package com.valore.mobile

import com.valore.data.buyback.BuybackTransactionSource
import com.valore.util.ApiUtil
import grails.converters.JSON
import org.apache.http.HttpStatus

class OrderController {

    def addItem() {

        def json = request.JSON
        def price = json.price
        def email = json.email
        def paymentType = json.paymentType
        def source = BuybackTransactionSource.MOBILE_B2B.name // get from json.source when customer app start using this endpoint
        def isbn = json.isbn

        def orderDetails = ApiUtil.post(path: 'buybackTransaction/createOrAddToDailyOpenOrder',
                                        id: params.id,
                                        json: [price: price, email: email, paymentType: paymentType, isbn: isbn, source: source])

        if(!orderDetails) {
            render status: HttpStatus.SC_BAD_REQUEST
            return
        }

        render([amount: orderDetails.estimatedItemAmount / 100] as JSON)
    }
}
