<%@ page contentType="text/html;charset=UTF-8" %>
<html>
    <head>
        <meta name="layout" content="main"/>
        %{--<asset:stylesheet src="main.css"/>--}% %{-- TODO: Use if/when we change to lightbox --}%
        <title>Update your credit card</title>
        <asset:javascript src="angular.min.js"/>
        <asset:javascript src="pages/cardUpdate.js"/>
        <script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYqi6vT6eRg1yFJFsUgzxTowEPxNjnFok&libraries=places"></script>
        <script src="${litleOnlineJsAPI}" type="text/javascript"></script>
    </head>
    <body class="shipping-info updateCard">
        <div ng-app="myApp" ng-controller="cardUpdateCtrl">
            <div class="container main no-pad"
                 ng-model="saleTransactionId"
                 ng-init="saleTransactionId='${saleTransactionId}'">
                <div class="col-xs-12 no-pad">
                    <div class="col-md-8 no-pad clearfix updateCard">
                        <h1 class="font-size-large newBrandPurple updateCard">
                            Update your card information
                        </h1>
                        <br/>
                        <p class="updateCard">
                            The debit/credit card that we have on file for you is no longer valid.
                            Please update your card, or enter in new card information, and try again.
                        </p>
                        <br/>
                        <div class="box clearfix updateCard" ng-model="attempts" ng-init="attempts = 0">
                            <input type="hidden" ng-model="minimumCreditCardExpiration" ng-init="updateMinimumCreditCardExpiration('${cutoffDate}');" />
                            <g:render template="/body-parts/shared/card-processor-form"/>
                            <form method=post id="fCheckoutPayment" name="fCheckoutPayment">
                                <div class="col-xs-12"
                                     ng-model="consumer.useOneAddress"
                                     ng-init="consumer.useOneAddress=false">
                                    <g:render template="/body-parts/checkout/billing-address"
                                              model="['fullFieldWidth': true]"/>
                                    <g:render template="/body-parts/checkout/credit-card-info"/>
                                    <g:render template="/body-parts/checkout/error-box"
                                              model="['ignoreContactData': true]"/>
                                    <g:render template="/body-parts/checkout/processing"
                                              model="['h2': 'Your update is being processed!',
                                                      'p': 'Hang tight for just a couple of seconds ' +
                                                           'while we update your credit card.']"/>
                                </div>
                            </form>
                        </div>

                        <div class="col-xs-12 buttons">
                            <div class="col-md-6"
                                 ng-model="orderSummaryPage"
                                 ng-init="orderSummaryPage='${orderSummaryHref}'">
                                <a aria-label="cancel" href="${orderSummaryHref}"
                                   class="btn gray btn-default sharp btn-xl hidden-xs hidden-sm"
                                   tabindex="30">
                                    <i class="glyphicon glyphicon-menu-left"></i> Cancel
                                </a>
                                <a aria-label="cancel" href="${orderSummaryHref}" class="hidden-md hidden-lg">
                                    <button type="button"
                                            class="navbar-fixed-bottom btn btn-default sharp btn-xl gray cancelUpdate"
                                            tabindex="30"
                                            ng-disabled="orderProcessing">
                                        <i class="glyphicon glyphicon-menu-left"></i> Cancel
                                    </button>
                                </a>
                            </div>
                            <div class="col-md-6">
                                <g:each in="['hidden-xs hidden-sm', 'hidden-md hidden-lg performUpdate']">
                                    <button type="button"
                                            class="navbar-fixed-bottom btn btn-default sharp btn-xl ${it}"
                                            tabindex="31"
                                            ng-click="submit()"
                                            ng-disabled="fCheckoutPayment.$invalid ||
                                                         (attempts > 0 &&
                                                          (consumer.defaultBilling.postalCode.length != 5 || !doesBillingZipCodeExist || !isValidCreditCardExpiration())) ||
                                                         ccError ||
                                                         orderProcessing">
                                        Update
                                    </button>
                                </g:each>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br class="hidden-md hidden-lg"/>
    </body>
</html>