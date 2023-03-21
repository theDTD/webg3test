package com.valore.mobile

import com.valore.util.ApiUtil
import grails.converters.JSON
import org.apache.http.HttpStatus

class DataController {

    def product() {

        def productDetails = ApiUtil.get(path: 'productDetails', id: params.id)

        def bestPrice = ApiUtil.get(path: 'buybackListing/best', id: params.id)

        if(!productDetails || !bestPrice?.price) {
            render status: HttpStatus.SC_BAD_REQUEST
        } else {
            productDetails = productDetails.subMap(['name', 'image', 'author', 'productCode', 'isbn10']).findAll{ it.value }
            List<String> authors = productDetails.author ?: []
            productDetails.author = (authors.size() > 0) ? "by " + authors.join(', ').replace('"', '') : ""
            productDetails.price = (bestPrice.price / 100)
            render(productDetails as JSON)
        }
    }

}
