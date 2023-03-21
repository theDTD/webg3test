<div class="col-md-12">
    <div class="market-list">
        <div class="col-md-12 market-list-head">
            <span class="font-size-xl purple font-weight-normal"><span id="marketProductType">Loading marketplace</span> prices</span> <span class="italic gray-lighter"><span id="marketCopies">${allQuantities}</span> copies from <span id="marketCopiesPrice" class="commaFormat">$${lowestPrice}</span></span>
            <button data-toggle="modal" data-target="#howRentalWorksModal" class="underline pull-right" id="rentals-info-link">How does the rental process work?</button>
        </div>
        <table id="MarketListTable" class="market-list-table" cellpadding="0" cellspacing="0">

        </table>
    </div>
    <div class="market-list-footer">
        <button class="more-market-list icon-link-bottom link-button-white font-size-large font-weight-normal hideOnSummary noUnderline" aria-label="View more results">View more<i class="glyphicon glyphicon-menu-down"></i></button>
    </div>
</div>

<script id="summary-separator-template" type="text/x-handlebars-template">
<tr class="summary-separator">
    <th colspan="4">
        <div id="market-list-head" class="col-md-12 market-list-head">
            <span class="font-size-xl purple font-weight-normal"><span>{{type}}</span> prices</span><span class="italic gray-lighter"><span> {{quantity}} </span> copies from <span class="commaFormat">{{price}}</span></span>
            <a class="open-tab pull-right" data-tabtype="{{type}}" href="#{{lowercase type}}-tab" aria-label="View more {{type}} prices">View more</a>
        </div>
    </th>
</tr>
</script>

