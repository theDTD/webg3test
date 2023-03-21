<g:if test="${!transaction.promotion && transaction.siteId == grailsApplication.config.valore.affiliate.commissionJunction.siteId}">
    <g:if test="${rentalTotal > 0}">
        <img src="https://www.emjcd.com/u?AMOUNT=${rentalTotal / 100}&DISCOUNT=0&CID=${grailsApplication.config.valore.affiliate.commissionJunction.cid}&OID=R${transaction.id}&TYPE=${grailsApplication.config.valore.affiliate.commissionJunction.type.rental}&CURRENCY=USD&METHOD=IMG" height="1" width="20">
    </g:if>
    <g:if test="${saleTotal > 0}">
        <img src="https://www.emjcd.com/u?AMOUNT=${saleTotal / 100}&DISCOUNT=0&CID=${grailsApplication.config.valore.affiliate.commissionJunction.cid}&OID=S${transaction.id}&TYPE=${grailsApplication.config.valore.affiliate.commissionJunction.type.sale}&CURRENCY=USD&METHOD=IMG" height="1" width="20">
    </g:if>
</g:if>
