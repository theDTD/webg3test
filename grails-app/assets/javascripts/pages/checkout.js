var myApp = angular.module('myApp', ['vcRecaptcha']);

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

myApp.controller('checkoutCtrl', ['$scope', '$http', '$window', 'vcRecaptchaService', function($scope, $http, $window, vcRecaptchaService) {
    $scope.widgetId = 0;

    $scope.onWidgetCreate = function(widgetId) {
        $scope.widgetId = widgetId;
    };

    $scope.$watch("totals", function() {
        var itemTotal = $scope.totals.item;
        var itemSize = $scope.item.size;
        var shippingTotal = $scope.totals.shipping;
        var totalBase = itemTotal + shippingTotal;
        $('#shippingTotal').html(formatMoneyHTML(moveDecimal(shippingTotal)));
        $('.grand-total').html(formatMoneyHTML(moveDecimal(totalBase)));
        $scope.totalValue = totalBase;
        $scope.isFreeForm = false;

        $(".shipping-price").change(function() {
            $('#shippingTotal').html(formatMoneyHTML(moveDecimal(getShippingTotal())));
            totalAmount();
        });

        $scope.updateTaxes = function() {
            if ($scope.consumer.defaultShipping.postalCode && $scope.consumer.defaultShipping.postalCode.length == 5) {
                $http.get('/vb/checkout/calculateTax/?zip=' + $scope.consumer.defaultShipping.postalCode).
                    success(function(data) {
                        if(data != 0){
                            var zipTotal = data / 100;
                            $('#saleTax').html(formatMoneyHTML(moveDecimal(zipTotal)));
                            totalAmount();
                        }
                        $scope.doesContactZipCodeExist = true;
                    }).
                    error(function(data, status) {
                        if (status === 404) {
                            $scope.doesContactZipCodeExist = false;
                        }
                    });
            }
            else {
                $('#saleTax').html(formatMoneyHTML("0.00"));
                totalAmount();
                $scope.doesContactZipCodeExist = false;
            }
        };

        $scope.checkBillingZipCode = function() {
            if (!$scope.consumer.useOneAddress && $scope.consumer.defaultBilling &&
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

        $scope.updateRentalLength = function(itemId) {
            $http.put('/vb/cart/updateCartItem/?id=' + itemId+"&rentalTerm=" + $scope["rentalLength"+itemId]).
                success(function(data) {
                    var itemPrice = data.currentPrice / 100;
                    var currentItemPrice = $('.itemPrice'+itemId).data('price');
                    newPrice = 0;

                    $(".itemPrice").each(function() {
                        newPrice += $(this).data('price');
                    });

                    newItemPrice = newPrice - currentItemPrice + data.currentPrice;
                    var newItemTotal = newItemPrice / 100;

                    $('.itemPrice' + itemId).html(formatMoneyHTML(moveDecimal(itemPrice)));
                    $('#itemTotal').html(formatMoneyHTML(moveDecimal(newItemTotal)));

                    totalAmount();
                });
        };

        $scope.removeClick = function(itemId, rnaItem, prodId, isbn, item_price, quant, aff, productName) {

            submitRemovedItemEvent(prodId, isbn, (rnaItem ? 0 : item_price), quant, aff);

            var shippingTotalUpdate = replaceDollarDecimalCommas('#shippingTotal');
            var itemsSize = itemSize -= 1;
            var itemQuantity = $('.row-remove'+itemId+' .quantityOne').html();
            var itemPrice = $('.itemPrice'+itemId).data('price') / 100;
            var itemsTotal = itemQuantity * itemPrice;
            var shippingPrice = $('.row-remove'+itemId+' .shipping-price option:selected').data('price') / 100;
            var shippingUpdate = itemQuantity * shippingPrice;
            var removeItemPrice = Math.abs(itemTotal -= itemsTotal);
            var removeShippingPrice = Math.abs(shippingTotalUpdate -= shippingUpdate);

            $http.post('/vb/cart/removeItem/'+itemId).
                success(function() {
                    $('.row-remove'+itemId).fadeOut().remove();

                    if (!rnaItem) {
                        $scope.item.size--;
                        $('.item-size').html($scope.item.size);
                        $scope.totals.item -= itemPrice;
                        $('#itemTotal').html(formatMoneyHTML(moveDecimal($scope.totals.item)));
                        $('#shippingTotal').html(formatMoneyHTML(moveDecimal(removeShippingPrice)));
                        totalAmount();

                        gtag('event', 'remove_from_cart', {
                            'currency': 'USD',
                            'value': itemPrice,
                            'items': [{
                                'item_id': itemId,
                                'item_name': productName,
                                'item_category': "book",
                                'item_category2': aff,
                                'price': itemPrice,
                                'quantity': quant,
                                'currency': 'USD'
                            }]
                        });
                    }
                    else {
                        var count = $('#rnaItemCount').val();
                        $('.rnaItemCount').val(count - 1);
                    }

                    if($(".cart-row").length == 0) {
                        $('.showEmptyCart').fadeIn();
                        $('.cartBtn').addClass('disabled');
                    }
                });
        }
    });

    var isSelection = false;
    // google address autocomplete code
    var placeHandler = function() {
        var place = this.getPlace();
        var $thisform = $(this.form);
        var el = null;
        var cityFound = false;
        isSelection = true;

        // if this is a route, we need to pluck street address from users input, because google doesnt return it
        if( place.types[0] != "street_address" ){
            el = $thisform.find('input[name=address1]');
            var street_number = el[0].value.split(" ")[0];
            if( !isNaN(street_number) ) {
                el[0].value = street_number;
            } else {
                el[0].value = '';
                el[0].focus();
                return;
            }
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

        isSelection = false;
        $thisform.find('input[name=address2]')[0].focus()
    };

    var isAutocompleteDisabled = false;

    var onAdr1Change = function(e){
        if (isAutocompleteDisabled) {
            return;
        }

        // dont show the dropdown if they tried writing an address with no starting #
        if (isNaN(e.target.value.trim().charAt(0)) || (e.target.value.length == 0 &&
            e.keyCode >= 65 && e.keyCode <= 90)) {
            e.stopImmediatePropagation();
        }
        // clear the other fields so they cant submit a modified address 1 field
        // Clear only when autocomplete is enabled.
        if (!isSelection) {
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
                $('#fCheckoutContact :input').prop("disabled", false);
                $('#fCheckoutPayment :input').prop("disabled", false);
                $('#contactStateSelect').switchClass("disabled-select", "gray-select");
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

    $scope.updateShipping = function(itemId) {
        $http.put('/vb/cart/updateCartItem/?id=' + itemId + "&shippingMethod=" + $scope["shippingMethod" + itemId]).
            success(function(data){});
    };

    var shppingAddressFields = [
        'consumer.firstName',
        'consumer.lastName',
        'consumer.defaultShipping.line1',
        'consumer.defaultShipping.line2',
        'consumer.defaultShipping.city',
        'consumer.defaultShipping.postalCode',
        'consumer.defaultShipping.state'
    ];

    $scope.$watchGroup(shppingAddressFields, function() {
        $scope.copyShippingAddress();
    });

    $scope.$watch('consumer.useOneAddress', function() {
       if ($scope.consumer && $scope.consumer.useOneAddress) {
           $scope.copyShippingAddress();
       } else if ($scope.consumer && $scope.consumer.defaultBilling) {
           var fields = ['firstName', 'lastName', 'line1', 'line2', 'city', 'postalCode', 'state'];

           fields.forEach(function (field) {
               $scope.consumer.defaultBilling[field] = '';
           });
       }
    });

    $('#useAddress').change(function() {
        if(this.checked) {
            this.value = 'on';
        } else {
            this.value = 'off';
        }
    });

    $('.checkbox, a').click(function(e) {
        e.stopPropagation();
    });

    $('.moneyformat').moneyFormat();

    if ($(window).width() <= 992) {
        $('.shipping-icon').click(function(e) {
            e.stopPropagation();
            $(this).find('.tool-tip').show();
            return false;
        });

        $('.hide-tool-tip').click(function() {
            $('.tool-tip').hide();
            return false;
        });

        $('header').addClass('navbar-fixed-top');
    }

    function submitRemovedItemEvent(item_id, item_isbn, item_price, item_quant, item_affiliation) {
        total_cart_price = total_cart_price - item_price;
        // analytics.track('Removed Product', {
        //     id: item_id,
        //     isbn: item_isbn,
        //     affiliation: item_affiliation,
        //     price: item_price / 100,
        //     quantity: item_quant,
        //     ecomm_prodid: item_id,
        //     ecomm_pagetype: 'cart',
        //     ecomm_totalvalue: total_cart_price / 100
        // });
    }

    function totalAmount() {
        var updatedItemTotal = replaceDollarDecimalCommas('#itemTotal');
        var updatedShippingTotal = replaceDollarDecimalCommas('#shippingTotal');
        var updatedTaxTotal = replaceDollarDecimalCommas('#saleTax');

        var total = updatedItemTotal + updatedShippingTotal + updatedTaxTotal;

        $('.grand-total').html(formatMoneyHTML(moveDecimal(total)));
    }

    function replaceDollarDecimalCommas(x) {
        return $(''+ x +'').text().replace('$', '').replace('.', '').replace(/,/g, '') / 100;
    }

    function moveDecimal(x) {
        return x.toFixed(2);
    }

    function getShippingTotal() {
        var newPrice = 0.00;

        $(".cart-row").each(function() {
            var shippingAmount = $(this).find('.shipping-price option:selected').data('price');
            var quantityOne = $(this).find('.quantityOne').html();
            var shippingTotal = quantityOne * shippingAmount;

            newPrice += shippingTotal
        });

        return newPrice / 100;
    }

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
        $scope.consumer.firstSix = response.firstSix;
        $scope.consumer.lastFour = response.lastFour;
        $scope.consumer.orderNumber = response.orderId;
        $scope.consumer.amount = document.getElementById('amount').value
    }

    var defaultErrorMsg = "We’re sorry, but there was a problem processing your payment. Please double check your " +
        "payment information and try again. If the problem persists, please contact your card provider.";

    var genericError = "We’re sorry, but there was a problem processing your payment. Please try again.";

    function postConsumerToController() {
        var json = $scope.consumer;
        $http.post('/vb/checkout/submit', json).then(
            function(data) { // On success
                $window.location.href = "/vb/checkout/thankYou";
                submitCompletedOrder();
            },
            function(data) { // On error
                if (data['status'] == 409) {
                    $window.location.href = "/vb/cart/index";
                } else if (data['status'] == 402) {
                    setError(defaultErrorMsg)
                } else if (data['data'].includes('reCAPTCHA')) {
                    setError(data['data'])
                }
                else setError(genericError);
                vcRecaptchaService.reload($scope.widgetId);
            });
    }

    function submitAfterLitle (response) {
        setLitleResponseFields(response);
        postConsumerToController();
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

    $scope.ccFieldChange = function() {
        $scope.ccDataChanged = true;
    };

    $scope.ccFieldBlur = function() {
        if ($scope.ccDataChanged) $scope.ccError = false;
    };

    var formFields = {
        "accountNum":            document.getElementById('ccNum'),
        "cvv2":                  document.getElementById('cvv2Num'),
        "paypageRegistrationId": document.getElementById('paypageRegistrationId'),
        "bin":                   document.getElementById('bin')
    };

    $scope.submit = function() {
        var focus;

        $(".required").each(function() {
            var $this = $(this);
            var consumer = $scope.consumer;
            var fieldIsEmpty = $this.val() == '' || $this.val() == '? undefined:undefined ?';   // Empty value for text and drop-down fields
            var emailConfIsInvalid = $this.prop("name") == "emailConf" && (!$scope.required || consumer.email != $scope.required.emailConf);
            var contactZipCodeIsInvalid = $this.prop("name") == "zipcodecontact" && consumer.defaultShipping &&
                consumer.defaultShipping.postalCode &&
                (consumer.defaultShipping.postalCode.length != 5 || !$scope.doesContactZipCodeExist);
            var billingZipCodeIsInvalid = $this.prop("name") == "zipcodebilling" && !consumer.useOneAddress &&
                consumer.defaultBilling && consumer.defaultBilling.postalCode &&
                (consumer.defaultBilling.postalCode.length != 5 || !$scope.doesBillingZipCodeExist);
            var isValidCreditCardExpiration = $scope.isValidCreditCardExpiration();


            if (fieldIsEmpty || emailConfIsInvalid || contactZipCodeIsInvalid || billingZipCodeIsInvalid || !isValidCreditCardExpiration) {
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

        // show the spinner:
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

    $scope.copyShippingAddress = function() {
        if (!$scope.consumer || !$scope.consumer.useOneAddress) {
            return;
        }

        $scope.consumer.defaultBilling = $scope.consumer.defaultBilling || {}
        $scope.consumer.defaultBilling.firstName = $scope.consumer.firstName;
        $scope.consumer.defaultBilling.lastName = $scope.consumer.lastName;

        if (!$scope.consumer.defaultShipping) {
            return;
        }

        var fields = ['line1', 'line2', 'city', 'postalCode', 'state'];

        fields.forEach(function (field) {
           $scope.consumer.defaultBilling[field] = $scope.consumer.defaultShipping[field];
        });
    };

    $scope.updateMinimumCreditCardExpiration = function(recyclingDate) {
        var minimumExpiration = { month: 0, year: 0 };

        if (recyclingDate) {
            var aux = recyclingDate.split("/");
            minimumExpiration = { month: parseInt(aux[0]), year: parseInt(aux[2]) };
        }

        $scope.minimumCreditCardExpiration = minimumExpiration;
    };

    $scope.isValidCreditCardExpiration = function() {
        var expYear = parseInt($scope.required.response$expYear);
        var expMonth = parseInt($scope.required.response$expMonth);

        if (expYear > $scope.minimumCreditCardExpiration.year)
            return true;
        if (expYear == $scope.minimumCreditCardExpiration.year)
            return expMonth >= $scope.minimumCreditCardExpiration.month;

        return false;
    };

    $scope.validateCreditCardExpiration = function() {
        $scope.ccFieldChange();

        var valid = $scope.isValidCreditCardExpiration();

        $scope.fCheckoutPayment.response$expMonth.$setValidity('validCreditCardExpiration', valid || $scope.attempts == 0);
        $scope.fCheckoutPayment.response$expYear.$setValidity('validCreditCardExpiration', valid || $scope.attempts == 0);
    };
 }]);

function formatMoneyHTML(string) {
    var text = (string.indexOf('$') >= 0) ? string: "$" + string;
    var indexOfDollar = text.indexOf('$');
    var indexOfDecimal = text.indexOf('.');
    return '<span>$</span>' + text.substring(indexOfDollar + 1, indexOfDecimal) + '<span>.' + text.substring(indexOfDecimal + 1) + '</span>';
}

function changeColor(sel) {
    if (sel.value == "")
        sel.style.color = "#aeaeae";
    else sel.style.color = "#000";
}