<script id="marketlisting-template" type="text/x-handlebars-template">
<tr>
    <td><p class="moneyformat" id="MarketPrice{{uid}}">{{{moneyformat displayPrice}}}</p><span class="italic gray">{{dollaramount shippingFee}} shipping</span></td>
    <td>
        {{#if showType}}
            <span class="font-size-large purple">{{capitalize type}}</span><br /><br />
        {{/if}}
        <button class="link-button" type="button" data-toggle="modal" data-target="#bookConditionModal">Condition:</button><br />
        <span>{{condition}}</span>
    </td>
    <td>
        {{#if provider.recommended}}
        <div class="rec-badge rec-badge-full hidden-xs hidden-sm">
            <hr>
            Recommended
            <hr>
            <span class="glyphicon glyphicon-star text-top" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-star large text-top" aria-hidden="true"></span>
            <span class="glyphicon glyphicon-star text-top" aria-hidden="true"></span>
        </div>
        {{/if}}
        <ul class="spaced-list list-unstyled">
            <li><span class="newBrandPurple weight-normal">Provider:</span> <a href="/seller/{{provider.name}}/{{provider.id}}" aria-label="{{provider.name}} provider link"><u>{{provider.name}}</u></a>
                %{--{{#if isRental}}
                    {{#if rbbSaleId}}
                        <a href="/CustomerService.ContactSeller.RentalQueryFrame.do?listing_id={{id}}&sellerMarket_id={{rbbSaleId}}&a_listing=false&product_id=${product.id}#q_area" class="contact-link">Contact<i class="glyphicon glyphicon-menu-right"></i></a>
                    {{else}}
                        <a href="/CustomerService.ContactSeller.RentalQueryFrame.do?listing_id={{id}}&a_listing=false&product_id=${product.id}#q_area" class="contact-link">Contact<i class="glyphicon glyphicon-menu-right"></i></a>
                    {{/if}}
                {{else}}
                    <a href="/CustomerService.ContactSeller.PurchaseQueryFrame.do?sellerMarket_id={{id}}&a_listing=false&product_id=${product.id}#q_area" class="contact-link">Contact<i class="glyphicon glyphicon-menu-right"></i></a>
                {{/if}}--}%
            </li>
            <li>
                <span class="newBrandPurple weight-normal">Provider Rating:</span>

                <div class="ratings-star">
                    <div class='ratings-top' style="width: {{provider.ratingPercent}}%">
                        <g:each var="i" in="${ (0..<5) }">
                            <span class="glyphicon glyphicon-star star"></span>
                        </g:each>
                    </div>

                    <div class="ratings-bottom">
                        <g:each var="i" in="${ (0..<5) }">
                            <span class="glyphicon glyphicon-star star"></span>
                        </g:each>
                    </div>
                </div>
                ({{provider.rating}}) {{provider.ratingPercent}}%
            </li>

            {{#if provider.city}}
            <li><span class="newBrandPurple weight-normal">Ships From:</span> {{provider.city}}, {{provider.state}}</li>
            {{else}}
            <li><span class="newBrandPurple weight-normal">Ships From:</span> Multiple Locations</li>
            {{/if}}
            <li><span class="newBrandPurple weight-normal">Shipping:</span> {{#space provider.shippingMethods}}{{this}}{{/space}}</li>
            {{#if comment}}
            <li><span class="newBrandPurple weight-normal">Comments:</span> {{#if isAlternate}}<span class="orange-dark bold">ALTERNATE EDITION: </span>{{/if}}{{{comment}}}</li>
            {{/if}}

    </td>
    <td class="text-center">
        <g:form class="add-to-cart" controller="cart" action="addItem">
        {{#if isRental}}
            {{#if rbbSaleId}}
            <input type="hidden" name="sellerMarket_id" value="{{rbbSaleId}}"/>
            {{/if}}
            <p class="">Rental Length</p>
            <select name="term" class="ValoreDropdown-market s-hidden spaced-el">
                <option value="Semester" data-target="{{uid}}" data-duedate="{{dueDate.semester}}" data-price="{{price.semester}}">Semester</option>
                <option value="Quarter" data-target="{{uid}}" data-duedate="{{dueDate.quarter}}" data-price="{{price.quarter}}">Quarter</option>
            </select>

            <p class="newBrandPurple">Due date: <span id="MarketDueDate{{uid}}">{{dueDate.semester}}</span></p>

            <input id="RentalPrice{{uid}}" type="hidden" name="price" value="{{price.semester}}"/>
            <input type="hidden" name="type" value="{{type}}"/>
            <input type="hidden" name="wd_id" value="null"/>
            <input type="hidden" name="listing_id" value={{id}}>
            <input type="hidden" name="product_id" value="${product.id}"/>
            <input type="hidden" name="a_listing" value="false"/>
            <input type="hidden" name="create_cart" value="true"/>
            <input type="hidden" name="shippingType" value="{{provider.shippingMethods.[0]}}"/>
            <input type="hidden" name="condition" value="{{condition}}"/>
            <input type="hidden" name="isbn" value="${product.productCode}"/>
            <button type='submit' class="product-cta-link font-size-large" aria-label="Rent now from marketplace">Rent now <i class="glyphicon glyphicon-menu-right"></i></button>

        {{else}}
            <div class="spaced-el">
                <span class="qty-lbl">Quantity&nbsp;</span>
                {{#if (eq quantity 1)}}
                    <input type="hidden" name="quantity" value="1"/>
                    <span class="quantity1">1</span>
                {{else}}
                    <select name="quantity" class="ValoreDropdown s-hidden">
                        {{#maxn 99 quantity}}
                        <option value="{{this}}">{{this}}</option>
                        {{/maxn}}
                    </select>
                {{/if}}
            </div>

            <p class="italic gray font-size-small">{{quantity}} left in stock</p>
            <input type="hidden" name="price" value="{{price.sale}}"/>
            <input type="hidden" name="type" value="{{type}}"/>
            <input type="hidden" name="wd_id" value="null"/>
            <input type="hidden" name="sellerMarket_id" value="{{id}}"/>
            <input type="hidden" name="product_id" value="${product.id}"/>
            <input type="hidden" name="a_listing" value="false"/>
            <input type="hidden" name="create_cart" value="true"/>
            <input type="hidden" name="shippingType" value="{{provider.shippingMethods.[0]}}"/>
            <input type="hidden" name="condition" value="{{condition}}"/>
            <input type="hidden" name="isbn" value="${product.productCode}"/>
            <button type='submit' class="product-cta-link font-size-large" aria-label="Add to Cart from marketplace">Add to Cart <i class="glyphicon glyphicon-menu-right"></i></button>

        {{/if}}
        </g:form>
    </td>
</tr>
</script>