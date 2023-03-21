package com.valore.sale.rental

import com.amazonaws.services.sqs.model.SendMessageResult
import com.valore.util.ApiUtil
import com.valore.util.AwsUtil
import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import grails.util.Holders
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import org.slf4j.Logger
import spock.lang.Specification
import spock.lang.Unroll

@TestMixin(GrailsUnitTestMixin)
class PostRentalJobSpec extends Specification {
    def postRentalJob
    def mockLog
    def apiUtil
    def awsUtil

    def setup() {
        postRentalJob = Spy(PostRentalJob)
        mockLog = Mock(Logger)
        postRentalJob.log = mockLog
        postRentalJob.grailsApplication = Holders.grailsApplication
        apiUtil = new MockFor(ApiUtil)
        awsUtil = new MockFor(AwsUtil)
    }

    def cleanup() {
        GroovySystem.metaClassRegistry.removeMetaClass(PostRentalJob)
    }

    @Unroll
    void "test execute for 400s and 403s"() {
        given:
        def stpid = 1
        def action = PostRentalJob.AUTO_EXTEND
        def data = [saleTransactionProductIds: [stpid], emailAddress: 'test@test.com', action: action]
        def context = [mergedJobDataMap: data]
        def text = "text"
        def response = [null, statusCode, text]

        apiUtil.demand.with {
            post(1) { args ->
                assert args.path == 'postRentalTransaction'
                assert args.json.saleTransactionProductId == stpid
                assert args.json.action == action
                response
            }
        }

        when:
        apiUtil.use {
            postRentalJob.execute(context)
        }

        then:
        0 * postRentalJob.sqsLogAndSendMessage(*_)
        1 * mockLog.error("Couldn't charge $action for saleTransactionProductId: $stpid, received $statusCode error.")
        1 * mockLog.debug("API text: $text")

        where:
        statusCode << [HttpStatus.SC_BAD_REQUEST, HttpStatus.SC_FORBIDDEN]
    }

    @Unroll
    void "test execute for 200"() {
        given:
        def stpid = 1
        def data = [saleTransactionProductIds: [stpid], emailAddress: 'test@test.com', action: action]
        def context = [mergedJobDataMap: data]
        def response = [[itemAmount: 1234], HttpStatus.SC_OK, null]
        int count = 0
        postRentalJob.grailsApplication.config.valore.sqs.rental.extension.queue = 'extension'
        postRentalJob.grailsApplication.config.valore.sqs.rental.buyout.queue = 'buyout'

        apiUtil.demand.with {
            post(1) { args ->
                assert args.path == 'postRentalTransaction'
                assert args.json.saleTransactionProductId == stpid
                assert args.json.action == action
                response
            }
        }

        when:
        apiUtil.use {
            postRentalJob.execute(context)
        }

        then:
        1 * postRentalJob.invokeMethod(*_) >> { String methodName, def args ->
            assert methodName == 'sqsLogAndSendMessage'
            assert args
            assert args.size() == 3
            assert args[0] == url
            assert args[1] == "$action Success Message"
            def attributes = args[2]
            assert attributes["$amountAttr"] == "1234"
            assert attributes['auto'] == 'true'
            count++
        }
        count == 1
        0 * mockLog.error(_)
        1 * mockLog.debug(_)

        where:
        action << [PostRentalJob.AUTO_EXTEND, "AUTO_BUYOUT"]
        url << ['extension', 'buyout']
        amountAttr << ['extensionAmount', 'buyoutAmount']
    }

    @Unroll
    void "test execute for 500s, 402s, and others"() {
        given:
        def stpid = 1
        def data = [saleTransactionProductIds: [stpid], emailAddress: 'test@test.com', action: action]
        def context = [mergedJobDataMap: data]
        def text = "text"
        def response = [null, statusCode, text]
        int count = 0

        apiUtil.demand.with {
            post(1) { args ->
                assert args.path == 'postRentalTransaction'
                assert args.json.saleTransactionProductId == stpid
                assert args.json.action == action
                response
            }
        }

        when:
        apiUtil.use {
            postRentalJob.execute(context)
        }

        then:
        1 * postRentalJob.invokeMethod(*_) >> { String methodName, def args ->
            assert methodName == 'sqsLogAndSendMessage'
            assert args
            assert args.size() == 3
            assert args[1] == "$action Failure Message"
            count++
        }
        count == 1
        1 * mockLog.error("Couldn't charge $action for saleTransactionProductId: $stpid, received $statusCode error.")
        1 * mockLog.debug("API text: $text")

        where:
        statusCode << [HttpStatus.SC_INTERNAL_SERVER_ERROR,
                       HttpStatus.SC_INTERNAL_SERVER_ERROR,
                       HttpStatus.SC_PAYMENT_REQUIRED,
                       HttpStatus.SC_PAYMENT_REQUIRED,
                       HttpStatus.SC_BAD_GATEWAY,
                       HttpStatus.SC_BAD_GATEWAY]
        action << [PostRentalJob.AUTO_EXTEND,
                   "AUTO_BUYOUT",
                   PostRentalJob.AUTO_EXTEND,
                   "AUTO_BUYOUT",
                   PostRentalJob.AUTO_EXTEND,
                   "AUTO_BUYOUT"]
    }

    void "test sqsLogAndSendMessage"() {
        given:
        SendMessageResult expected = new SendMessageResult()
        String queueUrl = "queueUrl"
        String message = "message"
        Map<String, String> attributes = [key: "value"]

        awsUtil.demand.sqsSendMessage(1) { String urlArg, String messageArg, Map<String, String> attributesArg ->
            assert urlArg == queueUrl
            assert messageArg == message
            assert attributesArg == attributes
            expected
        }

        when:
        SendMessageResult actual = null
        awsUtil.use {
            actual = postRentalJob.sqsLogAndSendMessage(queueUrl, message, attributes)
        }

        then:
        actual == expected
    }
}
