<%@ page import="com.valore.util.StateUtil" %>
<div>
    <div class="col-xs-12 no-pad">
        <div class="col-xs-6 no-pad-left<g:if test="${fullFieldWidth}">"</g:if><g:else> col-md-3"</g:else>>
            <label>First name</label>
            <div class="input-container">
                <input ng-class="{'error-field' : (!consumer.defaultBilling.firstName && attempts > 0),
                                  'required' : !consumer.useOneAddress}"
                       type="text"
                       name="fname"
                       tabindex="14"
                       ng-model="consumer.defaultBilling.firstName"
                       ng-required="attempts > 0 && !consumer.useOneAddress"
                       ng-disabled="consumer.useOneAddress">
                <span ng-show="!consumer.defaultBilling.firstName && attempts > 0" ng-cloak>
                    <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                </span>
            </div>
        </div>

        <div class="col-xs-6 no-pad<g:if test="${fullFieldWidth}">"</g:if><g:else> col-md-3"</g:else>>
            <label>Last name</label>
            <div class="input-container">
                <input ng-class="{'error-field' : (!consumer.defaultBilling.lastName && attempts > 0),
                                  'required' : !consumer.useOneAddress}"
                       type="text"
                       name="lname"
                       tabindex="15"
                       ng-model="consumer.defaultBilling.lastName"
                       ng-required="attempts > 0 && !consumer.useOneAddress"
                       ng-disabled="consumer.useOneAddress">
                <span ng-show="!consumer.defaultBilling.lastName && attempts > 0" ng-cloak>
                    <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                </span>
            </div>
        </div>
    </div>

    <div class="col-xs-12 no-pad">
        <div class="no-pad<g:if test="${fullFieldWidth}">"</g:if><g:else> col-md-8"</g:else>>
            <label>Address</label>
            <div class="input-container">
                <input ng-class="{'error-field' : (!consumer.defaultBilling.line1 && attempts > 0),
                                  'required' : !consumer.useOneAddress}"
                       type="text"
                       name="address1"
                       tabindex="16"
                       ng-model="consumer.defaultBilling.line1"
                       ng-required="attempts > 0 && !consumer.useOneAddress"
                       ng-disabled="consumer.useOneAddress">
                <span ng-show="!consumer.defaultBilling.line1 && attempts > 0" ng-cloak>
                    <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                </span>
            </div>
        </div>
    </div>

    <div class="col-xs-12 no-pad">
        <div class="no-pad<g:if test="${fullFieldWidth}">"</g:if><g:else> col-md-6"</g:else>>
            <label>Apt/Suite/Box <span class="italic">(optional)</span></label>
            <input type="text"
                   name="address2"
                   tabindex="17"
                   ng-model="consumer.defaultBilling.line2"
                   ng-disabled="consumer.useOneAddress">
        </div>
    </div>

    <div class="col-xs-12 no-pad">
        <div class="no-pad<g:if test="${fullFieldWidth}">"</g:if><g:else> col-md-6"</g:else>>
            <label>City</label>
            <div class="input-container">
                <input ng-class="{'error-field' : (!consumer.defaultBilling.city && attempts > 0),
                                  'required' : !consumer.useOneAddress}"
                       type="text"
                       name="city"
                       tabindex="18"
                       ng-model="consumer.defaultBilling.city"
                       ng-required="attempts > 0 && !consumer.useOneAddress"
                       ng-disabled="consumer.useOneAddress">
                <span ng-show="!consumer.defaultBilling.city && attempts > 0" ng-cloak>
                    <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                </span>
            </div>
        </div>
    </div>

    <div class="col-xs-12 no-pad">
        <div class="col-xs-5 no-pad-left<g:if test="${fullFieldWidth}">"</g:if><g:else> col-md-2"</g:else>>
            <label>Zip code</label>
            <div class="input-container">
                <input numeric-only
                       ng-class="{'error-field' : ((!consumer.defaultBilling.postalCode ||
                                                     consumer.defaultBilling.postalCode.length != 5 ||
                                                     (!consumer.useOneAddress && !doesBillingZipCodeExist)) &&
                                                     attempts > 0),
                                  'required' : !consumer.useOneAddress}"
                       type="text"
                       maxlength="5"
                       class="zipCode"
                       name="zipcodebilling"
                       tabindex="19"
                       ng-model="consumer.defaultBilling.postalCode"
                       ng-required="attempts > 0 && !consumer.useOneAddress"
                       ng-change="checkBillingZipCode()"
                       ng-disabled="consumer.useOneAddress">
                <span ng-show="(!consumer.defaultBilling.postalCode ||
                                 consumer.defaultBilling.postalCode.length != 5 ||
                                 (!consumer.useOneAddress && !doesBillingZipCodeExist)) &&
                                 attempts > 0"
                      ng-cloak>
                    <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange"></span>
                </span>
            </div>
        </div>

        <div class="col-xs-7 no-pad<g:if test="${fullFieldWidth}">"</g:if><g:else> col-md-4"</g:else>>
            <label>State</label>
            <div id="billingStateSelect" class="gray-select ng-cloak"
                ng-class="{'error-field' : (!consumer.defaultBilling.state && attempts > 0 && !billingStateFocus),
                           'dropdownHighlight' : billingStateFocus}">
                <select name="state"
                        ng-blur="billingStateFocus = false"
                        ng-focus="billingStateFocus = true"
                        tabindex="20"
                        ng-class="{'required' : !consumer.useOneAddress}"
                        ng-model="consumer.defaultBilling.state"
                        ng-required="attempts > 0 && !consumer.useOneAddress"
                        ng-disabled="consumer.useOneAddress">
                    <option value="" ng-if="!isFreeForm"></option>
                    <g:each var="states" in="${[StateUtil.standard, StateUtil.territories, StateUtil.military]}">
                        <g:each var="state" in="${states}">
                            <option value="${state.key}">${state.value}</option>
                        </g:each>
                    </g:each>
                </select>
                <span ng-show="!isFreeForm && !consumer.defaultBilling.state && attempts > 0" ng-cloak>
                    <span class="glyphicon glyphicon-exclamation-sign error-field-icon orange short"></span>
                </span>
            </div>
        </div>
    </div>
</div>
