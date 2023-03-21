package com.valore.sale.rental

import com.valore.util.AwsUtil
import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import grails.util.Holders
import groovy.mock.interceptor.MockFor
import org.slf4j.Logger
import spock.lang.Specification

@TestMixin(GrailsUnitTestMixin)
class PostRentalReminderJobSpec extends Specification {
    def postRentalReminderJob
    def awsUtil

    def setup() {
        postRentalReminderJob = new PostRentalReminderJob()
        postRentalReminderJob.grailsApplication = Holders.grailsApplication
        postRentalReminderJob.log = Mock(Logger)
        awsUtil = new MockFor(AwsUtil)

    }

    def cleanup() { }

    void "test execute"() {
        given:
        def data = [saleTransactionProductIds: '[1, 2, 3]', emailAddress: 'email']
        def context = [mergedJobDataMap: data]

        and:
        awsUtil.demand.with {
            sqsSendMessage(1) { def queueUrl, def message, Map attributes ->
                assert queueUrl == postRentalReminderJob.grailsApplication.config.valore.sqs.rental.overdue.queue
                assert message == "Rental Overdue Email for saleTransactionProductIds: ${data['saleTransactionProductIds']}"
                assert attributes == [emailAddress: "${data.emailAddress}", ids: "$data.saleTransactionProductIds"]
            }
        }

        when:
        awsUtil.use {
            postRentalReminderJob.execute(context)
        }

        then:
        2 * postRentalReminderJob.log.trace(_)
    }

    void "test execute - error"() {
        given:
        def stpIds = [saleTransactionProductIds: '[1, 2, 3]']
        def context = [mergedJobDataMap: stpIds]
        def awsUtil = new MockFor(AwsUtil)

        and:
        awsUtil.demand.sqsSendMessage(1) {
            def queueUrl, def message, Map attributes ->
                assert queueUrl == postRentalReminderJob.grailsApplication.config.valore.sqs.rental.overdue.queue
                assert message == "Rental Overdue Email for saleTransactionProductIds: ${data['saleTransactionProductIds']}"
                assert attributes == [emailAddress: "${data.emailAddress}", ids: "$data.saleTransactionProductIds"]
                throw (new Exception())
        }

        when:
        awsUtil.use {
            postRentalReminderJob.execute(context)
        }

        then:
        1 * postRentalReminderJob.log.trace(_)
        1 * postRentalReminderJob.log.error(_)
    }
}
