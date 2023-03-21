package com.valore.sale.rental

import com.valore.util.AwsUtil
import grails.core.GrailsApplication

class PostRentalReminderJob {
    def concurrent = false

    GrailsApplication grailsApplication

    def execute(context) {
        def now = new Date()
        Map data = context.mergedJobDataMap
        String saleTransactionProductIds = data['saleTransactionProductIds']
        String emailAddress = data['emailAddress']
        String postRentalReminderQueue = grailsApplication.config.valore.sqs.rental.overdue.queue

        log.trace("Attempting to enqueue a message for saleTransactionProductIds: $saleTransactionProductIds on " +
                "$postRentalReminderQueue")

        try {
            AwsUtil.sqsSendMessage(postRentalReminderQueue, "Rental Overdue Email for saleTransactionProductIds: ${saleTransactionProductIds}",
                    [emailAddress: "${emailAddress}", ids: "${saleTransactionProductIds}"])
            log.trace('Message enqueued successfully.')
            log.debug("$PostRentalReminderJob.simpleName took ${new Date().time - now.time} ms.")
        } catch(Exception e) {
            log.error("Could not enqueue a message for saleTransactionProductIds: $saleTransactionProductIds on " +
                    "$postRentalReminderQueue. Error: $e.message")
        }
    }
}
