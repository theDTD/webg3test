package com.valore

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(CardUpdateService)
class CardUpdateServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test getCutoffExpirationDateForExtension"() {
        when:
        Date cutoffDate = service.getCutoffExpirationDateForExtension(
                [id: 1,
                 saleTransactionProducts: [
                         [id: 1, saleTransactionProductRental: [id: 1, originalReturnByDate: '2019-11-25T00:00:00Z']],
                         [id: 2, saleTransactionProductRental: [id: 2, originalReturnByDate: '2019-10-25T00:00:00Z']],
                         [id: 3, saleTransactionProductRental: null]
                 ]]
        )

        then:
        cutoffDate == new Date(119, 9, 25) + 50
    }
}
