<div class="row">
    <ul class="nav nav-gray-gradient" id="PurchaseRentNav">
        <g:each in="['rental', 'used', 'new', 'alternate']" var="type"> %{-- The order is important, that is why we do it this way --}%
            <g:if test="${best[type]}">
                <li role="presentation" class="col-xs-3 <g:if test="${type=='rental'}">rental-tab-active</g:if> <g:if test="${type == lowestType}">active</g:if>">
                    <g:if test="${type == 'rental'}">
                        <a aria-label="${type.capitalize()} $${best[type].best.price.semester}" id="tabLink-${type}"  class="newBrandPurple" href="#tab-${type}" aria-controls="tab-${type}" role="tab" data-toggle="tab" data-price="${best[type].best.price.semester}">
                    </g:if><g:else>
                        <a aria-label="${type.capitalize()} $${best[type].best.price.sale}" id="tabLink-${type}" class="newBrandPurple" href="#tab-${type}" aria-controls="tab-${type}" role="tab" data-toggle="tab" data-price="${best[type].best.price.sale}">
                    </g:else>
                        ${type.capitalize()}
                        <p class="price commaFormat newBrandPurple">
                            <g:if test="${type == 'rental'}">
                                <span class="RentalHeroPrice">$${best[type].best.price.semester}</span>
                            </g:if><g:else>
                                $${best[type].best.price.sale}
                            </g:else>
                        </p>
                    </a>
                </li>
            </g:if>
        </g:each>
    </ul>
</div>
<div class="row border-primary text-center cta-box tab-content" id="DetailsCTA">
    <g:if test="${best}">
        <g:render template="/body-parts/product/tab-content" model="[lowestType: lowestType]"/>
    </g:if><g:else>
        <p class="main-header" style="margin-right: 20px">Out of Stock</p>
        <p style="margin: 0 20px 5px 0;">The item you're looking for is currently unavailable.</p>
    </g:else>
</div>