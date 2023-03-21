package com.valore

import com.valore.util.ApiUtil
import com.valore.util.ProductUrlUtil
import grails.core.GrailsApplication
import grails.transaction.Transactional

@Transactional
class SeoService {

    GrailsApplication grailsApplication

    Map dbData(String isbn) {
        def data = ApiUtil.get(path: 'productDetails', id: isbn)
        if (!data) {
            return [:]
        }

        String title = "${data.name}" + (data.edition? " ${appendOrdinal(data.edition)} Edition": "") + " | Rent ${data.productCode}" + (data.isbn10? " | ${data.isbn10}": "")
        String domain = grailsApplication.config.valore.legacyUrl
        String productUrl = "${domain}${ProductUrlUtil.generateURL(data.name, data.edition, data.productCode)}"

        Map best = bestListing(isbn)

        [
                title: title,
                description: data.description?: data.name,
                product: [
                        id: data.id,
                        name: data.name,
                        author: data.author,
                        description: data.description,
                        edition: data.edition,
                        image: data.image,
                        productCode: data.productCode,
                        price: best.price,
                        quantity: best.quantity,
                        type: best.type,
                        url: productUrl
                ],
                meta: [
                        [property: "og:image", content: data.image],
                        [property: "og:title", content: title],
                        [property: "og:description", content: data.description?: name],
                        [property: "og:type", content: "Book"],
                        [property: "og:url", content: productUrl]
                ]
        ]
    }

    Map bestListing(String isbn)  {
        def best = ApiUtil.get(path: 'saleListing/best', id: isbn) ?: [:]

        def lowestPrice = best['rental']?.best?.price?.semester
        def lowestType = 'rental'

        for (def type : best.keySet()) {
            if (type == 'recommended') continue;
            if (!lowestPrice || (type != 'rental' && (lowestPrice as Double) > (best[type].best.price.sale as Double))) {
                lowestPrice = best[type].best.price.sale
                lowestType = type
            }
        }

        [price: lowestPrice?: 0, quantity: best[lowestType]?.totalQuantity?: 0, type: lowestType]

    }

    def static appendOrdinal(def val) {
        if (!val.isNumber() || "$val".contains('.')) {
            return val
        }

        def num = val as long
        def hundredRemainder = num % 100
        def tenRemainder = num % 10

        if (hundredRemainder - tenRemainder == 10) {
            return val + "th"
        }

        switch (tenRemainder) {
            case 1:
                return val + "st"
                break
            case 2:
                return val + "nd"
                break
            case 3:
                return val + "rd"
                break
            default:
                return val + "th"
        }
    }
}
