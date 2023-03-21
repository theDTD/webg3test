package com.valore.sale.cart

import com.valore.util.ApiUtil
import groovy.mock.interceptor.MockFor
import spock.lang.Specification

class UnlockItemJobSpec extends Specification {
    def unlockItemJob
    def apiUtil

    def setup() {
        unlockItemJob = new UnlockItemJob()
        apiUtil = new MockFor(ApiUtil)
    }

    void "test execute with cartItem id"() {
        given:
        def context = [:]
        context.mergedJobDataMap = [cartItemId: 1, cartId: 1]

        apiUtil.demand.with {
            get(1) { args ->
                assert args.path == 'cartItem/unlock'
                assert args.id == '1'
                assert args.query.cart == '1'
                []
            }
        }

        when:
        apiUtil.use {
            unlockItemJob.execute(context)
        }

        then:
        true
    }
}
