<div class="col-md-12 no-pad">
    <div class="col-xs-5 col-lg-6 no-pad">
    </div>
    <div class="col-xs-7 col-lg-6 sidebarWidth no-pad">
        <div class="totals">
            <ul>
                <li class="clearfix" ng-model="item.size" ng-init="item.size = ${itemCount}">Item total (<span class="item-size">${itemCount}</span>):<span id="itemTotal" ng-model="totals.item" ng-init="totals.item = ${itemTotal / 100}" class="pull-right moneyformat"><g:formatNumber number="${itemTotal / 100}" type="currency" currencyCode="USD"/></span></li>
                <li class="clearfix">Shipping:<span id="shippingTotal" ng-model="totals.shipping" ng-init="totals.shipping = ${shippingTotal / 100}" class="pull-right moneyformat ng-cloak">{{shippingTotal}}</span></li>
                <li class="clearfix hideOnCart">Sales tax:<span id="saleTax" class="tax pull-right"><span>$</span>0<span>.00</span></span></li>
                <li class="clearfix hideOnSidebar">Tax:
                    <span class="glyphicon glyphicon-question-sign shipping-icon">
                        <div class="tool-tip">
                            <i class="glyphicon glyphicon-triangle-top triangle"></i>
                            <div class="tip-inner">
                                <span class="white font-size-base bold">Tax will be determined at check<br> out based on your zip code.</span>
                                <p class="hide-tool-tip white hidden-lg hidden-md">Hide <span class="glyphicon glyphicon-menu-right"></span></p>
                            </div>
                        </div>
                    </span>
                    <span class="tax pull-right ng-binding gray-light"><span>$</span>0<span>.00</span></span>
                </li>
            </ul>
            <hr class="clearfix">
            <div class="clearfix">
                <span class="pull-right grand-total ng-cloak">{{total}}</span>
            </div>
        </div>
        <div class="checkout hidden-xs">
            <a href="${grailsApplication.config.valore.legacyUrl}/buy-textbooks" class="font-size-large newBrandPurple" aria-label="shop more"><i class="glyphicon glyphicon-menu-left"></i>Shop more</a>
            <g:form controller="checkout" action="index" class="checkoutForm">
                <input type="hidden" class="rnaItemCount" name="rnaItemCount" value="${rnaItemCount}"/>
                <button type="submit" class="btn btn-default sharp btn-xl pull-right cartBtn<g:if test="${itemCount == 0}"> disabled</g:if>" ng-class="{'disabled' : item.size == 0}" ng-disabled="item.size == 0"> Check out (<span class="item-size">${itemCount}</span>)</button>
            </g:form>
        </div>
    </div>
</div>
<hr class="hidden-md hidden-lg">

<nav class="navbar-fixed-bottom hidden-sm hidden-md hidden-lg">
    <g:form controller="checkout" action="index">
        <input type="hidden" class="rnaItemCount" name="rnaItemCount" value="${rnaItemCount}"/>
        <button type="submit" class="btn btn-default sharp btn-xl cartBtn<g:if test="${itemCount == 0}"> disabled</g:if>" ng-class="{'disabled' : item.size == 0}" ng-disabled="item.size == 0"> Check out (<span class="grand-total ng-cloak">{{total}}</span>) <i class="glyphicon glyphicon-menu-right"></i></button>
    </g:form>
</nav>