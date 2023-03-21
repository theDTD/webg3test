package com.valore.sale.rental

import com.valore.util.ApiUtil
import com.valore.util.AwsUtil
import grails.core.GrailsApplication
import org.apache.http.HttpStatus

class PostRentalExtensionFeeReminderJob {

    GrailsApplication grailsApplication

    def execute(context) {
        def data = context.mergedJobDataMap
        def saleTransactionProductIds = Eval.me("${data.saleTransactionProductIds}")

        def itemsWithFee = saleTransactionProductIds.findAll { itemId ->
            def fees, responseCode, text
            (fees, responseCode, text) = ApiUtil.get(path: 'saleTransactionProduct/postRentalPrices',
                    id: itemId, includeStatus: true)

            def apiError = responseCode != HttpStatus.SC_OK

            if (apiError) {
                log.trace("Error getting postRentalPrices from API for item ID $itemId.")
                log.trace("Error: $text")
            }

            // Only include items that didn't error, that still have an extension fee, and that haven't been bought out
            !apiError && fees && fees.extensionPrice && fees.buyoutPrice
        }

        if (!itemsWithFee) {
            log.trace('No items to send an extension fee reminder e-mail for.')
            return
        }

        def recipientEmail = "${data['recipientEmail']}"
        def queueUrl = "$grailsApplication.config.valore.sqs.rental.extension.queue"
        def message = "Post-rental extension fee reminder"
        def attributes = [emailAddress: recipientEmail, ids: "$itemsWithFee", success: 'false',
                          action: 'AUTO_EXTEND', auto: 'true']

        log.trace("Enqueuing message onto $queueUrl...")
        AwsUtil.sqsSendMessage(queueUrl, message, attributes)
        log.trace("Enqueuing complete.")
    }
}
