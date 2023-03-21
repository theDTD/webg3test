package com.valore.sale.rental

import com.amazonaws.services.sqs.model.SendMessageResult
import com.valore.util.ApiUtil
import com.valore.util.AwsUtil
import grails.core.GrailsApplication
import org.apache.http.HttpStatus

class PostRentalJob {
    private static final String AUTO_EXTEND = 'AUTO_EXTEND'

    GrailsApplication grailsApplication

    def execute(context) {
        def now = new Date()
        Map data = context.mergedJobDataMap
        def saleTransactionProductIds = Eval.me("${data['saleTransactionProductIds']}")
        String action = data['action']
        String recipientEmail = data['recipientEmail']
        log.trace("I was called with action: ${action} for ids: ${saleTransactionProductIds}")
        def successfulIds = []
        def failedIds = []
        def successExtensionAmount = 0
        saleTransactionProductIds.each { id ->
            def (json, statusCode, text) = ApiUtil.post(path: 'postRentalTransaction',
                    json: [saleTransactionProductId: id, action: action], includeStatus: true)

            if (statusCode == HttpStatus.SC_OK) {
                successfulIds.add(id)
                def itemAmount = json.itemAmount as Integer
                successExtensionAmount += itemAmount
            }
            else {
                /*
                   500 means unable to charge due to code exception
                   403 means unable to charge due to state
                   402 means unable to charge due to processor error
                   400 means unable to charge due to request data
                   Any other code that doesn't match these or the codes above would also fall here
                */
                log.error("Couldn't charge $action for saleTransactionProductId: $id, received $statusCode error.")
                log.debug("API text: $text")
                if (statusCode != HttpStatus.SC_BAD_REQUEST && statusCode != HttpStatus.SC_FORBIDDEN) {
                    failedIds.add(id)
                }
            }
        }

        String queueUrl = "$grailsApplication.config.valore.sqs.rental.extension.queue"
        String amountAttr = "extensionAmount"
        if (action != AUTO_EXTEND) {
            queueUrl = "$grailsApplication.config.valore.sqs.rental.buyout.queue"
            amountAttr = "buyoutAmount"
        }

        if (successfulIds) {
            sqsLogAndSendMessage(queueUrl,
                    "$action Success Message",
                    [emailAddress : recipientEmail, ids: "$successfulIds", success: 'true', action: action, auto: 'true',
                     (amountAttr): "$successExtensionAmount"])
        }
        if (failedIds) {
            sqsLogAndSendMessage(queueUrl,
                    "$action Failure Message",
                    [emailAddress: recipientEmail, ids: "$failedIds", success: 'false', action: action, auto: 'true'])
        }
        log.debug("$PostRentalJob.simpleName took ${new Date().time - now.time} ms.")
    }

    private SendMessageResult sqsLogAndSendMessage(String queueUrl,
                                                   String message,
                                                   Map<String, String> attributes = [:]) {
        log.trace "PostRentalJob: queueing SQS message with following parameters:"
        log.trace "queueUrl: $queueUrl"
        log.trace "message: $message"
        log.trace "attributes: $attributes"
        return AwsUtil.sqsSendMessage(queueUrl, message, attributes)
    }
}
