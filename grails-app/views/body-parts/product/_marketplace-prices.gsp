<%
    def allQuantities = {
        def quantity = 0
        for (def type : best.keys()) {
            if (type != 'recommended')
                quantity += best[type].totalQuantity
        }
        quantity
    }()
%>
<div class="row hidden-xs hidden-sm marketplacePrices">
    <h2 class="weight-normal font-size-xl col-md-12">Marketplace prices</h2>
    <div class="row seven-cols market-list-nav">
        <div class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center active">
            <a aria-label="summary" class="marketplace-tab noUnderline" id="summary-tab" href="" data-tabtype="summary" data-quantity="${allQuantities}" data-price="$${lowestPrice}">
                <p class="newBrandPurple font-size-large weight-normal">Summary</p>
            </a>
        </div>
        <g:if test="${best['recommended']}">
        <div class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center">
            <g:if test="${best['recommended'].best.price.sale}">
            <a aria-label="Recommended ${best['recommended'].totalQuantity} from $${best['recommended'].best.price.sale}" class="marketplace-tab noUnderline"  id="recommended-tab" href="" data-tabtype="Recommended" data-quantity="${best['recommended'].totalQuantity}" data-price="$${best['recommended'].best.price.sale}">
                <p class="newBrandPurple font-size-large weight-normal ">Recommended</p>
                    <span class="font-size-small gray-light italic">${best['recommended'].totalQuantity} from $${best['recommended'].best.price.sale}</span>
            </g:if><g:else>
            <a aria-label="Recommended ${best['recommended'].totalQuantity} from $${best['recommended'].best.price.semester}" class="marketplace-tab noUnderline"  id="recommended-tab" href="" data-tabtype="Recommended" data-quantity="${best['recommended'].totalQuantity}" data-price="$${best['recommended'].best.price.semester}">
                <p class="newBrandPurple font-size-large weight-normal ">Recommended</p>
                    <span class="font-size-small gray italic commaFormat">${best['recommended'].totalQuantity} from $${best['recommended'].best.price.semester}</span>
            </g:else>
            </a>
        </div>
        </g:if>
        <g:if test="${best['used']}">
        <div class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center">
            <a  aria-label="used ${best['used'].totalQuantity} from $${best['used'].best.price.sale}" class="marketplace-tab noUnderline" id="used-tab" href="" data-tabtype="Used" data-quantity="${best['used'].totalQuantity}" data-price="$${best['used'].best.price.sale}">
                <p class="newBrandPurple font-size-large weight-normal ">Used</p>
                <span class="font-size-small gray italic commaFormat">${best['used'].totalQuantity} from $${best['used'].best.price.sale}</span>
            </a>
        </div>
        </g:if>
        <g:if test="${best['new']}">
        <div class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center">
            <a aria-label="New ${best['new'].totalQuantity} from $${best['new'].best.price.sale}" class="marketplace-tab noUnderline" id="new-tab" href="" data-tabtype="New" data-quantity="${best['new'].totalQuantity}" data-price="$${best['new'].best.price.sale}">
                <p class="newBrandPurple font-size-large weight-normal ">New</p>
                <span class="font-size-small gray italic commaFormat">${best['new'].totalQuantity} from $${best['new'].best.price.sale}</span>
            </a>
        </div>
        </g:if>
        <g:if test="${best['rental']}">
        <div class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center">
            <a aria-label="rentals ${best['rental'].totalQuantity} from $${best['rental'].best.price.semester}" class="marketplace-tab noUnderline" id="rental-tab" href="" data-tabtype="Rental" data-quantity="${best['rental'].totalQuantity}" data-price="$${best['rental'].best.price.semester}">
                <p class="newBrandPurple font-size-large weight-normal">Rentals</p>
                <span class="font-size-small gray italic commaFormat">${best['rental'].totalQuantity} from $${best['rental'].best.price.semester}</span>
            </a>
        </div>
        </g:if>
        <g:if test="${best['alternate']}">
        <div class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center">
            <a aria-label="alternate ${best['alternate'].totalQuantity} from $${best['alternate'].best.price.sale}" class="marketplace-tab noUnderline" id="alternate-tab" href="" data-tabtype="Alternate" data-quantity="${best['alternate'].totalQuantity}" data-price="$${best['alternate'].best.price.sale}">
                <p class="newBrandPurple font-size-large weight-normal ">Alternate</p>
                <span class="font-size-small gray italic commaFormat">${best['alternate'].totalQuantity} from $${best['alternate'].best.price.sale}</span>
            </a>
        </div>
        </g:if>
        <div class="col-lg-1 col-md-3 col-sm-4 col-xs-6 text-center">
            <a aria-label="all ${allQuantities} from $${lowestPrice}" class="marketplace-tab noUnderline" id="all-tab" href="" data-tabtype="" data-quantity="${allQuantities}" data-price="$${lowestPrice}">
                <p class="newBrandPurple font-size-large weight-normal ">All</p>
                <span class="font-size-small gray italic commaFormat">${allQuantities} from $${lowestPrice}</span>
            </a>
        </div>
    </div>

    <g:render template="/body-parts/product/marketplace-prices-content" model="[allQuantities: allQuantities, lowestPrice: lowestPrice]"/>
</div>