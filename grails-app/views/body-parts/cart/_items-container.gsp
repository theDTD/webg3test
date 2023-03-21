<div class="row clearfix cart-items">
    <g:render template="/body-parts/cart/items"/>

    <g:if test="${!cart?.items}">
        <g:render template="/body-parts/cart/empty-cart"/>
    </g:if>

    <div class="showEmptyCart">
        <g:render template="/body-parts/cart/empty-cart"/>
    </div>

    <g:if test="${cart?.items}">
        <g:render template="/body-parts/cart/total"/>
    </g:if>
</div>