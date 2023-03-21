package com.valore

import com.valore.util.ISBNUtil
import grails.converters.JSON
import org.apache.http.HttpStatus

class SeoController {

    SeoService seoService

    def index() {
        String isbn = params.get("isbn").toString()
        if (!ISBNUtil.validateISBN(isbn)) {
            render status: HttpStatus.SC_BAD_REQUEST, text: "ISBN param is required"
            return
        }

        // pull data from s3

        // if s3 data doesn't exist
        Map data = seoService.dbData(isbn)

        if (!data) {
            render status: HttpStatus.SC_NOT_FOUND, text: "Product not found for ISBN $isbn"
            return
        }

        render view: "index", model: [data: data]
    }

    def edit() {
        String isbn = params.get("isbn").toString()
        if (!ISBNUtil.validateISBN(isbn)) {
            render status: HttpStatus.SC_BAD_REQUEST, text: "ISBN param is required"
            return
        }

        // pull data from s3

        // if s3 data doesn't exist
        Map data = seoService.dbData(isbn)

        if (!data) {
            render status: HttpStatus.SC_NOT_FOUND, text: "Product not found for ISBN $isbn"
            return
        }

        render view: "edit", model: [initialData: data as JSON]
    }

    def save() {
        Map json = request.JSON as Map
        if (!json) {
            render status: HttpStatus.SC_BAD_REQUEST
            return
        }

        // save json to s3

        render status: HttpStatus.SC_OK
    }

}
