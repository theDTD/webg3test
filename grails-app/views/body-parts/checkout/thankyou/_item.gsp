<%@ page import="com.valore.util.DateUtil" %>
<%
    boolean isRental = item.saleType.toLowerCase().contains("rental")
    def dueDate
    if(isRental){
        dueDate = DateUtil.Constants.IN.get().parse(item.saleTransactionProductRental.currentReturnByDate)
    }
    def itemAmount = item.itemAmount?:0 + item.priceModificationAmount?:0 - item.promotionAmount?:0
%>

<div class="col-md-12 no-pad cart-row">
    <div class="col-md-6 clearfix">
        <div class="col-xs-12 no-pad details">
            <img class="item-img col-xs-2 no-pad" alt="product image" src="${item.product.image.substring(item.product.image.indexOf("//"))}"/>
            <vb:productLink title="${item.product.name}" edition="${item.product.edition}" isbn="${item.product.productCode}">
                <h3 class="font-size-large newBrandPurple">${item.product.name}</h3>
            </vb:productLink>
            <div class="col-xs-8 no-pad">
                <div>
                    <p class="author"><vb:author attributes="${item.product.attributes}"/></p>
                </div>
                <div>
                    <p><span class="bold">ISBN:</span> ${item.product.productCode}</p>
                    <p><span class="bold">Condition:</span> ${item.condition}</p>
                    <p class="hidden-lg hidden-md">
                        <span class="bold">Shipping:</span> ${item.shippingType.name} (<g:formatNumber number="${item.shippingAmount / 100}" type="currency" currencyCode="USD"/>)
                        <span class="glyphicon glyphicon-question-sign shipping-icon" ng-cloak ng-click="tooltipVisible = !tooltipVisible" ng-init="tooltipVisible = false"></span>
                    </p>
                    <div class="tool-tip shipping-icon" ng-cloak ng-show="tooltipVisible">
                        <div class="tip-inner">
                            <h4 class="white">Shipping options</h4>
                            <span class="white">Standard: 4-14 Business Days</span><br/>
                            <span class="white">Expedited: 2-5 Business Days</span>
                            <p class="hide-tool-tip white" ng-click="tooltipVisible = !tooltipVisible">Hide <span class="glyphicon glyphicon-menu-right"></span></p>
                        </div>
                    </div>
                    <g:if test="${isRental}">
                        <p class="hidden-lg hidden-md"><span class="bold">Rental Length: </span> ${item.saleTransactionProductRental.rentalTerm}</p>
                        <p class="hidden-lg hidden-md"><span class="bold">Due Date: </span> <g:formatDate date="${dueDate}" type="date"/></p>
                    </g:if>
                    <p class="hidden-lg hidden-md"><span class="bold">Quantity:</span> 1</p>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6 no-pad">
        <div class="row hidden-xs hidden-sm details" ng-class="{ true: 'rental-length', false: 'no-rental-length'}[${isRental}]">
            <g:if test="${isRental}">
                <p><span class="bold">Rental Length: </span> ${item.saleTransactionProductRental.rentalTerm} (Due <g:formatDate date="${dueDate}" type="date" /> )</p>
            </g:if>
        </div>

        <div class="col-md-6 no-pad-left details">
            <div class="row hidden-xs hidden-sm">
                <p><span class="bold">Quantity:</span> 1</p>
                <span class="bold">Shipping:</span> ${item.shippingType.name} (<g:formatNumber number="${item.shippingAmount / 100}" type="currency" currencyCode="USD"/>)
                <span class="glyphicon glyphicon-question-sign shipping-icon">
                    <div class="tool-tip">
                        <i class="glyphicon glyphicon-triangle-top triangle"></i>
                        <div class="tip-inner">
                            <h4 class="white">Shipping options</h4>
                            <span class="white">Standard: 4-14 Business Days</span>
                            <span class="white">Expedited: 2-5 Business Days</span>
                        </div>
                    </div>
                </span>
            </div>
        </div>

        <div class="col-md-6 clearfix price-data">
            <g:if test="${item.product.listPrice && item.product.listPrice > itemAmount}">
                <h4 class="pull-right gray-light hidden-xs hidden-sm">
                    List:
                    <s>
                        <g:formatNumber number="${item.product.listPrice / 100}" type="currency" currencyCode="USD"/>
                    </s>
                </h4>
            </g:if>
            <g:else>
                <br/>
            </g:else>
            <div class="clearfix">
                <vb:moneyFormat class="pull-right purple" value="${itemAmount}"/>
            </div>
        </div>
    </div>

    <g:if test="${isRental}">
        <img class="cart-arrow" alt="rent arrow" src="//img.valorebooks.com/images/vb/web/cart-arrows/rentArrowV2.png" />
    </g:if>
    <g:elseif test="${item.shippingType.name == 'Digital Delivery'}">
        <img class="cart-arrow" alt="digital arrow" src="//img.valorebooks.com/images/vb/web/cart-arrows/digital-arrow.png" />
    </g:elseif>

    <hr class="hidden-lg hidden-md">
</div>





