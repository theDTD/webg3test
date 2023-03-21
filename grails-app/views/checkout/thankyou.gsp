<%@ page import="com.valore.util.sale.SaleTransactionUtil" contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <meta name="layout" content="main"/>
  <g:render template="/head-includes/ga4"/>
  <g:javascript>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      var itemsList = [];
      <g:each in="${transaction.saleTransactionProducts}" var="stp">
        itemsList.push({
          item_id: "${stp.product.productCode}",
          item_name: "${stp.product.name}",
          item_category: 'book',
          item_category2: "${stp.saleType == 'Purchase' ? 'sale' : 'rent' }",
          quantity: 1,
          price: ${stp.itemAmount / 100}
        });
      </g:each>
      gtag("event", "purchase", {
          currency: 'USD',
          transaction_id: "${transaction.id}",
          items: itemsList,
          value: ${transaction.total / 100}
      });
  </g:javascript>
  <g:javascript>
      setTimeout(function(){
          const bannerAd = document.getElementById("banner-ad");
          const popup = document.getElementById("popup");
          if (window.getComputedStyle(bannerAd).display != "none") {
              popup.classList.remove("hidden");
          }
      }, 1000);
  </g:javascript>
  <title></title>
</head>

<body>
    <div class="container thankyou-page no-pad">
        %{-- FreeShipping.com banner --}%
        <div id="banner-ad" class="col-xs-12 ads hidden-xs hidden-sm">
            <ins class='dcmads' style='display:inline-block;width:525px;height:32px'
                 data-dcm-placement='N6103.286873.FREESHIPPING.COM/B5478558.284109521'
                 data-dcm-rendering-mode='script'
                 data-dcm-https-only
                 data-dcm-gdpr-applies='gdpr=${GDPR}'
                 data-dcm-gdpr-consent='gdpr_consent=${GDPR_CONSENT_755}'
                 data-dcm-addtl-consent='addtl_consent=${ADDTL_CONSENT}'
                 data-dcm-resettable-device-id=''
                 data-dcm-app-id=''>
                <script src='https://www.googletagservices.com/dcm/dcmads.js'></script>
            </ins>
        </div>
        %{-- FreeShipping.com pop-up --}%
        <div id="popup" class="col-xs-12 popup hidden hidden-xs hidden-sm">
            <div class="popup-content">
                <ins id="ad" class='dcmads' style='display:inline-block;width:500px;height:400px'
                     data-dcm-placement='N6103.286873.FREESHIPPING.COM/B5478558.284529182'
                     data-dcm-rendering-mode='script'
                     data-dcm-https-only
                     data-dcm-gdpr-applies='gdpr=${GDPR}'
                     data-dcm-gdpr-consent='gdpr_consent=${GDPR_CONSENT_755}'
                     data-dcm-addtl-consent='addtl_consent=${ADDTL_CONSENT}'
                     data-dcm-resettable-device-id=''
                     data-dcm-app-id=''>
                    <script src='https://www.googletagservices.com/dcm/dcmads.js'></script>
                </ins>
                <div class="close-popup">
                    <a id="close-popup-link">(no thanks)</a>
                </div>
            </div>
        </div>
        <h1 class="navbar-fixed-top hidden-xs hidden-sm newBrandPurple">Thank you for your order, ${consumer.firstName}!</h1>
        <div class="col-xs-12 main-section">
            <h3 class="newBrandPurple font-size-large">Your order number: <span class="purple">${transaction.id}</span></h3>
            <p class="confirmation-notice">You'll also receive a confirmation email at <span class="purple">${consumer.email}</span>.
            If you don't receive it, please check your spam folder or <a class="underline" href="http://help.valorebooks.com/support/tickets/new" target="_blank">contact us</a>.</p>
            <a class="detail-toggle font-size-large" ng-hide="showDetails" href="" ng-cloak ng-init="showDetails = 'Hide'" ng-click="showDetails == 'Show' ? showDetails = 'Hide' : showDetails = 'Show'">
                {{showDetails}} order details<span ng-class="{ 'glyphicon-menu-right' : showDetails == 'Show', 'glyphicon-menu-down' : showDetails == 'Hide'}" class="glyphicon glyphicon-menu-right"></span>
            </a>
        </div>
        <div class="container details-section no-pad" ng-show="showDetails == 'Hide'">
            <h2 class="newBrandPurple">Details for order #${transaction.id}</h2>
            <g:render template="/body-parts/checkout/thankyou/address"/>
            <g:render template="/body-parts/checkout/thankyou/items-container"/>
            <g:render template="/body-parts/checkout/thankyou/totals-container"/>
        </div>
    </div>

    <asset:javascript src="MoneyHTMLFormatter.js"/>
    <asset:javascript src="pages/thankYou.js"/>
    %{-- Special includes can check themselves if they're needed. --}%
    %{try {}%
    <g:render template="/foot-includes/sale/thankyou/cj" model="[rentalTotal: SaleTransactionUtil.getRentalTotal(transaction), saleTotal: SaleTransactionUtil.getSaleTotal(transaction)]"/>
    %{} catch(Exception e) { System.out.println "Exception thrown while rendering CJ and I just really don't care - ${e.message}\n${e.printStackTrace()}"}}%

</body>
</html>
