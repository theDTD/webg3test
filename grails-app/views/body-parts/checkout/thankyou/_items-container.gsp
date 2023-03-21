<div class="itemsContainer box clearfix">
    <div class="mobileHeader">
        <h3 class="font-size-xl headerBanner">You ordered ${transaction.saleTransactionProducts.size()} items:</h3>
    </div>
    <g:each status="index" var="item" in="${transaction.saleTransactionProducts}">
        <g:render template="/body-parts/checkout/thankyou/item" model="[item: item]"/>
    </g:each>
</div>
