package com.valore

import grails.test.mixin.TestFor
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.GroovyPageUnitTestMixin} for usage instructions
 */
@TestFor(WebTagLib)
class WebTagLibSpec extends Specification {

    def setup() {
    }

    def cleanup() {
    }

    void "test moneyFormat"() {
        expect:
        assertOutputEquals('', '<vb:moneyFormat/>')
        assertOutputEquals('', '<vb:moneyFormat value="nan"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>12<span>.34</span></span>', '<vb:moneyFormat value="1234"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>1<span>.00</span></span>', '<vb:moneyFormat value="100"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>0<span>.99</span></span>', '<vb:moneyFormat value="99"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>0<span>.01</span></span>', '<vb:moneyFormat value="1"/>')
        assertOutputEquals('<span class="moneyformat gray-light"><span>$</span>0<span>.00</span></span>', '<vb:moneyFormat value="0"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>12<span>.34</span></span>', '<vb:moneyFormat class="pull-right" value="1234"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>1<span>.00</span></span>', '<vb:moneyFormat class="pull-right" value="100"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>0<span>.99</span></span>', '<vb:moneyFormat class="pull-right" value="99"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>0<span>.01</span></span>', '<vb:moneyFormat class="pull-right" value="1"/>')
        assertOutputEquals('<span class="pull-right moneyformat gray-light"><span>$</span>0<span>.00</span></span>', '<vb:moneyFormat class="pull-right" value="0"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>12<span>.34</span></span>', '<vb:moneyFormat value="\\$12.34"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>1<span>.00</span></span>', '<vb:moneyFormat value="\\$1.00"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>0<span>.99</span></span>', '<vb:moneyFormat value="\\$0.99"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>0<span>.01</span></span>', '<vb:moneyFormat value="\\$0.01"/>')
        assertOutputEquals('<span class="moneyformat gray-light"><span>$</span>0<span>.00</span></span>', '<vb:moneyFormat value="\\$0.00"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>12<span>.34</span></span>', '<vb:moneyFormat class="pull-right" value="\\$12.34"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>1<span>.00</span></span>', '<vb:moneyFormat class="pull-right" value="\\$1.00"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>0<span>.99</span></span>', '<vb:moneyFormat class="pull-right" value="\\$0.99"/>')
        assertOutputEquals('<span class="pull-right moneyformat"><span>$</span>0<span>.01</span></span>', '<vb:moneyFormat class="pull-right" value="\\$0.01"/>')
        assertOutputEquals('<span class="pull-right moneyformat gray-light"><span>$</span>0<span>.00</span></span>', '<vb:moneyFormat class="pull-right" value="\\$0.00"/>')
        assertOutputEquals('<span class="gray-light moneyformat"><span>$</span>12<span>.34</span></span>', '<vb:moneyFormat class="gray-light" value="1234"/>')
        assertOutputEquals('<span class="gray-light moneyformat"><span>$</span>1<span>.00</span></span>', '<vb:moneyFormat class="gray-light" value="100"/>')
        assertOutputEquals('<span class="gray-light moneyformat"><span>$</span>0<span>.99</span></span>', '<vb:moneyFormat class="gray-light" value="99"/>')
        assertOutputEquals('<span class="gray-light moneyformat"><span>$</span>0<span>.01</span></span>', '<vb:moneyFormat class="gray-light" value="1"/>')
        assertOutputEquals('<span class="gray-light moneyformat"><span>$</span>0<span>.00</span></span>', '<vb:moneyFormat class="gray-light" value="0"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>5<span>.00</span></span>', '<vb:moneyFormat value="5.0"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>5<span>.56</span></span>', '<vb:moneyFormat value="5.567"/>')
        assertOutputEquals('<span class="moneyformat"><span>$</span>5<span>.12</span></span>', '<vb:moneyFormat value="5.123"/>')
    }
}
