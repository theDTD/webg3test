package com.valore.checkout

import com.valore.sale.rental.PostRentalExtensionFeeReminderJob
import com.valore.sale.rental.PostRentalJob
import com.valore.sale.rental.PostRentalReminderJob
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import org.quartz.JobDataMap
import org.quartz.Trigger
import org.quartz.TriggerKey
import spock.lang.Specification
import spock.lang.Unroll

import java.text.SimpleDateFormat

@TestFor(CheckoutService)
class CheckoutServiceSpec extends Specification {
    def setup() {
    }

    def cleanup() {
    }

    void "test schedulePostRentalExtensionAndBuyout"() {
        given:
        Long saleTransactionProductId = 1234L
        Date date = new Date()
        Trigger firstTrigger = null
        Trigger secondTrigger = null
        int count = 0
        String email = 'test@test.com'

        and:
        def postRentalJobMock = new MockFor(PostRentalJob)
        postRentalJobMock.demand.with {
            schedule(2) { def triggerArg ->
                count++
                if (!firstTrigger) {
                    firstTrigger = triggerArg
                }
                else if (!secondTrigger) {
                    secondTrigger = triggerArg
                }
                else throw new Exception("PostRentalJob.schedule() executed again with both triggers already scheduled.")
            }
        }

        when:
        postRentalJobMock.use {
            service.schedulePostRentalExtensionAndBuyout([(date.clearTime()): [saleTransactionProductId]], email)
        }

        then:
        count == 2
        firstTrigger
        TriggerKey firstTriggerKey = firstTrigger.key
        firstTriggerKey.name == "${saleTransactionProductId}"
        firstTriggerKey.group == "AUTO_EXTEND"
        JobDataMap firstJobDataMap = firstTrigger.jobDataMap
        firstJobDataMap.getString("saleTransactionProductIds") == "${[saleTransactionProductId]}"
        firstJobDataMap.getString("action") == "AUTO_EXTEND"
        firstJobDataMap.getString("recipientEmail") == email
        assertTriggerStartTime(date + 5, firstTrigger.startTime)
        secondTrigger
        TriggerKey secondTriggerKey = secondTrigger.key
        secondTriggerKey.name == "${saleTransactionProductId}"
        secondTriggerKey.group == "AUTO_BUYOUT"
        JobDataMap secondJobDataMap = secondTrigger.jobDataMap
        secondJobDataMap.getString("saleTransactionProductIds") == "${[saleTransactionProductId]}"
        secondJobDataMap.getString("action") == "AUTO_BUYOUT"
        secondJobDataMap.getString("recipientEmail") == email
        assertTriggerStartTime(date + 20, secondTrigger.startTime)
    }

    void "test schedulePostRentalExtensionFeeReminders"() {
        given:
        Long saleTransactionProductId = 1234L
        Date date = new Date()
        Trigger firstTrigger = null
        Trigger secondTrigger = null
        Trigger thirdTrigger = null
        int count = 0
        String email = 'test@test.com'

        and:
        def postRentalExtensionFeeReminderJobMock = new MockFor(PostRentalExtensionFeeReminderJob)
        postRentalExtensionFeeReminderJobMock.demand.with {
            getSimpleName(1) { ->
                "PostRentalExtensionFeeReminderJob"
            }
            schedule(1) { def triggerArg ->
                count++
                firstTrigger = triggerArg
            }
            getSimpleName(1) { ->
                "PostRentalExtensionFeeReminderJob"
            }
            schedule(1) { def triggerArg ->
                count++
                secondTrigger = triggerArg
            }
            getSimpleName(1) { ->
                "PostRentalExtensionFeeReminderJob"
            }
            schedule(1) { def triggerArg ->
                count++
                thirdTrigger = triggerArg
            }
        }

        when:
        postRentalExtensionFeeReminderJobMock.use {
            service.schedulePostRentalExtensionFeeReminders([(date.clearTime()): [saleTransactionProductId]], email)
        }

        then:
        count == 3
        firstTrigger
        TriggerKey firstTriggerKey = firstTrigger.key
        firstTriggerKey.name == "${saleTransactionProductId}"
        firstTriggerKey.group == "${PostRentalExtensionFeeReminderJob.simpleName}10"
        JobDataMap firstJobDataMap = firstTrigger.jobDataMap
        firstJobDataMap.getString("saleTransactionProductIds") == "${[saleTransactionProductId]}"
        firstJobDataMap.getString("recipientEmail") == email
        assertTriggerStartTime(date + 10, firstTrigger.startTime)
        firstTrigger
        TriggerKey secondTriggerKey = secondTrigger.key
        secondTriggerKey.name == "${saleTransactionProductId}"
        secondTriggerKey.group == "${PostRentalExtensionFeeReminderJob.simpleName}15"
        JobDataMap secondJobDataMap = secondTrigger.jobDataMap
        secondJobDataMap.getString("saleTransactionProductIds") == "${[saleTransactionProductId]}"
        secondJobDataMap.getString("recipientEmail") == email
        assertTriggerStartTime(date + 15, secondTrigger.startTime)
        thirdTrigger
        TriggerKey thirdTriggerKey = thirdTrigger.key
        thirdTriggerKey.name == "${saleTransactionProductId}"
        thirdTriggerKey.group == "${PostRentalExtensionFeeReminderJob.simpleName}18"
        JobDataMap thirdJobDataMap = thirdTrigger.jobDataMap
        thirdJobDataMap.getString("saleTransactionProductIds") == "${[saleTransactionProductId]}"
        thirdJobDataMap.getString("recipientEmail") == email
        assertTriggerStartTime(date + 18, thirdTrigger.startTime)
    }

