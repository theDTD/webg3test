package com.valore

import com.valore.util.ApiUtil
import grails.test.mixin.TestFor
import grails.util.Environment
import groovy.mock.interceptor.MockFor
import org.apache.http.HttpStatus
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(RentTextbooksController)
class RentTextbooksControllerSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test index --ok"() {
        given:
        def apiUtil = new MockFor(ApiUtil)
        def json = [
                [
                        title: "Criminal Justice Today (10th Edition) (MyCrimeKit Series) (Hardcover)",
                        product_link: "/textbooks/criminal-justice-today-10th-edition-mycrimekit-series-hardcover-10th-edition/9780135130308",
                        contributor: "Schmalleger, Frank",
                        img_link: "https://img.valorebooks.com/W120/97/9780/978013/9780135130308.jpg",
                        list_price: 139.20,
                        rent_value: 15.00,
                        savings: "124.20 (89%)"
                ]
        ]

        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 2
                assert args.path == 'product/listPopularRentalProducts'
                [json, HttpStatus.SC_OK]
            }
        }

        when:
        apiUtil.use {
            controller.index()
        }

        then:
        response.status == HttpStatus.SC_OK
        controller.modelAndView.viewName == "/rentTextbooks/index"
        controller.modelAndView.model.size() == 1
        controller.modelAndView.model.popularRentalProducts == json
    }

    void "test index --not ok"() {
        given:
        def apiUtil = new MockFor(ApiUtil)

        apiUtil.demand.with {
            get(1) { def args ->
                assert args.size() == 2
                assert args.path == 'product/listPopularRentalProducts'
                [null, HttpStatus.SC_NOT_FOUND]
            }
        }

        when:
        apiUtil.use {
            controller.index()
        }

        then:
        controller.modelAndView.viewName == "/rentTextbooks/index"
        controller.modelAndView.model.size() == 1
        controller.modelAndView.model.popularRentalProducts == null
    }

    void "test redirect on production"() {
        given:
        RentTextbooksController rentTextbooksControllerSpy = Spy(RentTextbooksController)

        Environment.metaClass.static.getCurrent = {
            Environment.PRODUCTION
        }

        when:
        rentTextbooksControllerSpy.index()

        then:
        response.redirectUrl == "/"

        cleanup:
        GroovySystem.metaClassRegistry.removeMetaClass(Environment)

    }
}