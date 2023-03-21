package com.valore.checkout

import com.valore.sale.rental.PostRentalExtensionFeeReminderJob
import com.valore.sale.rental.PostRentalJob
import com.valore.sale.rental.PostRentalReminderJob
import com.valore.util.ApiUtil
import grails.transaction.Transactional
import org.quartz.Trigger
import org.quartz.TriggerBuilder
import org.quartz.TriggerKey

import java.text.SimpleDateFormat

@Transactional
class CheckoutService {
    def grailsApplication
    def UUIDService
    def cookieService
    def segmentIOService

    private static final NUM_DAYS_AFTER_RENTAL_DUE_RECYCLING_ENDS = 50

    def computeRecyclingDate(def items) {
        def dueDates = []
        def sdf = new SimpleDateFormat("MM/dd/yyyy")

        items?.each { item ->
            if (item.renterMarketId) {
                dueDates.add(sdf.parse("${item.rentalDueDates[item.rentalTerm]}"))
            }
        }

        return dueDates ? sdf.format(dueDates.sort().first() + NUM_DAYS_AFTER_RENTAL_DUE_RECYCLING_ENDS) : null
    }

    def searchConsumer(def email) {
        def resp = ApiUtil.post path: "/consumer/search", json: [email: email]
        resp ? (resp as List).first() : [:]
    }

    // looks up the user by email address by their email via UUID service
    // If the user is found, they are cookied with their UUID,
    // otherwise they are given a new UUID for that email address.
    def identifyConsumer(String email) {
        String uuid = UUIDService.getUUID( email )

        // make sure there is no existing UUID for this email
        if( uuid == null ) {
            // if not, anon ID will become the new UUID
            uuid = cookieService.getCookie(grailsApplication.config.valore.cookie.anon_id)

            // edge case, sanity check that cookie value is a number
            if( !uuid.isNumber() ){
                cookieService.deleteCookie(grailsApplication.config.valore.cookie.anon_id)
                return
            }

            String existingEntry = UUIDService.getEmail( uuid )

            // make sure there is no existing email for this UUID
            if( existingEntry == null ){
                UUIDService.put( email, uuid )
                segmentIOService.alias( uuid, uuid )
            } else {
                // if there IS an existing entry for this UUID from the anon cookie, see if it's correct
                if ( existingEntry == email ){
                    // it's correct, so we'll use it, but delete the anon_id cookie
                    cookieService.deleteCookie(grailsApplication.config.valore.cookie.anon_id)
                } else {
                    // somehow we ended up with a different, existing consumers UUID in our anonId cookie... let's give them a fresh one
                    uuid = String.valueOf(uuidHash(UUID.randomUUID()))
                    UUIDService.put( email, uuid )
                }
            }
        }

        cookieService.setCookie(grailsApplication.config.valore.cookie.user_id, uuid, Integer.MAX_VALUE, null, null, null, false)
    }

    def schedulePostRentalEvents(Long saleTransactionId, Map rentalProducts, String email) {
        Map<Date, List> rentalSchedule = [:]

        rentalProducts.each {
            def dueDate = Date.parse("yyyy-MM-dd'T'HH:mm:ss'Z'", "$it.value")
            def saleTransactionProductId = it.key as Long

            dueDate.clearTime()
            if(rentalSchedule[dueDate]) {
                rentalSchedule[dueDate].add(saleTransactionProductId)
            } else {
                rentalSchedule[dueDate] = [saleTransactionProductId]
            }
        }

        schedulePostRentalReminders(saleTransactionId, rentalSchedule, email)
        schedulePostRentalExtensionAndBuyout(rentalSchedule, email)
        schedulePostRentalExtensionFeeReminders(rentalSchedule, email)
    }

    def schedulePostRentalExtensionAndBuyout(Map<Date, List> rentalReminderSchedule, String email) {
        rentalReminderSchedule.each { dueDate, saleTransactionProductIds ->
            ["AUTO_EXTEND": 5, "AUTO_BUYOUT": 20].each { action, days ->
                def triggerDate = calculateEmailTriggerDateFromDay(dueDate, days)   // stagger the triggers down to the ms
                Trigger trigger =
                        TriggerBuilder.newTrigger()
                                .withIdentity(new TriggerKey("${saleTransactionProductIds.first()}", action))
                                .usingJobData("saleTransactionProductIds", "$saleTransactionProductIds")
                                .usingJobData("action", action)
                                .usingJobData("recipientEmail", email)
                                .startAt(triggerDate)
                                .build()

                PostRentalJob.schedule(trigger)
            }
        }
    }

    def schedulePostRentalReminders(Long saleTransactionId, Map<Date, List> rentalReminderSchedule, String email) {
        rentalReminderSchedule.each { dueDate, saleTransactionProductIds ->
            def triggerDate = calculateEmailTriggerDateFromDay(dueDate, 2)  // stagger the triggers down to the ms
            Trigger trigger =
                TriggerBuilder.newTrigger()
                .withIdentity(new TriggerKey("$saleTransactionId", "$triggerDate"))
                .usingJobData("saleTransactionProductIds", "$saleTransactionProductIds")
                .usingJobData("emailAddress", "$email")
                .startAt(triggerDate)
                .build()

            PostRentalReminderJob.schedule(trigger)
        }
    }

    def schedulePostRentalExtensionFeeReminders(Map<Date, List> rentalReminderSchedule, String email) {
        rentalReminderSchedule.each { dueDate, saleTransactionProductIds ->
            [10, 15, 18].each { days ->
                def triggerDate = calculateEmailTriggerDateFromDay(dueDate, days)
                Trigger trigger =
                        TriggerBuilder.newTrigger()
                                .withIdentity(new TriggerKey("${saleTransactionProductIds.first()}",
                                "${PostRentalExtensionFeeReminderJob.simpleName}$days"))
                                .usingJobData("saleTransactionProductIds", "$saleTransactionProductIds")
                                .usingJobData("recipientEmail", email)
                                .startAt(triggerDate)
                                .build()

                PostRentalExtensionFeeReminderJob.schedule(trigger)
            }
        }
    }

    /**
     * Sets the time of day to the current time of day, assuming that day's time is 00:00:00.000. Then, sets the day to
     * two days later for the reminder e-mail since the job should be triggered two days after the due date.
     *
     * @param day   The beginning of the (due) day to calculate the reminder trigger date with.
     * @param numDays   The number of days after due date to set the trigger date
     * @return  The date and time when the reminder e-mail job should be triggered.
     */
    private static Date calculateEmailTriggerDateFromDay(Date day, Integer numDays) {
        def cal = Calendar.getInstance()
        day.set(hourOfDay: cal.get(Calendar.HOUR_OF_DAY),
                minute: cal.get(Calendar.MINUTE),
                second: cal.get(Calendar.SECOND))
        day.time = day.time + cal.get(Calendar.MILLISECOND)
        day + numDays
    }

    private long uuidHash(UUID uuid) {
        long hash
        long mostSig = uuid.mostSignificantBits
        long leastSig = uuid.leastSignificantBits

        hash = (mostSig >> 32 ^ mostSig ^ leastSig >> 32 ^ leastSig) >> 32

        hash
    }

}
