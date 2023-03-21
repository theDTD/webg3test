package com.valore.checkout

import com.valore.EncryptedCookieService
import com.valore.sale.cart.UnlockItemJob
import com.valore.util.ApiUtil
import grails.plugins.quartz.JobManagerService
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.grails.web.servlet.mvc.GrailsWebRequest
import org.grails.web.util.WebUtils
import org.quartz.Scheduler
import org.quartz.Trigger
import org.quartz.TriggerBuilder
import org.quartz.TriggerKey
import org.quartz.spi.MutableTrigger
import spock.lang.Specification

import javax.servlet.http.HttpServletRequest

@TestFor(CartService)
class CartServiceSpec extends Specification {
    def result

    def setup() {
        service.encryptedCookieService = Mock(EncryptedCookieService)
        grailsApplication.config.valore.cookie.cartId = "cartCookie"
    }

    def cleanup() {
    }

    void "test getCart"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        def id = 1234
        result = false

        and:
        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 3
                assert args['path'] == 'cart'
                assert args['id'] == id
                assert args['query'] == [deep: true]
                true
            }
        }

        when:
        apiUtil.use {
            result = service.getCart(id)
        }

        then:
        result
    }

    void "test createCart in test mode"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        result = false
        def test = true

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'cart'
                assert args['json'] == [state: "TEST_ACTIVE", ipAddress:'1.1.1.1']
                true
            }
        }

        when:
        apiUtil.use {
            result = service.createCart('1.1.1.1', test)
        }

        then:
        result
    }

    void "test createCart"() {
        given:
        def apiUtil = new MockFor(ApiUtil.class)
        result = false

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'cart'
                assert args['json'] == [state: "ACTIVE", ipAddress: '1.1.1.1']
                true
            }
        }

        when:
        apiUtil.use {
            result = service.createCart('1.1.1.1')
        }

        then:
        result
    }

    void "test getTotals"() {
        when:
        def actual = service.getTotals(cartItems)

        then:
        actual == expected

        where:
        cartItems << [null, [[currentPrice: 1, shippingCost: 2, quantity: 3], [currentPrice: 4, shippingCost: 5, quantity: 6], [quantity: 7]]]
        expected << [[itemTotal: 0, shippingTotal: 0], [itemTotal: 27, shippingTotal: 36]]
    }

    void "test getTotals with N/A items"() {
        when:

        def actual = service.getTotals(cartItems)

        then:
        actual == expected

        where:
        cartItems << [[[currentPrice: 1, shippingCost: 2, quantity: 3, state: 'OK'], [currentPrice: 4, shippingCost: 5, quantity: 6, state: 'REMOVED_NOT_AVAILABLE'], [quantity: 7, state: 'OK']]]
        expected << [[itemTotal: 3, shippingTotal: 6]]
    }

    void "test scheduleItemUnlock (if block case)"() {
        given:
        def itemId = 1
        Date unlockTime = Mock(Date)
        MutableTrigger newTriggerBuildValue = Mock(MutableTrigger)
        TriggerBuilder triggerBuilder = Mock(TriggerBuilder)
        triggerBuilder.build() >> newTriggerBuildValue
        Trigger trigger = Mock(Trigger)
        TriggerKey triggerKey = new TriggerKey("$itemId", "UNLOCK_ITEM")
        trigger.getKey() >> triggerKey
        Scheduler scheduler = Mock(Scheduler)
        JobManagerService jobManagerService = Mock(JobManagerService)
        scheduler.checkExists(triggerKey) >> true
        trigger.getTriggerBuilder() >> triggerBuilder
        scheduler.getTrigger(triggerKey) >> trigger
        jobManagerService.getQuartzScheduler() >> scheduler
        service.jobManagerService = jobManagerService

        when:
        service.scheduleItemUnlock(null, itemId, unlockTime)

        then:
        1 * triggerBuilder.startAt(unlockTime) >> null
        1 * scheduler.rescheduleJob(triggerKey, newTriggerBuildValue) >> new Date()
    }

    void "test scheduleItemUnlock (else block case)"() {
        given:
        def itemId = 1
        def cartId = 1234
        Date unlockTime = Mock(Date)
        TriggerKey triggerKey = new TriggerKey("$itemId", "UNLOCK_ITEM")
        Scheduler scheduler = Mock(Scheduler)
        JobManagerService jobManagerService = Mock(JobManagerService)
        scheduler.checkExists(triggerKey) >> false
        jobManagerService.getQuartzScheduler() >> scheduler
        service.jobManagerService = jobManagerService
        def mockForTriggerBuilder = new MockFor(TriggerBuilder.class)
        TriggerBuilder newTriggerValue = Mock(TriggerBuilder)
        TriggerBuilder withIdentityValue = Mock(TriggerBuilder)
        TriggerBuilder usingJobDataCartIdValue = Mock(TriggerBuilder)
        TriggerBuilder usingJobDataCartItemIdValue = Mock(TriggerBuilder)
        TriggerBuilder startAtValue = Mock(TriggerBuilder)
        MutableTrigger finalTrigger = Mock(MutableTrigger)
        newTriggerValue.withIdentity(triggerKey) >> withIdentityValue
        withIdentityValue.usingJobData("cartId", cartId) >> usingJobDataCartIdValue
        usingJobDataCartIdValue.usingJobData("cartItemId", itemId) >> usingJobDataCartItemIdValue
        usingJobDataCartItemIdValue.startAt(unlockTime) >> startAtValue
        startAtValue.build() >> finalTrigger
        def mockForUnlockItemJob = new MockFor(UnlockItemJob.class)

        and:
        mockForTriggerBuilder.demand.with {
            newTrigger(1) { ->
                newTriggerValue
            }
        }
        mockForUnlockItemJob.demand.with {
            schedule(1) { Trigger trigger ->
                assert trigger == finalTrigger
            }
        }

        when:
        mockForUnlockItemJob.use {
            mockForTriggerBuilder.use {
                service.scheduleItemUnlock(cartId, itemId, unlockTime)
            }
        }

        then:
        0 * scheduler.getTrigger(_)
        0 * scheduler.rescheduleJob(*_)
    }

    void "test shouldUserAcknowledgeRNAItems"() {
        expect:
        assert service.shouldUserAcknowledgeRNAItems([[state: 'REMOVED_NOT_AVAILABLE']], 0)
    }

    void "test shouldUserAcknowledgeRNAItems when no items have RNA status"() {
        expect:
        assert !service.shouldUserAcknowledgeRNAItems([[state: 'REMOVED_NOT_AVAILABLE_ACKNOWLEDGED']], 0)
    }

    void "test getRNAItemCount"() {
        expect:
        assert service.getRNAItemCount([[state: 'REMOVED_NOT_AVAILABLE']]) == 1
    }


    void "test getCartIdFromCookie  - allowCreate existing cart"() {
        given:
        def initialCartId = 1
        def webUtils = Mock(GrailsWebRequest)
        def request = Mock(HttpServletRequest)

        WebUtils.metaClass.static.retrieveGrailsWebRequest = {
            webUtils
        }

        when:
        def id = service.getCartIdFromCookie(true)

        then:
        1 * webUtils.getCurrentRequest() >> request
        1 * service.encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.cartId) >> initialCartId
        0 * service.createCart(*_)
        id == initialCartId as String

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(WebUtils)
    }

    void "test getCartIdFromCookie  - allowCreate new cart"() {
        given:
        def initialCartId = null
        def webUtils = Mock(GrailsWebRequest)
        def request = Mock(HttpServletRequest)
        def apiUtil = new MockFor(ApiUtil.class)

        WebUtils.metaClass.static.retrieveGrailsWebRequest = {
            webUtils
        }

        def finalCartId = 1
        def newCart = [id: finalCartId]
        def id

        and:
        apiUtil.demand.with {
            post(1) { def args ->
                assert args.size() == 2
                assert args['path'] == 'cart'
                newCart
            }
        }

        when:
        apiUtil.use {
            id = service.getCartIdFromCookie(true)
        }

        then:
        1 * webUtils.getCurrentRequest() >> request
        1 * service.encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.cartId) >> initialCartId
        1 * service.encryptedCookieService.setCookie(grailsApplication.config.valore.cookie.cartId, '1', Integer.MAX_VALUE, null, null, null, false)
        id == finalCartId

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(WebUtils)
    }

    void "test getCartIdFromCookie  - allowCreate = false"() {
        given:
        def initialCartId = 1
        def webUtils = Mock(GrailsWebRequest)
        def request = Mock(HttpServletRequest)

        WebUtils.metaClass.static.retrieveGrailsWebRequest = {
            webUtils
        }

        when:
        def id = service.getCartIdFromCookie(false)

        then:
        1 * webUtils.getCurrentRequest() >> request
        1 * service.encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.cartId) >> initialCartId
        0 * service.createCart(*_)
        id == initialCartId as String

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(WebUtils)
    }

    void "test getSellbackCart - no id"() {
        given:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            get(0) { args -> }
        }

        when:
        def cart
        apiUtilMock.use {
            cart = service.getSellbackCart(null)
        }

        then:
        cart == null
    }

    void "test getSellbackCart - success"() {
        given:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            get(1) { args ->
                assert args.path == 'sellbackCart'
                assert args.id == 321
                assert args.query?.deep
                [id: 321]
            }
        }

        when:
        def cart
        apiUtilMock.use {
            cart = service.getSellbackCart(321)
        }

        then:
        cart?.id == 321
    }

    void "test createSellbackCart"() {
        given:
        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert args.path == 'sellbackCart'
                assert args.json?.state == 'ACTIVE'
                [id: 322]
            }
        }

        when:
        def cart
        apiUtilMock.use {
            cart = service.createSellbackCart(null)
        }

        then:
        cart?.id == 322
    }

    void "test getSellbackCartIdFromCookie - no cart ID"() {
        given:
        def webUtils = Mock(GrailsWebRequest)
        def request = Mock(HttpServletRequest)

        WebUtils.metaClass.static.retrieveGrailsWebRequest = {
            webUtils
        }

        def apiUtilMock = new MockFor(ApiUtil)
        apiUtilMock.demand.with {
            post(1) { args ->
                assert args.path == 'sellbackCart'
                assert args.json?.state == 'ACTIVE'
                [id: 12345]
            }
        }

        when:
        Long cartId
        apiUtilMock.use {
            cartId = service.getSellbackCartIdFromCookie()
        }

        then:
        1 * webUtils.getCurrentRequest() >> request
        1 * service.encryptedCookieService.getCookie('VSellbackCartID') >> null
        1 * service.encryptedCookieService.setCookie('VSellbackCartID', '12345', Integer.MAX_VALUE, null, null, null,
                false) >> null
        cartId == 12345l

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(WebUtils)
    }

    void "test getSellbackCartIdFromCookie - cart ID contained by cookie"() {
        when:
        def webUtils = Mock(GrailsWebRequest)

        WebUtils.metaClass.static.retrieveGrailsWebRequest = {
            webUtils
        }

        Long cartId = service.getSellbackCartIdFromCookie()

        then:
        1 * service.encryptedCookieService.getCookie('VSellbackCartID') >> 12345
        0 * service.encryptedCookieService.setCookie('VSellbackCartID', '12345', Integer.MAX_VALUE, null, null, null,
                false) >> null
        cartId == 12345l

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(WebUtils)
    }

    void "test resetCookies"() {
        given:
        def prevTransId = 11111
        grailsApplication.config.valore.cookie.prevTransId = 'prevTransId'
        grailsApplication.config.valore.cookie.affSiteId = 'affsiteid'
        grailsApplication.config.valore.cookie.affTrackingId = 'afftrackid'
        grailsApplication.config.valore.cookie.legacy.affSiteId = 'legacyAffsiteid'
        grailsApplication.config.valore.cookie.legacy.affTrackingId = 'legacyAfftrackid'

        when:
        service.resetCookies(prevTransId)

        then:
        1 * service.encryptedCookieService.setCookie(grailsApplication.config.valore.cookie.prevTransId, '11111', 7200, null, null, null, false)
        1 * service.encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.cartId as String)
        1 * service.encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.affSiteId as String)
        1 * service.encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.affTrackingId as String)
        1 * service.encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.legacy.affSiteId as String)
        1 * service.encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.legacy.affTrackingId as String)
    }
}
