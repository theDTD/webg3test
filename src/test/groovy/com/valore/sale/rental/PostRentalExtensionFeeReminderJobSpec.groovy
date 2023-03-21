package com.valore.sale.rental

import com.valore.util.ApiUtil
import com.valore.util.AwsUtil
import grails.core.DefaultGrailsApplication
import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification

@TestMixin(GrailsUnitTestMixin)
class PostRentalExtensionFeeReminderJobSpec extends Specification {
    def postRentalExtensionFeeReminderJob
    def apiUtil
    def awsUtil

    def setup() {
        postRentalExtensionFeeReminderJob = new PostRentalExtensionFeeReminderJob()
        postRentalExtensionFeeReminderJob.grailsApplication = new DefaultGrailsApplication()
        apiUtil = new MockFor(ApiUtil)
        awsUtil = new MockFor(AwsUtil)
    }

    def cleanup() {}

    def "test execute when there are no items"() {
        given:
        def context = [mergedJobDataMap: [saleTransactionProductIds: []]]

        and:
        apiUtil.demand.get(0) { Map args -> }
        awsUtil.demand.sqsSendMessage(0) { String queueUrl, String message, Map attributes -> }

        when:
        apiUtil.use {
            awsUtil.use {
                postRentalExtensionFeeReminderJob.execute(context)
            }
        }

        then:
        true
    }

    def "test execute when api calls error"() {
        given:
        def context = [mergedJobDataMap: [saleTransactionProductIds: [1, 2, 3]]]

        and:
        apiUtil.demand.get(3) { Map args ->
            assert args.path == 'saleTransactionProduct/postRentalPrices'
            assert args.id in [1, 2, 3]
            assert args.includeStatus
            [[:], HttpStatus.SC_FORBIDDEN, "Error"]
        }
        awsUtil.demand.sqsSendMessage(0) { String queueUrl, String message, Map attributes -> }

        when:
        apiUtil.use {
            awsUtil.use {
                postRentalExtensionFeeReminderJob.execute(context)
            }
        }

        then:
        true
    }

    def "test execute when there are no extension/buyout amounts"() {
        given:
        def context = [mergedJobDataMap: [saleTransactionProductIds: [1, 2, 3]]]

        and:
        apiUtil.demand.get(3) { Map args ->
            assert args.path == 'saleTransactionProduct/postRentalPrices'
            assert args.id in [1, 2, 3]
            assert args.includeStatus
            [[extensionPrice: null, buyoutPrice: null], HttpStatus.SC_OK, null]
        }
        awsUtil.demand.sqsSendMessage(0) { String queueUrl, String message, Map attributes -> }

        when:
        apiUtil.use {
            awsUtil.use {
                postRentalExtensionFeeReminderJob.execute(context)
            }
        }

        then:
        true
    }

    def "test execute"() {
        given:
        def context = [mergedJobDataMap: [saleTransactionProductIds: [1, 2, 3], recipientEmail: 'test@test.com']]

        and:
        apiUtil.demand.get(3) { Map args ->
            assert args.path == 'saleTransactionProduct/postRentalPrices'
            assert args.id in [1, 2, 3]
            assert args.includeStatus
            [[extensionPrice: 500, buyoutPrice: 5000], HttpStatus.SC_OK, null]
        }
        awsUtil.demand.sqsSendMessage(1) { String queueUrl, String message, Map attributes ->
            assert queueUrl == "$postRentalExtensionFeeReminderJob.grailsApplication.config.valore.sqs.rental.extension.queue"
            assert message == "Post-rental extension fee reminder"
            assert attributes.emailAddress == context.mergedJobDataMap.recipientEmail
            assert attributes.ids == "$context.mergedJobDataMap.saleTransactionProductIds"
            assert attributes.success == 'false'
            assert attributes.action == 'AUTO_EXTEND'
            assert attributes.auto == 'true'
        }

        when:
        apiUtil.use {
            awsUtil.use {
                postRentalExtensionFeeReminderJob.execute(context)
            }
        }

        then:
        true
    }
}
