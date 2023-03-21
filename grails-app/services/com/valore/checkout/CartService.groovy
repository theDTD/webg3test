package com.valore.checkout

import com.valore.sale.cart.UnlockItemJob
import com.valore.util.ApiUtil
import org.grails.web.util.WebUtils
import org.quartz.Trigger
import org.quartz.TriggerBuilder
import org.quartz.TriggerKey

class CartService {
    def grailsApplication
    def jobManagerService
    def encryptedCookieService

    def getCart(id) {
        if (!id)
            return

        ApiUtil.get path: 'cart', id: id, query: [deep: true]
    }

    def createCart(String ip, Boolean testMode = false) {
        ApiUtil.post path: 'cart', json: [state: testMode ? "TEST_ACTIVE" : "ACTIVE", ipAddress: ip?:""]
    }

    def getTotals(def cartItems) {
        int itemTotal = 0
        int shippingTotal = 0

        cartItems?.findAll({it.state != "REMOVED_NOT_AVAILABLE" })?.each {item ->
            itemTotal += (item.currentPrice?:0) * item.quantity
            shippingTotal += (item.shippingCost?:0) * item.quantity
        }

        [itemTotal: itemTotal, shippingTotal: shippingTotal]
    }

    def scheduleItemUnlock(def cartId, def itemId, Date unlockTime) {
        Trigger trigger
        TriggerKey key = new TriggerKey("$itemId", "UNLOCK_ITEM")
        if (jobManagerService.getQuartzScheduler().checkExists(key)) {
            trigger = jobManagerService.getQuartzScheduler().getTrigger(key)

            TriggerBuilder newTrigger = trigger.getTriggerBuilder()
            newTrigger.startAt(unlockTime)

            jobManagerService.getQuartzScheduler().rescheduleJob(trigger.getKey(), newTrigger.build())
        } else {
            trigger = TriggerBuilder.newTrigger()
                    .withIdentity(key)
                    .usingJobData("cartId", cartId)
                    .usingJobData("cartItemId", itemId)
                    .startAt(unlockTime)
                    .build()
            UnlockItemJob.schedule(trigger)
        }
    }

    def shouldUserAcknowledgeRNAItems(List cartItems, Integer rnaItemCount) {
        getRNAItemCount(cartItems) > (rnaItemCount ?: 0)
    }

    def getRNAItemCount(List cartItems) {
        cartItems.findAll { it.state == 'REMOVED_NOT_AVAILABLE' }.size()
    }


    def getCartIdFromCookie(def allowCreate = true) {
        def webUtils = WebUtils.retrieveGrailsWebRequest()
        def request = webUtils.getCurrentRequest()

        def cartId = encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.cartId)

        if (!cartId && allowCreate) {
            def originIp = request.getHeader('x-forwarded-for')?.split(',')?.getAt(0)?.trim()
            cartId = createCart(originIp ?: request.remoteAddr).id
            encryptedCookieService.setCookie(grailsApplication.config.valore.cookie.cartId, cartId.toString(), Integer.MAX_VALUE, null, null, null, false)
        }
        cartId
    }

    def getSellbackCart(Long id) {
        if (!id)
            return

        ApiUtil.get path: 'sellbackCart', id: id, query: [deep: true]
    }

    def createSellbackCart(String ip) {
        ApiUtil.post path: 'sellbackCart', json: [state: 'ACTIVE', ipAddress: ip?:""]
    }

    Long getSellbackCartIdFromCookie(Boolean allowCreate = true) {
        def webUtils = WebUtils.retrieveGrailsWebRequest()
        def request = webUtils.getCurrentRequest()

        Long cartId = encryptedCookieService.getCookie(grailsApplication.config.valore.cookie.sellbackCartId) as Long

        if (!cartId && allowCreate) {
            def originIp = request.getHeader('x-forwarded-for')?.split(',')?.getAt(0)?.trim()
            cartId = createSellbackCart(originIp ?: request.remoteAddr).id
            encryptedCookieService.setCookie(grailsApplication.config.valore.cookie.sellbackCartId, cartId.toString(),
                    Integer.MAX_VALUE, null, null, null, false)
        }
        cartId
    }

    def resetCookies(def prevTransId = null) {
        encryptedCookieService.setCookie(grailsApplication.config.valore.cookie.prevTransId as String, prevTransId as String, 7200, null, null, null, false) // maxAge = two hours .. good?
        encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.cartId as String)
        encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.affSiteId as String)
        encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.affTrackingId as String)
        encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.legacy.affSiteId as String)
        encryptedCookieService.deleteCookie(grailsApplication.config.valore.cookie.legacy.affTrackingId as String)
    }
}
