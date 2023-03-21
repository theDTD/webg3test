package com.valore.legacy

import com.valore.util.ApiUtil
import com.valore.util.ISBNUtil
import grails.converters.JSON
import org.apache.http.HttpStatus

class ProductSearchController {

    def search() {

        String query = ISBNUtil.validateISBN("$params.query".trim(), true)?: params.query

        def (json, status) = ApiUtil.get(
                domain: "${grailsApplication.config.valore.legacyUrl}",
                path: "Search.SearchSuggest.do",
                query: [query: query, department: "All+Departments"],
                includeStatus: true
        )

        if (status != HttpStatus.SC_OK) {
            render status: HttpStatus.SC_NOT_FOUND, text: "An error occurred while retrieving search results for ${params.query}"
        } else {
            render json as JSON
        }

    }

}
