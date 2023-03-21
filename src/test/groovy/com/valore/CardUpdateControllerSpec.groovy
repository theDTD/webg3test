package com.valore

import com.valore.codec.AES128Codec
import com.valore.util.ApiUtil
import com.valore.util.MiscUtil
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification
import spock.lang.Unroll

import java.text.SimpleDateFormat

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(CardUpdateController)
class CardUpdateControllerSpec extends Specification {

    def setup() {
        grailsApplication.config.valore.legacyUrl = "legacyUrl"
        grailsApplication.config.valore.litleOnline.jsUrl = "litleOnlineJs"
        grailsApplication.config.valore.litleOnline.jsLitleApiUrl = "litleOnlineJsAPI"
        mockCodec(AES128Codec)
        controller.cardUpdateService = Mock(CardUpdateService)
    }

    def cleanup() {
    }

    @Unroll
    void "test index (missing id and/or email)"() {
        given:
        params.id = id
        params.email = email

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            get(0) { }
        }

        when:
        apiUtilMock.use {
            controller.index()
        }

        then:
        response.redirectUrl == "legacyUrl"

        where:
        id << [null, null, 1]
        email << [null, "fGZ2zLlOL1NrBGTv1RGHb/frfT2LHWUC1fHONQr6W2elrPwBFclRWe4fD5/x1r3w", null]
    }

    @Unroll
    void "test index (emails do not match)"() {
        given:
        int id = 1234
        params.id = id
        params.email = "fGZ2zLlOL1NrBGTv1RGHb/frfT2LHWUC1fHONQr6W2elrPwBFclRWe4fD5/x1r3w"

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'saleTransaction'
                assert args['id'] == id
                assert args['query']['deep']
                apiResponse
            }
        }

        when:
        apiUtilMock.use {
            controller.index()
        }

        then:
        response.redirectUrl == "legacyUrl"

        where:
        apiResponse << [[emailAddress: "#DoesNotMatch"], [emailAddress: null], [:], null]
    }

    void "test index for non-rental (success scenario)"() {
        given:
        int id = 1234
        String email = "email@valore.com"
        params.id = id
        params.email = "fGZ2zLlOL1NrBGTv1RGHb/frfT2LHWUC1fHONQr6W2elrPwBFclRWe4fD5/x1r3w"
        params.isForExtension = false

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'saleTransaction'
                assert args['id'] == id
                assert args['query']['deep']
                [emailAddress: email, saleTransactionProducts: [[id: 1, saleTransactionProductRental: null]]]
            }
        }
        MiscUtil.metaClass.static.getRandomId = { -> 'vantivOrderId' }

        when:
        apiUtilMock.use {
            controller.index()
        }

        then:
        0 * controller.cardUpdateService.getCutoffExpirationDateForExtension(*_)
        view == '/card-update/index'
        model.size() == 7
        ['vantivOrderId', 'litleOnlineJs', 'litleOnlineJsAPI'].each {
            assert model[it] == it
        }
        model.vantivReportGroup == "Post-Rental CC Update"
        model.saleTransactionId == "$id"
        model.orderSummaryHref.toString().startsWith(
            "legacyUrl/CustomerService.OrderTracking.InfoEntry_TrackOrder.do_rewrite?" +
            "OrderNumber=${id}&OrderInfo=")
        model.orderSummaryHref.toString().endsWith("&OrderType=1")
        model.cutoffDate == null

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(MiscUtil)
    }

    void "test index for rental extension (success scenario)"() {
        given:
        int id = 1234
        String email = "email@valore.com"
        params.id = id
        params.email = "fGZ2zLlOL1NrBGTv1RGHb/frfT2LHWUC1fHONQr6W2elrPwBFclRWe4fD5/x1r3w"
        params.isForExtension = true

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        def transaction = [emailAddress: email,
                           saleTransactionProducts: [
                                   [id: 1, saleTransactionProductRental: null],
                                   [id: 2, saleTransactionProductRental: [id: 1, originalReturnByDate: "2019-10-22T00:00:00Z"]],
                                   [id: 3, saleTransactionProductRental: [id: 2, originalReturnByDate: "2019-12-22T00:00:00Z"]]
                           ]]
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'saleTransaction'
                assert args['id'] == id
                assert args['query']['deep']
                transaction
            }
        }
        MiscUtil.metaClass.static.getRandomId = { -> 'vantivOrderId' }

        and:
        SimpleDateFormat sdf = new SimpleDateFormat('MM/dd/yyyy')

        when:
        apiUtilMock.use {
            controller.index()
        }

        then:
        1 * controller.cardUpdateService.getCutoffExpirationDateForExtension(transaction) >> sdf.parse('10/22/2019') + 50
        view == '/card-update/index'
        model.size() == 7
        ['vantivOrderId', 'litleOnlineJs', 'litleOnlineJsAPI'].each {
            assert model[it] == it
        }
        model.vantivReportGroup == "Post-Rental CC Update"
        model.saleTransactionId == "$id"
        model.orderSummaryHref.toString().startsWith(
                "legacyUrl/CustomerService.OrderTracking.InfoEntry_TrackOrder.do_rewrite?" +
                        "OrderNumber=${id}&OrderInfo=")
        model.orderSummaryHref.toString().endsWith("&OrderType=1")
        model.cutoffDate == sdf.format(sdf.parse('10/22/2019') + 50)

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(MiscUtil)
    }

    void "test index for rental buyout (success scenario)"() {
        given:
        int id = 1234
        String email = "email@valore.com"
        params.id = id
        params.email = "fGZ2zLlOL1NrBGTv1RGHb/frfT2LHWUC1fHONQr6W2elrPwBFclRWe4fD5/x1r3w"
        params.isForExtension = false

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        def transaction = [emailAddress: email,
                           saleTransactionProducts: [
                                   [id: 1, saleTransactionProductRental: null],
                                   [id: 2, saleTransactionProductRental: [id: 1, originalReturnByDate: "2019-10-22T00:00:00Z"]],
                                   [id: 3, saleTransactionProductRental: [id: 2, originalReturnByDate: "2019-12-22T00:00:00Z"]]
                           ]]
        apiUtilMock.demand.with {
            get(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'saleTransaction'
                assert args['id'] == id
                assert args['query']['deep']
                transaction
            }
        }
        MiscUtil.metaClass.static.getRandomId = { -> 'vantivOrderId' }

        and:
        SimpleDateFormat sdf = new SimpleDateFormat('MM/dd/yyyy')

        when:
        apiUtilMock.use {
            controller.index()
        }

        then:
        0 * controller.cardUpdateService.getCutoffExpirationDateForExtension(transaction)
        view == '/card-update/index'
        model.size() == 7
        ['vantivOrderId', 'litleOnlineJs', 'litleOnlineJsAPI'].each {
            assert model[it] == it
        }
        model.vantivReportGroup == "Post-Rental CC Update"
        model.saleTransactionId == "$id"
        model.orderSummaryHref.toString().startsWith(
                "legacyUrl/CustomerService.OrderTracking.InfoEntry_TrackOrder.do_rewrite?" +
                        "OrderNumber=${id}&OrderInfo=")
        model.orderSummaryHref.toString().endsWith("&OrderType=1")
        model.cutoffDate == null

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(MiscUtil)
    }

    void "test submit (no saleTransactionId)"() {
        given:
        request.JSON = [:]

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(0) { }
        }

        when:
        apiUtilMock.use {
            controller.submit()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test submit (no registrationId)"() {
        given:
        request.JSON = [saleTransactionId: 123]

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(0) { }
        }

        when:
        apiUtilMock.use {
            controller.submit()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test submit (no defaultBilling)"() {
        given:
        request.JSON = [saleTransactionId: 123, registrationId: '123test']

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(0) { }
        }

        when:
        apiUtilMock.use {
            controller.submit()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test submit (missing field on address)"() {
        given:
        request.JSON = [saleTransactionId: 123,
                        registrationId: '123test',
                        defaultBilling: [lastName: 'Valore',
                                         line1: '123 Test Lane',
                                         city: 'Boston',
                                         state: 'MA',
                                         postalCode: '02110',
                                         country: 'US']]

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(0) { }
        }

        when:
        apiUtilMock.use {
            controller.submit()
        }

        then:
        response.status == HttpStatus.SC_BAD_REQUEST
    }

    void "test submit"() {
        given:
        def saleTransactionId = 123
        def registrationId = '123test'
        def defaultBilling = [firstName: 'Victor',
                              lastName: 'Valore',
                              line1: '123 Test Lane',
                              city: 'Boston',
                              state: 'MA',
                              postalCode: '02110',
                              country: 'US']
        request.JSON = [saleTransactionId: saleTransactionId,
                        registrationId: registrationId,
                        defaultBilling: defaultBilling,
                        expMonth: '6', expYear: '2020']

        and:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { def args ->
                assert args.size() == 4
                assert args['path'] == 'SaleTransaction/updateToken'
                assert args['id'] == saleTransactionId
                def json = args['json']
                assert json != null
                assert json['registrationId'] == registrationId
                def billingAddress = json['billingAddress']
                assert billingAddress != null
                assert billingAddress['firstName'] == defaultBilling.firstName
                assert billingAddress['lastName'] == defaultBilling.lastName
                assert billingAddress['line1'] == defaultBilling.line1
                assert billingAddress['line2'] == null
                assert billingAddress['city'] == defaultBilling.city
                assert billingAddress['state'] == defaultBilling.state
                assert billingAddress['postalCode'] == defaultBilling.postalCode
                assert billingAddress['country'] == 'US'
                assert json['expDate'] == '0620'
                [[id: 1], HttpStatus.SC_OK, null]
            }
        }

        when:
        apiUtilMock.use {
            controller.submit()
        }

        then:
        response.status == HttpStatus.SC_OK
    }
}
