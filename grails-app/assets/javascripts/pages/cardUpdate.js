var myApp = angular.module('myApp', []);

myApp.directive('numericOnly', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d]/g,'') : null;

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

myApp.controller('cardUpdateCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    var defaultErrorMsg = "We’re sorry, but there was a problem processing your payment. Please double check your " +
        "payment information and try again. If the problem persists, please contact your card provider.";

    var genericError = "We’re sorry, but there was a problem processing your payment. Please try again.";

    $scope.isFreeForm = false;

    var isSelection = false;
    // google address autocomplete code
    var placeHandler = function() {
        var place = this.getPlace();
        var $thisform = $(this.form);
        var el = null;
        var cityFound = false;
        isSelection = true;

        // don't let them select routes/cities/etc! they aren't proper addresses.
        if( place.types[0] != "street_address" ){
            el = $thisform.find('input[name=address1]');
            el[0].value = '';
            el[0].focus();
            return;
        }

        for (var k in place.address_components) {
            var component = place.address_components[k];

            switch (component.types[0]) {
                case "street_number":
                    el = $thisform.find('input[name=address1]');
                    el[0].value = component.long_name;
                    break;
                case "route":
                    el = $thisform.find('input[name=address1]');
                    el[0].value += " " + component.short_name;
                    el.trigger('change');
                    break;
                case "administrative_area_level_3":
                    el = $thisform.find('input[name=city]');
                    // only use this if one of the other city fields is not present
                    if( !cityFound ) {
                        el[0].value = component.long_name;
                        cityFound = true;
                        el.trigger('change');
                    }
                    break;
                case "sublocality":
                case "sublocality_level_1":
                case "locality":
                    el = $thisform.find('input[name=city]');
                    el[0].value = component.long_name;
                    cityFound = true;
                    el.trigger('change');
                    break;
                case "administrative_area_level_1":
                    el = $thisform.find('select[name=state]');
                    el[0].value = component.short_name;
                    el.trigger('change');
                    break;
                case "postal_code":
                    el = $thisform.find('input.zipCode');
                    el[0].value = component.short_name;
                    el.trigger('change');
                    break;
                default:
                    break;
            }
        }

        // if for some reason city doesn't populate, allow them to edit it
        el = $thisform.find('input[name=city]');
        if( !cityFound ){
            el[0].value = '';
            el[0].removeAttribute('disabled');
        } else {
            el[0].setAttribute('disabled', 'disabled');
        }
        isSelection = false;
        $thisform.find('input[name=address2]')[0].focus()
    };

    var isAutocompleteDisabled = false;

    var onAdr1Change = function(e){
        if (isAutocompleteDisabled) {
            return;
        }

        // dont show the dropdown if they tried writing an address with no starting #
        if( isNaN(e.target.value.charAt(0)) || (e.target.value.length == 0 && e.keyCode >= 65 && e.keyCode <= 90) ){
            e.stopImmediatePropagation();
        }
        // clear the other fields so they cant submit a modified address 1 field
        if( !isSelection ){
            var $thisform = $(e.target.form);
            ['input[name=city]', 'select[name=state]', 'input.zipCode'].forEach(function(selector){
                var el = $thisform.find(selector);
                el[0].value = '';
                el.trigger('change');
            });
        }
    };

    autocomplete = [];
    var adr1fields = $('input[name=address1]');

    for(var i = 0; i < adr1fields.length; i++) {

        adr1fields[i].onchange = onAdr1Change;
        adr1fields[i].onkeypress = onAdr1Change;
        adr1fields[i].onkeyup = onAdr1Change;
        adr1fields[i].onfocus = onAdr1Change;
        adr1fields[i].onpaste = onAdr1Change;

        var ac = new google.maps.places.Autocomplete(adr1fields[i], {
            types: ['address'],
            componentRestrictions: {country: 'us'}
        });

        ac.addListener('place_changed', placeHandler);

        ac.form = adr1fields[i].form;
        autocomplete[i] = ac;
    }

    if (adr1fields.length > 0) {    // Only perform this check when there are Address fields present
        var service = new google.maps.places.AutocompleteService();
        var hasCallbackRun = false;
        service.getQueryPredictions({ input: "Pizza near Par" }, callback);

        function callback(results, status) {
            hasCallbackRun = true;
            if (status != 'OK') {
                console.log("Making fields editable...");
                $('#fCheckoutPayment :input').prop("disabled", false);
                $('#billingStateSelect').switchClass("disabled-select", "gray-select");
                for(var i = 0; i < adr1fields.length; i++) {
                    google.maps.event.clearInstanceListeners(adr1fields[i])
                }
                $scope.isFreeForm = true;
                isAutocompleteDisabled = true;
            }
        }

        // If the callback doesn't get called after 5 seconds...
        setTimeout(function() {
            if (!hasCallbackRun) {
                console.log("Cannot reach the Autocomplete service.");
                callback({}, "ERROR");
            }
        }, 5000);
    }

    $scope.ccFieldChange = function() {
        $scope.ccDataChanged = true;
    };

    $scope.ccFieldBlur = function() {
        if ($scope.ccDataChanged) $scope.ccError = false;
    };

    function setLitleResponseFields(response) {
        document.getElementById('response$code').value = response.response;
        document.getElementById('response$message').value = response.message;
        document.getElementById('response$responseTime').value = response.responseTime;
        document.getElementById('response$reportGroup').value = response.reportGroup;
        document.getElementById('response$merchantTxnId').value = response.id;
        document.getElementById('response$orderId').value = response.orderId;
        document.getElementById('response$litleTxnId').value = response.litleTxnId;
        document.getElementById('response$type').value = response.type;
        document.getElementById('response$firstSix').value = response.firstSix;
        document.getElementById('response$lastFour').value = response.lastFour;
        document.getElementById('response$bin').value = response.bin;
        if (response.expMonth) document.getElementById('response$expMonth').value = response.expMonth;
        if (response.expYear) document.getElementById('response$expYear').value = response.expYear;

        $scope.consumer.registrationId = response.paypageRegistrationId;
        $scope.consumer.expMonth = response.expMonth ? document.getElementById('response$expMonth').value : $scope.required.response$expMonth;
        $scope.consumer.expYear = response.expYear ? document.getElementById('response$expYear').value : $scope.required.response$expYear;
    }

    function setError(val) {
        $scope.orderProcessing = false;
        $('div#ccErrorMsg')[0].innerHTML = val;
        $scope.ccError = true;
        $scope.ccDataChanged = false;
        $scope.attempts++;
        if(!$scope.$$phase) {   // Need to check for this since we call setError from a function that already performs $apply()
            $scope.$apply();
        }
    }

    function postToGrailsController() {
        var json = $scope.consumer;
        json['defaultBilling']['country'] = "US";
        json['saleTransactionId'] = $scope.saleTransactionId;
        $http.post('/vb/cardUpdate/submit', json).then(
            function(data) { // On success
                $window.location.href = $scope.orderSummaryPage;
            },
            function(data) { // On error
                data['status'] == 402 ? setError(defaultErrorMsg) : setError(genericError);
            });
    }

    function submitAfterLitle (response) {
        setLitleResponseFields(response);
        postToGrailsController();
    }

    function onErrorAfterLitle(response) {
        setLitleResponseFields(response);

        var errorCodes = {
            '110': "Error: Insufficient funds<br/>The card you entered does not have sufficient funds to cover the transaction.",
            '226': "Error: Incorrect CVV<br/>Please correct the security code and try again.",
            '301': "Error: Invalid account number<br/>Please correct the account number or use another form of payment.",
            '302': "Error: Account number does not match card type<br/>The card number indicates a different card type (e.g. Visa, MasterCard, etc.) than the one selected.",
            '320': "Error: Invalid expiration date<br/>The expiration date that was entered is invalid.",
            '323': "Error: No such issuer<br/>Credit card issuer does not exist. Please make sure your account number is correct.",
            '330': "Error: Invalid payment type<br/>This payment type is not accepted by the card issuer.",
            '352': "Error: Invalid security code<br/>Please correct the security code (CVV/CID) and try again.",
            '524': "Error: Data invalid<br/>The submitted data is invalid.",
            '820': "Error: Card number invalid<br/>The card number entered is invalid. Please correct the number and try again.",
            'def': defaultErrorMsg
        };

        var altCodes = {
            '882': '352',
            '883': '352',
            '871': '820',
            '872': '820',
            '873': '820',
            '876': '820'
        };

        var responseCode = response.response || '';
        if (responseCode in errorCodes) {
            setError(errorCodes[responseCode]);
        } else if (responseCode in altCodes) {
            setError(errorCodes[altCodes[responseCode]]);
        } else {
            setError(errorCodes['def']);
        }
    }

    function onTimeoutAfterLitle() {
        setError("Error: Credit card processor timed-out<br/>We were unable to get a response from the credit card processor. Please try again.");
    }

    var formFields = {
        "accountNum":            document.getElementById('ccNum'),
        "cvv2":                  document.getElementById('cvv2Num'),
        "paypageRegistrationId": document.getElementById('paypageRegistrationId'),
        "bin":                   document.getElementById('bin')
    };

    $scope.submit = function() {
        var focus;

        $(".required").each(function () {
            var $this = $(this);
            var consumer = $scope.consumer;
            var fieldIsEmpty = $this.val() == '' || $this.val() == '? undefined:undefined ?';   // Empty value for text and drop-down fields
            var billingZipCodeIsInvalid = $this.prop("name") == "zipcodebilling" &&
                consumer.defaultBilling && consumer.defaultBilling.postalCode &&
                (consumer.defaultBilling.postalCode.length != 5 || !$scope.doesBillingZipCodeExist);
            var isValidCreditCardExpiration = $scope.isValidCreditCardExpiration();

            if (fieldIsEmpty || billingZipCodeIsInvalid|| !isValidCreditCardExpiration) {
                if (!focus || focus.prop("tabindex") > $this.prop("tabindex")) {
                    focus = $this;
                }
            }
        });

        if (focus) {
            focus.focus();
            focus.val(focus.val()); // Places the cursor at the end of the input
            $scope.attempts++;
            return;
        }

        $scope.orderProcessing = true;

        // clear test fields
        setLitleResponseFields({"response":"", "message":""});
        document.getElementById('timeoutMessage').value="";

        var litleRequest = {
            "paypageId" : document.getElementById("request$paypageId").value,
            "reportGroup" : document.getElementById("request$reportGroup").value,
            "orderId" : document.getElementById("request$orderId").value,
            "id" : document.getElementById("request$merchantTxnId").value,
            "url" : $('#litleOnlineJs').val()
        };

        new LitlePayPage().sendToLitle(litleRequest, formFields, submitAfterLitle, onErrorAfterLitle, onTimeoutAfterLitle, 6000);
        return false;
    };

    $scope.checkBillingZipCode = function() {
        if ($scope.consumer.defaultBilling &&
            $scope.consumer.defaultBilling.postalCode && $scope.consumer.defaultBilling.postalCode.length == 5) {
            $http.get('/vb/checkout/calculateTax/?zip=' + $scope.consumer.defaultBilling.postalCode).
            success(function(data) {
                $scope.doesBillingZipCodeExist = true;
            }).
            error(function(data, status) {
                if (status === 404) {
                    $scope.doesBillingZipCodeExist = false;
                }
            });
        }
        else {
            $scope.doesBillingZipCodeExist = false;
        }
    };

    $scope.doesContactZipCodeExist = true;  // We only care about the billing zip code for card updates

    $scope.updateMinimumCreditCardExpiration = function(cutoffDate) {
        var minimumExpiration = { month: 0, year: 0 };
        if (cutoffDate) {
            var aux = cutoffDate.split("/");
            minimumExpiration = { month: parseInt(aux[0]), year: parseInt(aux[2]) };
        }

        $scope.minimumCreditCardExpiration = minimumExpiration;
    };

    $scope.isValidCreditCardExpiration = function() {
        var expYear = parseInt($scope.required.response$expYear);
        var expMonth = parseInt($scope.required.response$expMonth);

        if (expYear > $scope.minimumCreditCardExpiration.year) {
            return true;
        }
        if (expYear == $scope.minimumCreditCardExpiration.year) {
            return expMonth >= $scope.minimumCreditCardExpiration.month;
        }

        return false;
    };

    $scope.validateCreditCardExpiration = function() {
        $scope.ccFieldChange();

        var valid = $scope.isValidCreditCardExpiration();

        $scope.fCheckoutPayment.response$expMonth.$setValidity('validCreditCardExpiration', valid || $scope.attempts == 0);
        $scope.fCheckoutPayment.response$expYear.$setValidity('validCreditCardExpiration', valid || $scope.attempts == 0);
    };
}]);