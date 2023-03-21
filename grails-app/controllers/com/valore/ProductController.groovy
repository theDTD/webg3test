package com.valore

import com.valore.analytics.TrackingService
import com.valore.util.ApiUtil
import com.valore.util.ISBNUtil
import grails.converters.JSON
import org.apache.http.HttpStatus

class ProductController {

    TrackingService trackingService
    SeoService seoService

    def static isbnPattern = ~/^(\w+)(.*)$/

    def index() { }

    /**
     * Product Details page
     */
    def details() {
        trackingService.enhancedEcommerceViewEvent(1)

        def match = params.id =~ isbnPattern

        def isbn
        if (match && match.groupCount() > 0 && ISBNUtil.validateISBN(match.group(1))) {
            isbn = match.group(1)
        } else {
            redirect uri: "/Search.ISBNResults.do?old=yes&isbn=${params.id}", base: grailsApplication.config.valore.legacyUrl
            return
        }

        def product = ApiUtil.get(path: 'productDetails', id: isbn)
        if (!product) {
            redirect uri: "/Search.ISBNResults.do?old=yes&isbn=${params.id}", base: grailsApplication.config.valore.legacyUrl
            return
        }
        if (product.blacklisted) {
            redirect uri: "/", status: HttpStatus.SC_MOVED_TEMPORARILY
            return
        }

        def best = ApiUtil.get(path: 'saleListing/best', id: isbn) ?: [:]

//        trackingService.pageView( request, params )
        trackingService.enhancedEcommerceCompletionEvent(1)


        String pageTitle = "${product.name}" + (product.edition? " ${seoService.appendOrdinal(product.edition)} Edition": "") + " | Rent ${product.productCode}" + (product.isbn10? " | ${product.isbn10}": "")
        render (view:'/product/details', model: [product: product, best: best, pageTitle: pageTitle])

    }

    def listingsSummary() {
        render ApiUtil.get(path: 'saleListing/summary', id: params.id) as JSON
    }

    def listings() {
        def query = [:]
        if (params.offset)
            query['offset'] = params.offset
        if (params.max)
            query['max'] = params.max
        if (params.type)
            query['type'] = params.type

        try {
            def response = ApiUtil.get(path: 'saleListing/inventory', id: params.id, query: query) ?: []
            render response as JSON
        } catch (URISyntaxException ignore) {
            render status: HttpStatus.SC_BAD_REQUEST, text: "Invalid request"
        }
    }

    def reviews() {
        def query = [:]
        if (params.max)
            query['max'] = params.max
        if (params.id)
            query['productId'] = params.id

        def response = ApiUtil.get(path: 'productReview', query: query) ?: []
        render response as JSON
    }
}
