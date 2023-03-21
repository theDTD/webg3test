<%@ page import="grails.util.Environment; com.valore.util.StateUtil" %>
<form method=post id="fCheckoutContact" name="fCheckoutContact">
    <div class="contact-info box clearfix">
        <div class="headerBanner">
            <h3 class="font-size-large">Contact information</h3>
        </div>

        <div class="col-xs-12">
            <h4 class="font-size-large newBrandPurple">Shipping address</h4>

            <div class="col-xs-12 no-pad">
                <div class="col-xs-6 col-md-3 no-pad-left">
                    <label>First name</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : (!consumer.firstName && attempts > 0)}" type="text" name="fname" tabindex="1" ng-model="consumer.firstName" ng-required="attempts > 0" >
                        <span ng-show="!consumer.firstName && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange short"></span>
                        </span>
                    </div>
                </div>

                <div class="col-xs-6 col-md-3 no-pad">
                    <label>Last name</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : (!consumer.lastName && attempts > 0)}" type="text" name="lname" tabindex="2" ng-model="consumer.lastName" ng-required="attempts > 0" >
                        <span ng-show="!consumer.lastName && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 no-pad">
                <div class="col-md-8 no-pad">
                    <label>Address</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : (!consumer.defaultShipping.line1 && attempts > 0)}" type="text" name="address1" tabindex="3" ng-model="consumer.defaultShipping.line1" ng-required="attempts > 0" >
                        <span ng-show="!consumer.defaultShipping.line1 && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 no-pad">
                <div class="col-md-6 no-pad">
                    <label>Apt/Suite/Box <span class="italic">(optional)</span></label>
                    <input type="text" name="address2" tabindex="4" ng-model="consumer.defaultShipping.line2">
                </div>
            </div>

            <div class="col-xs-12 no-pad">
                <div class="col-md-6 no-pad">
                    <label>City</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : (!consumer.defaultShipping.city && attempts > 0)}" type="text" name="city" tabindex="5" ng-model="consumer.defaultShipping.city" ng-required="attempts > 0" >
                        <span ng-show="!consumer.defaultShipping.city && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 no-pad">
                <div class="col-md-2 col-xs-5 no-pad-left">
                    <label>Zip code</label>
                    <div class="input-container">
                        <input class="required zipCode" numeric-only ng-change="updateTaxes()" ng-class="{'error-field' : ((!consumer.defaultShipping.postalCode || consumer.defaultShipping.postalCode.length != 5 || !doesContactZipCodeExist) && attempts > 0)}" type="text" maxlength="5" name="zipcodecontact" tabindex="6" ng-model="consumer.defaultShipping.postalCode" ng-required="attempts > 0" >
                        <span ng-show="(!consumer.defaultShipping.postalCode || consumer.defaultShipping.postalCode.length != 5 || !doesContactZipCodeExist) && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange short"></span>
                        </span>
                    </div>
                </div>
                <div class="col-xs-7 col-md-4 no-pad">
                    <label>State</label>
                    <div id="contactStateSelect" class="gray-select"
                         ng-class="{'error-field' : (!consumer.defaultShipping.state && attempts > 0 && !shippingStateFocus),
                                    'dropdownHighlight' : shippingStateFocus}">
                        <select name="state"
                                ng-blur="shippingStateFocus = false"
                                ng-focus="shippingStateFocus = true"
                                class="required"
                                tabindex="7"
                                ng-model="consumer.defaultShipping.state"
                                ng-required="attempts > 0">
                            <option value="" ng-if="!isFreeForm"></option>
                            <g:each var="states" in="${[StateUtil.standard, StateUtil.territories, StateUtil.military]}">
                                <g:each var="state" in="${states}">
                                    <option value="${state.key}">${state.value}</option>
                                </g:each>
                            </g:each>
                        </select>
                        <span ng-show="!isFreeForm && !consumer.defaultShipping.state && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange short"></span>
                        </span>
                    </div>
                </div>
            </div>

            <g:if test="${cartContainsRental}">
                <div class="col-xs-12 no-pad">
                    <div class="col-md-8 no-pad">
                        <label>Phone number</label>
                        <div class="input-container">
                            1-<input class="required" ng-class="{'error-field' : (!consumer.phone && attempts > 0)}" type="tel" name="phone" ng-pattern="/^[2-9]\d{2}-?\d{3}-?\d{4}$/" tabindex="8" ng-model="consumer.phone" placeholder="xxx-xxx-xxxx" ng-required="attempts > 0">
                            <span ng-show="(!consumer.phone) && attempts > 0" ng-cloak>
                                <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange phone"></span>
                            </span>
                        </div>
                    </div>
                </div>
            </g:if>

            <div class="col-xs-12 no-pad">
                <div class="col-md-8 no-pad">
                    <label>Email address</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : ((!consumer.email) && attempts > 0)}" type="email" name="email" ng-pattern="/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/" tabindex="9" ng-model="consumer.email" ng-required="attempts > 0" >
                        <span ng-show="(!consumer.email) && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-xs-12 no-pad">
                <div class="col-md-8 no-pad">
                    <label>Confirm email address</label>
                    <div class="input-container">
                        <input class="required" ng-class="{'error-field' : ((!required.emailConf || required.emailConf != consumer.email) && attempts > 0)}" type="email" name="emailConf" tabindex="10" <g:if test="${!(Environment.current != Environment.PRODUCTION)}">onpaste="return false"</g:if> ng-model="required.emailConf" ng-required="attempts > 0" >
                        <span ng-show="(!required.emailConf || required.emailConf != consumer.email) && attempts > 0" ng-cloak>
                            <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                        </span>
                    </div>
                </div>
            </div>

            <p><input type="checkbox" class="checkbox" name="offer" tabindex="11" value="offer" ng-model="consumer.emailOptIn" ng-init="consumer.emailOptIn=true" > Send me exclusive offers, updates, and more</p>

            <p class="hidden-xs hidden-sm">Are you currently attending a college or university?  <span class="italic">(optional)</span></p>
            <p class="hidden-md hidden-lg">Do you attend a college or university? <span class="italic">(optional)</span></p>

            <div class="col-xs-12 no-pad">
                <div class="col-md-5 col-xs-12 no-pad">
                    <input type="text" placeholder="College or University name" name="collegeName" tabindex="12" ng-model="consumer.school">
                </div>
                <div class="col-md-3 col-sm-4 col-xs-4 no-pad-right no-pad-left-sm no-pad-left-xs grad-year">
                    <div class="gray-select"
                         ng-class="{'dropdownHighlight' : gradYearFocus}">
                        <select ng-model="consumer.graduationYear"
                                ng-blur="gradYearFocus = false"
                                ng-focus="gradYearFocus = true"
                                tabindex="13"
                                onchange="changeColor(this)">
                            <option value="">Grad year</option>
                            <g:set var="curYear" value="${new Date()[Calendar.YEAR]}"/>
                            <g:each in="${(0..5)}" var="i">
                                <option value="${curYear + i}">${curYear + i}</option>
                            </g:each>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