    void "test schedulePostRentalEvents"() {
        given:
        def email = 'email'
        Long saleTransactionId = 1
        Long saleTransactionProductId1 = 1
        Long saleTransactionProductId2 = 2
        Long saleTransactionProductId3 = 3
        def now = new Date()
        def tomorrow = new Date() + 1
        def nowFormatted = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(now)
        def tomorrowFormatted = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").format(tomorrow)
        Map rentalProducts = [1: nowFormatted, 2: nowFormatted, 3: tomorrowFormatted]
        int extensionAndBuyoutScheduleCount = 0
        int reminderScheduleCount = 0
        int extensionFeeReminderScheduleCount = 0

        and:
        service.metaClass.static.schedulePostRentalExtensionAndBuyout = { Map<Date, List> rentalReminderSchedule, String emailAddr ->
            extensionAndBuyoutScheduleCount++
            assert rentalReminderSchedule.size() == 2
            assert rentalReminderSchedule[now.clearTime()] == [saleTransactionProductId1, saleTransactionProductId2]
            assert rentalReminderSchedule[tomorrow.clearTime()] == [saleTransactionProductId3]
            assert emailAddr == email
        }
        service.metaClass.static.schedulePostRentalReminders = { Long transactionId, Map<Date, List> rentalReminderSchedule, String emailAddr ->
            reminderScheduleCount++
            assert transactionId == saleTransactionId
            assert rentalReminderSchedule.size() == 2
            assert rentalReminderSchedule[now.clearTime()] == [saleTransactionProductId1, saleTransactionProductId2]
            assert rentalReminderSchedule[tomorrow.clearTime()] == [saleTransactionProductId3]
            assert emailAddr == email
        }
        service.metaClass.static.schedulePostRentalExtensionFeeReminders = { Map<Date, List> rentalReminderSchedule, String emailAddr ->
            extensionFeeReminderScheduleCount++
            assert rentalReminderSchedule.size() == 2
            assert rentalReminderSchedule[now.clearTime()] == [saleTransactionProductId1, saleTransactionProductId2]
            assert rentalReminderSchedule[tomorrow.clearTime()] == [saleTransactionProductId3]
            assert emailAddr == email
        }

        when:
        service.schedulePostRentalEvents(saleTransactionId, rentalProducts, email)

        then:
        extensionAndBuyoutScheduleCount == 1
        reminderScheduleCount == 1

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(service.class)
    }

    void "test schedulePostRentalReminders"() {
        given:
        def email = 'email'
        Long saleTransactionId = 1
        Date today = new Date().clearTime()
        Date tomorrow = today + 1
        Map<Date, List> rentalReminderSchedule = [:]
        def saleTransactionProductIds1 = [1, 2]
        def saleTransactionProductIds2 = [3]
        rentalReminderSchedule.put(today, saleTransactionProductIds1)
        rentalReminderSchedule.put(tomorrow, saleTransactionProductIds2)
        Trigger firstTrigger = null
        Trigger secondTrigger = null
        int count = 0

        and:
        def postRentalReminderJobMock = new MockFor(PostRentalReminderJob)
        postRentalReminderJobMock.demand.with {
            schedule(rentalReminderSchedule.size()) { triggerArg ->
                count++
                if (!firstTrigger) {
                    firstTrigger = triggerArg
                }
                else if (!secondTrigger) {
                    secondTrigger = triggerArg
                }
                else throw new Exception("PostRentalReminderJob.schedule() executed again with both triggers already scheduled.")
            }
        }

        when:
        postRentalReminderJobMock.use {
            service.schedulePostRentalReminders(saleTransactionId, rentalReminderSchedule, email)
        }

        then:
        count == rentalReminderSchedule.size()
        firstTrigger
        TriggerKey firstTriggerKey = firstTrigger.key
        firstTriggerKey.name == "$saleTransactionId"
        firstTriggerKey.group == "${today + 2}"
        JobDataMap firstJobDataMap = firstTrigger.jobDataMap
        firstJobDataMap.getString("saleTransactionProductIds") == "$saleTransactionProductIds1"
        firstJobDataMap.getString("emailAddress") == "$email"
        firstTrigger.startTime == today + 2
        secondTrigger
        TriggerKey secondTriggerKey = secondTrigger.key
        secondTriggerKey.name == "$saleTransactionId"
        secondTriggerKey.group == "${tomorrow + 2}"
        JobDataMap secondJobDataMap = secondTrigger.jobDataMap
        secondJobDataMap.getString("saleTransactionProductIds") == "$saleTransactionProductIds2"
        secondJobDataMap.getString("emailAddress") == "$email"
        secondTrigger.startTime == tomorrow + 2
    }

    @Unroll
    void "test computeRecyclingDate - returns null"() {
        when:
        def recyclingDate = service.computeRecyclingDate(items)

        then:
        recyclingDate == null

        where:
        items << [null, [], [:], [[renterMarketId : null]]]
    }

    void "test computerRecyclingDate - returns first recycling date"() {
        given:
        def items = [
                [
                        rentalMarketId: null
                ],
                [
                        renterMarketId: 1,
                        rentalDueDates: [
                                'Quarter': "01/01/2020",
                                'Semester': "05/01/2020"
                        ],
                        rentalTerm: 'Quarter'
                ],
                [
                        renterMarketId: 2,
                        rentalDueDates: [
                                'Quarter': "01/01/2020",
                                'Semester': "05/01/2020"
                        ],
                        rentalTerm: 'Semester'
                ]
        ]

        when:
        def recyclingDate = service.computeRecyclingDate(items)

        then:
        recyclingDate == "02/20/2020"
    }

    private static void assertTriggerStartTime(Date expected, Date actual) {
        assert actual.time <= (expected.time + 1000)
    }
}
