<%@ page import="grails.util.Environment" %>
<div class="card-info col-xs-12 no-pad">
    <div class="col-md-8 no-pad">
        <div class="col-xs-12 no-pad">
            <div class="col-md-7 no-pad">

                <ul class="pull-right cards hidden-md hidden-lg">
                    <li class="pull-left">
                        <img alt="Master Card" src="https://images.valorebooks.com/images/vb/web/shippingInfo/masterCard.jpg" />
                    </li>
                    <li class="pull-left">
                        <img alt="Visa" src="https://images.valorebooks.com/images/vb/web/shippingInfo/visa.jpg" />
                    </li>
                    <li class="pull-left">
                        <img alt="Discover" src="https://images.valorebooks.com/images/vb/web/shippingInfo/discover.jpg" />
                    </li>
                    <li class="pull-left">
                        <img alt="American Express" src="https://images.valorebooks.com/images/vb/web/shippingInfo/americanExpress.jpg" />
                    </li>
                </ul>

                <label class="pull-left">Card number</label>
                <div class="input-container">
                    <input class="required" numeric-only ng-class="{'error-field' : (!required.ccNum && attempts > 0) || ccError}" type="text" id="ccNum" name="ccNum" ng-model="required.ccNum" tabindex="21"  ng-required="attempts > 0" ng-change="ccFieldChange()" ng-blur="ccFieldBlur()" <g:if test="${(Environment.current != Environment.PRODUCTION)}">ng-init="required.ccNum='4457119922390123'"</g:if>>
                    <span ng-show="!required.ccNum && attempts > 0 || ccError" ng-cloak>
                        <span class="glyphicon glyphicon-exclamation-sign error-field-icon cc-num orange"></span>
                    </span>
                </div>
            </div>
            <div class="col-xs-7 col-md-5 no-pad-xs no-pad-sm no-pad-right">
                <label>Expiration date</label>
                <div class="col-xs-6 no-pad-md no-pad-left-xs no-pad-left-sm">
                    <div class="gray-select year-select ng-cloak"
                         ng-class="{'error-field' : (((!required.response$expMonth || !isValidCreditCardExpiration()) && attempts > 0) || ccError) && !expMonthFocus,
                                    'dropdownHighlight' : expMonthFocus}">
                        <select class="required"
                                id="response$expMonth"
                                name="response$expMonth"
                                ng-model="required.response$expMonth"
                                tabindex="22"
                                ng-required="attempts > 0"
                                ng-change="validateCreditCardExpiration()"
                                ng-blur="expMonthFocus = false; ccFieldBlur();"
                                ng-focus="expMonthFocus = true"
                                <g:if test="${(Environment.current != Environment.PRODUCTION)}">ng-init="required.response$expMonth='${new Date()[Calendar.MONTH] + 1}'"</g:if>>
                            <g:each in="${(1..12)}" var="i">
                                <option value="${i}">${i}</option>
                            </g:each>
                        </select>
                    </div>
                    <span class="slash hidden-xs hidden-sm">/</span>
                </div>
                <div class="col-xs-6 no-pad">
                    <div class="gray-select pull-right-md ng-cloak"
                         ng-class="{'error-field' : (((!required.response$expYear || !isValidCreditCardExpiration()) && attempts > 0) || ccError) && !expYearFocus,
                                    'dropdownHighlight' : expYearFocus}">
                        <select class="pull-right-md required || ccError"
                                id="response$expYear"
                                name="response$expYear"
                                ng-model="required.response$expYear"
                                tabindex="23"
                                ng-required="attempts > 0"
                                ng-change="validateCreditCardExpiration()"
                                ng-blur="expYearFocus = false; ccFieldBlur();"
                                ng-focus="expYearFocus = true"
                                <g:if test="${(Environment.current != Environment.PRODUCTION)}">ng-init="required.response$expYear='${new Date()[Calendar.YEAR]}'"</g:if>>
                            <g:set var="curYear" value="${new Date()[Calendar.YEAR]}"/>
                            <g:each in="${(0..20)}" var="i">
                                <option value="${curYear + i}">${curYear + i}</option>
                            </g:each>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-xs-5 col-md-3 col-lg-3 no-pad-right cvv2Num">
                <label>Security code</label>
                <div class="input-container">
                    <input class="required" numeric-only ng-class="{'error-field' : (!required.cvv2Num && attempts > 0) || ccError}" type="text" id="cvv2Num" name="cvv2Num" ng-model="required.cvv2Num" tabindex="26"  ng-required="attempts > 0" ng-change="ccFieldChange()" ng-blur="ccFieldBlur()" <g:if test="${(Environment.current != Environment.PRODUCTION)}">ng-init="required.cvv2Num='123'"</g:if>>
                    <span ng-show="!required.cvv2Num && attempts > 0 || ccError" ng-cloak>
                        <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                    </span>
                </div>
            </div>
        </div>

        <div class="col-xs-12 no-pad">
            <div class="col-md-9 no-pad">
                <label class="hidden-xs hidden-sm">Name (as it appears on card)</label>
                <div class="col-xs-6 no-pad-left">
                    <label class="hidden-md hidden-lg">First name</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : (!required.fName && attempts > 0) || ccError}" type="text" id="fName" name="fName" ng-model="required.fName" tabindex="24" placeholder="First"  ng-required="attempts > 0" ng-change="ccFieldChange()" ng-blur="ccFieldBlur()" <g:if test="${(Environment.current != Environment.PRODUCTION)}">ng-init="required.fName='Victor'"</g:if>>
                        <span ng-show="!required.fName && attempts > 0 || ccError" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                        </span>
                    </div>
                </div>

                <div class="col-xs-6 no-pad-left no-pad-xs no-pad-sm">
                    <label class="hidden-md hidden-lg">Last name</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : (!required.lName && attempts > 0) || ccError}" type="text" id="lName" name="lName" tabindex="25" ng-model="required.lName" placeholder="Last"  ng-required="attempts > 0" ng-change="ccFieldChange()" ng-blur="ccFieldBlur()" <g:if test="${(Environment.current != Environment.PRODUCTION)}">ng-init="required.lName='Valore'"</g:if>>
                        <span ng-show="!required.lName && attempts > 0 || ccError" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4 no-pad-right">
        <ul class="pull-right cards hidden-xs hidden-sm">
            <li class="pull-left">
                <img alt="Discover" src="https://images.valorebooks.com/images/vb/web/shippingInfo/discover.jpg" />
            </li>
            <li class="pull-left">
                <img alt="American Express" src="https://images.valorebooks.com/images/vb/web/shippingInfo/americanExpress.jpg" />
            </li>
            <li class="pull-left">
                <img alt="Master Card" src="https://images.valorebooks.com/images/vb/web/shippingInfo/masterCard.jpg" />
            </li>
            <li class="pull-left">
                <img alt="Visa" src="https://images.valorebooks.com/images/vb/web/shippingInfo/visa.jpg" />
            </li>
        </ul>
    </div>
</div>
