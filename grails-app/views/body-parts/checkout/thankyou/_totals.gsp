<%
    Integer tax = 0
    Integer shipping = 0
    Integer itemTotal = 0
    for(def item : transaction.saleTransactionProducts){
        tax += [item.stateTaxAmount?:0 , item.countyTaxAmount?:0 , item.cityTaxAmount?:0 , item.specialDistrictTaxAmount?:0].sum(0)
        shipping += item.shippingAmount?:0
        itemTotal += item.itemAmount?:0 + item.priceModificationAmount?:0 - item.promotionAmount?:0
    }
%>
<div class="clearfix col-md-12 no-pad">
    <div class="totals">
        <ul>
            <li class="clearfix"><label>Item total:</label><vb:moneyFormat class="pull-right total" value="${itemTotal}"/></li>
            <li class="clearfix"><label>Shipping total:</label><vb:moneyFormat class="pull-right total" value="${shipping}"/></li>
            <li class="clearfix"><label>Sales tax:</label><vb:moneyFormat class="pull-right total" value="${tax}"/></li>
        </ul>
        <hr class="clearfix">
        <div class="clearfix">
            <vb:moneyFormat class="pull-right grand-total" value="${transaction.total}"/>
        </div>
    </div>
</div>