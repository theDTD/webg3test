package com.valore

import com.valore.codec.AES128Codec
import com.valore.util.ApiUtil
import com.valore.util.MiscUtil
import grails.core.GrailsApplication
import org.apache.http.HttpStatus

import java.text.SimpleDateFormat

class CardUpdateController {
    GrailsApplication grailsApplication

    def cardUpdateService

    def index() {
        Long saleTransactionId = params.long('id')
        def emailAddress = params.email
        try {
            emailAddress = AES128Codec.decode(params.email.replaceAll(' ','+'))
        } catch (Exception e) {
            log.error("Could not decrypt email address: ${params.email}", e)
        }

        if (!saleTransactionId || !emailAddress) {
            redirect url: "${grailsApplication.config.valore.legacyUrl}"
            return
        }

        def transaction = ApiUtil.get(path: 'saleTransaction', id: saleTransactionId, query: [deep: true])

        if (transaction?.emailAddress != emailAddress) {
            redirect url: "${grailsApplication.config.valore.legacyUrl}"
            return
        }

        Boolean isForExtension = params.isForExtension
        Date cutoffDate = isForExtension ? cardUpdateService.getCutoffExpirationDateForExtension(transaction) : null

        render view:'/card-update/index',
               model: [vantivOrderId: MiscUtil.randomId,
                       vantivReportGroup: "Post-Rental CC Update",
                       litleOnlineJs: "$grailsApplication.config.valore.litleOnline.jsUrl",
                       litleOnlineJsAPI: "$grailsApplication.config.valore.litleOnline.jsLitleApiUrl",
                       saleTransactionId: "${saleTransactionId}",
                       orderSummaryHref: "${grailsApplication.config.valore.legacyUrl}/" +
                                         "CustomerService.OrderTracking.InfoEntry_TrackOrder.do_rewrite?" +
                                         "OrderNumber=${saleTransactionId}&" +
                                         "OrderInfo=${params.email}&" + //need to use param.email because it still encrypted
                                         "OrderType=1",
                       cutoffDate: cutoffDate ? new SimpleDateFormat('MM/dd/yyyy').format(cutoffDate): null
               ]
    }

    def submit() {
        def requestJson = request.JSON
        def saleTransactionId = requestJson['saleTransactionId']
        if(!saleTransactionId) {
            render status: HttpStatus.SC_BAD_REQUEST
            return
        }

        def registrationId = requestJson['registrationId']
        if(!registrationId) {
            render status: HttpStatus.SC_BAD_REQUEST
            return
        }

        def jsonAddress = requestJson['defaultBilling']
        if(!jsonAddress) {
            render status: HttpStatus.SC_BAD_REQUEST
            return
        }

        def addressFields = ['firstName', 'lastName', 'line1', 'line2', 'city', 'state', 'postalCode', 'country']
        def billingAddress = [:]
        for(String field : addressFields) {
            if(field != 'line2' && !jsonAddress[field]) {
                render status: HttpStatus.SC_BAD_REQUEST
                return
            }
            billingAddress[field] = jsonAddress[field]
        }

        def json = [registrationId: registrationId, billingAddress: billingAddress]

        try {
            json.expDate = "${requestJson['expMonth'].padLeft(2, '0')}${requestJson['expYear'][-2..-1]}"
        } finally {
            def (respJson, respStatus, respText) = ApiUtil.post(path: 'SaleTransaction/updateToken', id: saleTransactionId,
                    json: json, includeStatus: true)
            render status: respStatus
        }
    }
}
