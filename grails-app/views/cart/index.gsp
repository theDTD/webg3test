<%@ page contentType="text/html;charset=UTF-8" %>
<%
    def itemCount = cart?.items?.findAll({it.state != 'REMOVED_NOT_AVAILABLE'})?.size()
%>

<html>
<head>
    <meta name="layout" content="layout-two"/>
    <title></title>
    <asset:javascript src="angular.min.js"/>
    <asset:javascript src="angular-recaptcha.min.js"/>
    <g:render template="/head-includes/ga4"/>
    <g:javascript>
        var cart = JSON.parse("${cart}");
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
    </g:javascript>
    <script>
        let addCartId = '${addedItem}';
        if (addCartId) {
            let lastAddedToCart = cart.items.find( item => item.id == addCartId);
            let price = Number(lastAddedToCart.currentPrice) / 100;
            gtag('event', 'add_to_cart', {
                currency: 'USD',
                items: [{
                    item_id: lastAddedToCart.id,
                    item_name: lastAddedToCart.product.name,
                    item_category: 'book',
                    item_category2: lastAddedToCart.sale ? 'sale' : 'rent',
                    price: price,
                    quantity: lastAddedToCart.quantity
                }],
                value: price * lastAddedToCart.quantity,
            });
        } else {
            cart.items = cart.items.filter( item => item.state !== "REMOVED_NOT_AVAILABLE");
            let items = [];
            let total = 0;
            cart.items.forEach ( item => {
                let price = Number(item.currentPrice) / 100;
                items.push({
                    item_id: item.id,
                    item_name: item.product.name,
                    item_category: 'book',
                    item_category2: item.sale ? 'sale' : 'rent',
                    price: price,
                    quantity: item.quantity
                });
                total += price * item.quantity;
            });
            gtag('event', 'view_cart', {
                currency: 'USD',
                items: items,
                value: total
            });
        }
    </script>
</head>

<body class="cart">
<br/>
<div class="container" ng-app="myApp" ng-controller="checkoutCtrl">
    <div class="row top-header navbar-fixed-top<g:if test="${!cart?.items}"> emptyCartNav</g:if>">
        <g:if test="${cart?.items}">
            <div class="col-md-3 col-xs-5 no-pad-right">
                <a aria-label="shop more" href="${grailsApplication.config.valore.legacyUrl}/buy-textbooks" class="font-size-large newBrandPurple"><i class="glyphicon glyphicon-menu-left"></i> Shop more</a>
            </div>
        </g:if>
        <div class="col-md-6 no-pad hidden-sm hidden-xs <g:if test="${!cart?.items}">col-md-12 center</g:if>">
            <h1 class="main-header">Your shopping cart<g:if test="${!cart?.items}"> is empty</g:if></h1>
        </div>
        <g:if test="${cart?.items}">
            <div class="col-md-3 col-xs-7 no-pad">
                <g:form controller="checkout" action="index">
                    <input type="hidden" class="rnaItemCount" id="rnaItemCount" name="rnaItemCount" value="${rnaItemCount}"/>
                    <button type="submit" class="btn btn-default cartBtn sharp pull-right btn-xl hidden-sm hidden-xs<g:if test="${itemCount == 0}"> disabled</g:if>" ng-class="{'disabled' : item.size == 0}" ng-disabled="item.size == 0"> Check out (<span class="item-size">${itemCount}</span>)</button>
                </g:form>
                <span class="newBrandPurple font-size-large pull-right hidden-md hidden-lg">Your cart <span class="purple ng-cloak">(<span class="item-size">${itemCount}</span> {{item.size != 1 ? 'items' : 'item'}})</span></span>
            </div>
        </g:if>
    </div>
    <g:if test="${cart?.items}">
        <div class="row navbar-fixed-top cart-held-time">
            Prices this good go fast! Your cart will be held for 5 minutes.
        </div>
    </g:if>
    <g:render template="/body-parts/cart/items-container" model="[itemCount: itemCount]"/>

    <div class="cart-ad row"></div>
</div>

<asset:javascript src="MoneyHTMLFormatter.js"/>
<asset:javascript src="pages/checkout.js"/>
</body>
</html>