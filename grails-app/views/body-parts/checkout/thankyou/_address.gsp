<div class="box address clearfix">
    <div class="col-md-6 no-pad">
        <h3 class="font-size-xl headerBanner">Billing Address</h3>
        <p class="font-size-large">${consumer.defaultBilling.firstName} ${consumer.defaultBilling.lastName}</p>
        <p class="font-size-large">${consumer.defaultBilling.line1}</p>
        <g:if test="${consumer.defaultBilling.line2}">
            <p class="font-size-large">${consumer.defaultBilling.line2}</p>
        </g:if>
        <p class="font-size-large">${consumer.defaultBilling.city}, ${consumer.defaultBilling.state} ${consumer.defaultBilling.postalCode}</p>
        <p class="font-size-large">${consumer.defaultBilling.country}</p>
        <br/>
    </div>
    <div class="col-md-6 no-pad">
        <h3 class="font-size-xl headerBanner">Shipping Address</h3>
        <p class="font-size-large">${consumer.defaultShipping.firstName} ${consumer.defaultShipping.lastName}</p>
        <p class="font-size-large">${consumer.defaultShipping.line1}</p>
        <g:if test="${consumer.defaultShipping.line2}">
            <p class="font-size-large">${consumer.defaultShipping.line2}</p>
        </g:if>
        <p class="font-size-large">${consumer.defaultShipping.city}, ${consumer.defaultShipping.state} ${consumer.defaultShipping.postalCode}</p>
        <p class="font-size-large">${consumer.defaultShipping.country}</p>
      </div>
</div>
