package com.valore

import grails.transaction.Transactional

import java.text.SimpleDateFormat

@Transactional
class CardUpdateService {
    private static final int NUM_DAYS_AFTER_RENTAL_DUE_RECYCLING_ENDS = 50

    Date getCutoffExpirationDateForExtension(transaction) {
        Date cutoffDate = null
        SimpleDateFormat jsonSDF = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'")
        List rentals = transaction.saleTransactionProducts.saleTransactionProductRental

        rentals.removeAll([null])
        rentals.each { rental ->
            Date originalReturnByDate = jsonSDF.parse("$rental.originalReturnByDate") +
                    NUM_DAYS_AFTER_RENTAL_DUE_RECYCLING_ENDS
            if (cutoffDate == null || originalReturnByDate < cutoffDate) {
                cutoffDate = originalReturnByDate
            }
        }

        cutoffDate
    }
}
