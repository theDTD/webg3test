<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <meta name="layout" content="layout-three"/>
  <title></title>
  <asset:javascript src="angular.min.js"/>
  <asset:javascript src="angular-recaptcha.min.js"/>
  <g:render template="/head-includes/ga4"/>
  <g:javascript>
        const cart = JSON.parse("${cart}");
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
  </g:javascript>
    <script>
        const items = [];
        const total = '${(itemTotal + shippingTotal)/100}';

        cart.items.forEach ( item => {
            const price = Number(item.currentPrice) / 100;
            items.push({
                item_id: item.id,
                item_name: item.product.name,
                item_category: 'book',
                item_category2: item.sale ? 'sale' : 'rent',
                price: price,
                quantity: item.quantity
            });
        });

        gtag('event', 'begin_checkout', {
            currency: 'USD',
            items: items,
            value: total
        });
    </script>
</head>

<body class="shipping-info">
<g:render template="/body-parts/checkout/anti-fraud"/>
<section>

<div class="main-container" ng-app="myApp" ng-controller="checkoutCtrl">

  <div class="container main no-pad">
    <span class="col-xs-12 no-pad">
      <div class="col-md-8 no-pad clearfix">
        <h1 class="font-size-large newBrandPurple text-center">Let’s get you checked out</h1>
            <input type="hidden" ng-model="minimumCreditCardExpiration" ng-init="updateMinimumCreditCardExpiration('${recyclingDate}');" />
            <g:render template="/body-parts/shared/card-processor-form"/>
            <g:render template="/body-parts/checkout/contact-info"/>
            <g:render template="/body-parts/checkout/payment-info"/>
            %{--<g:render template="/body-parts/checkout/create-account"/>--}%
            <g:render template="/body-parts/checkout/error-box" model="['ignoreContactData': false]"/>

            <g:if test="${showCaptcha}">
                <div class="col-xs-12 text-center recaptcha">
                  <div vc-recaptcha on-create="onWidgetCreate(widgetId)" key="'${grailsApplication.config.valore.google.recaptcha.siteKey}'" name="recaptchaResponse" ng-model="consumer.recaptchaResponse" ng-required="true" id="recaptchaResponse"></div>
                </div>
            </g:if>

            <div class="col-xs-12 buttons no-pad-xs">
              <div class="col-md-6 hidden-xs hidden-sm">
                <g:link controller="cart" action="index" class="btn btn-edit-cart btn-xl" tabindex="30"><i class="glyphicon glyphicon-menu-left"></i> Edit cart</g:link>
              </div>
              <div class="col-md-6 no-pad-xs">
                %{-- First button is mobile, second is desktop --}%
                %{-- TODO: Make a tag that will create both of these at once --}%
                <button type="button"
                        class="navbar-fixed-bottom btn btn-default sharp btn-xl hidden-md hidden-lg"
                        tabindex="31"
                        ng-click="submit()"
                        ng-model="attempts"
                        ng-init="attempts=0"
                        ng-disabled="fCheckoutContact.$invalid || fCheckoutPayment.$invalid || (attempts > 0 && (consumer.email != required.emailConf || consumer.defaultShipping.postalCode.length != 5 || !doesContactZipCodeExist || (!consumer.useOneAddress && (consumer.defaultBilling.postalCode.length != 5 || !doesBillingZipCodeExist)))) || ccError || orderProcessing"
                        ng-class="(fCheckoutContact.$invalid || fCheckoutPayment.$invalid || (attempts > 0 && (consumer.email != required.emailConf || consumer.defaultShipping.postalCode.length != 5 || !doesContactZipCodeExist || (!consumer.useOneAddress && (consumer.defaultBilling.postalCode.length != 5 || !doesBillingZipCodeExist)))) || ccError || orderProcessing) ? 'mobile-disable' : 'enabled'">
                  Place order
                </button>
                <button type="button"
                        class="navbar-fixed-bottom btn btn-default sharp btn-xl hidden-xs hidden-sm"
                        tabindex="31"
                        ng-click="submit()"
                        ng-model="attempts"
                        ng-init="attempts=0"
                        ng-disabled="fCheckoutContact.$invalid || fCheckoutPayment.$invalid || (attempts > 0 && (consumer.email != required.emailConf || consumer.defaultShipping.postalCode.length != 5 || !doesContactZipCodeExist || (!consumer.useOneAddress && (consumer.defaultBilling.postalCode.length != 5 || !doesBillingZipCodeExist)) || !isValidCreditCardExpiration())) || ccError || orderProcessing">
                  Place order
                </button>
              </div>
              <div class="col-md-12 font-size-17 pt-1 pb-1 hidden-sm hidden-xs">* By placing your order, you agree to Valore's <a href="https://help.valorebooks.com/article/337-legal-policies" class="inline newBrandPurple" target="_blank"> terms </a><g:if test="${!cartContainsRental}">.</g:if><g:else><span>and <a href="https://help.valorebooks.com/article/342-rental-policies" class="inline newBrandPurple" target="_blank">rental policies.</a></span></g:else></div>
            </div>
        </form>
      </div>
      <g:render template="/body-parts/checkout/sidebar"/>
  </div>
  </div>
  <g:render template="/body-parts/checkout/processing"
            model="['h2': 'Your order is being processed!',
                    'p': 'Hang tight for just a couple of seconds while we finalize your order.']"/>
</div>

<script src="${litleOnlineJsAPI}" type="text/javascript"></script>
<asset:javascript src="MoneyHTMLFormatter.js"/>
<asset:javascript src="pages/checkout.js"/>
<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYqi6vT6eRg1yFJFsUgzxTowEPxNjnFok&libraries=places"></script>
</section>
</body>
</html>
