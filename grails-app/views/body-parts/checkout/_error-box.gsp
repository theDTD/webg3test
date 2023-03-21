<div class="error-section bottom clearfix" ng-cloak ng-show="(fCheckoutContact.$invalid && !${ignoreContactData}) ||
                                                              fCheckoutPayment.$invalid ||
                                                              (attempts > 0 &&
                                                               (((consumer.email != required.emailConf ||
                                                                 consumer.defaultShipping.postalCode.length != 5 ||
                                                                 !doesContactZipCodeExist) &&
                                                                !${ignoreContactData}) ||
                                                                (!consumer.useOneAddress && (consumer.defaultBilling.postalCode.length != 5 || !doesBillingZipCodeExist)) ||
                                                                !isValidCreditCardExpiration())) ||
                                                               ccError">
    <div class="col-xs-12">
        <div class="orange" ng-show="ccError">
            <span class="glyphicon glyphicon-exclamation-sign error-icon"></span><div id="ccErrorMsg"></div>
        </div>
        <div class="orange" ng-show="(fCheckoutContact.$invalid && !${ignoreContactData}) ||
                                     fCheckoutPayment.$invalid ||
                                     (attempts > 0 &&
                                      (((consumer.email != required.emailConf ||
                                       consumer.defaultShipping.postalCode.length != 5 ||
                                       !doesContactZipCodeExist) &&
                                       !${ignoreContactData}) ||
                                       (!consumer.useOneAddress && (consumer.defaultBilling.postalCode.length != 5 || !doesBillingZipCodeExist)) ||
                                       !isValidCreditCardExpiration()))">
            <span class="glyphicon glyphicon-exclamation-sign error-icon"></span>Please complete or fix the following required fields:
            <ul class="orange italic">
                <g:each var="error"
                        in="${["First name (Contact)" : "!consumer.firstName && !${ignoreContactData}",
                               "Last name (Contact)" : "!consumer.lastName && !${ignoreContactData}",
                               "Address (Contact)" : "!consumer.defaultShipping.line1 && !${ignoreContactData}",
                               "City (Contact)" : "!consumer.defaultShipping.city && !${ignoreContactData}",
                               "Zip code (Contact)" : "(!consumer.defaultShipping.postalCode || consumer.defaultShipping.postalCode.length != 5 || !doesContactZipCodeExist) && !${ignoreContactData}",
                               "State (Contact)" : "!consumer.defaultShipping.state && !${ignoreContactData}",
                               "Phone number (Contact)": "!consumer.phone && !${ignoreContactData} && ${cartContainsRental}",
                               "Email address (Contact)" : "(!consumer.email) && !${ignoreContactData}",
                               "Confirm email address (Contact)" : "(!required.emailConf || (consumer.email != required.emailConf)) && !${ignoreContactData}",
                               "First name (Payment)": "!consumer.useOneAddress && !consumer.defaultBilling.firstName",
                               "Last name (Payment)": "!consumer.useOneAddress && !consumer.defaultBilling.lastName",
                               "Address (Payment)" : "!consumer.useOneAddress && !consumer.defaultBilling.line1",
                               "City (Payment)" : "!consumer.useOneAddress && !consumer.defaultBilling.city",
                               "Zip code (Payment)" : "!consumer.useOneAddress && (!consumer.defaultBilling.postalCode || consumer.defaultBilling.postalCode.length != 5 || !doesBillingZipCodeExist)",
                               "State (Payment)" : "!consumer.useOneAddress && !consumer.defaultBilling.state",
                               "Card number (Credit card)" : "!required.ccNum",
                               "Expiration date (Credit card)" : "!required.response\$expMonth || !required.response\$expYear",
                               "Expiration date (Credit card); Please use a different card with an expiration date on or after {{minimumCreditCardExpiration.month}}/{{minimumCreditCardExpiration.year}}": "!isValidCreditCardExpiration()",
                               "First name (Credit card)" : "!required.fName",
                               "Last name (Credit card)" : "!required.lName",
                               "Security code (Credit card)" : "!required.cvv2Num"]}">
                    <g:if test="${error.key.toString().contains('Please use a different card with an expiration date')}">
                        <li class="long-error" ng-show="${error.value}">&ndash; ${error.key}</li>
                    </g:if><g:else>
                        <li ng-show="${error.value}">&ndash; ${error.key}</li>
                    </g:else>
                </g:each>
            </ul>
        </div>
    </div>
</div>
