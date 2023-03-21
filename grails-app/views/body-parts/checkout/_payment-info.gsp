<form method=post id="fCheckoutPayment" name="fCheckoutPayment">
    <div class="box clearfix">
        <div class="headerBanner clearfix">
            <h3 class="font-size-large pull-left">Payment information</h3>
            <div class="pull-right hidden-xs hidden-sm"><iframe title="trustwave" scrolling="no" width="105" height="54" src="//valorebooks.com/trustwave" tabindex="-1"></iframe></div>
            <img class="pull-right lock" alt="lock" src="https://images.valorebooks.com/images/vb/web/shippingInfo/lock.png" />
        </div>

        <div class="col-xs-12">
            <h4 class="font-size-large newBrandPurple">Billing address <span>(as it appears on your credit card statement)</span></h4>

            <p><input id="useAddress" class="checkbox" type="checkbox" tabindex="13" name="offer" value="on" ng-model="consumer.useOneAddress" ng-init="consumer.useOneAddress=true"> Use my shipping address</p>

            <div class="shippingAddressBox">
                <g:render template="/body-parts/checkout/billing-address"/>
            </div>
            <div class="withBorder">
                <g:render template="/body-parts/checkout/credit-card-info"/>
            </div>
        </div>
    </div>
</form>