<%
    def itemCount = cart.items?.findAll({it.state != 'REMOVED_NOT_AVAILABLE'})?.size()
%>
<div class="col-md-4 no-pad sidebar">
    <h2 class="font-size-large gray-dark">Your cart <span class="purple">(<span class="item-size">${itemCount}</span> item<g:if test="${itemCount > 1}">s</g:if>)</span></h2>

    <g:render template="/body-parts/cart/items-container" model="[itemCount : itemCount]"/>
    <g:if test="${cartContainsRental}">
    <div class="cartLinks">
        <g:link url="https://help.valorebooks.com/article/323-rental-returns" target="_blank">Rental returns</g:link>
        <g:link url="https://help.valorebooks.com/article/342-rental-policies" target="_blank">Rental policies</g:link>
    </div>
    </g:if>
    <g:link class="font-size-large editCart newBrandPurple" controller="cart" action="index"><i class="glyphicon glyphicon-menu-left"></i> Edit cart</g:link>
    <p class="font-size-17 hidden-lg hidden-md text-center pb-2 mt-n2">* By placing your order, you agree to Valore's <a href="https://help.valorebooks.com/article/337-legal-policies" class="inline newBrandPurple" target="_blank"> terms</a> <g:if test="${!cartContainsRental}">.</g:if><g:else><span>and <a href="https://help.valorebooks.com/article/342-rental-policies" class="inline newBrandPurple" target="_blank">rental policies.</a></span></g:else></p>

</div>
