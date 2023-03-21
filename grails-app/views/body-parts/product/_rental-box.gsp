<div class="rent-box">
    <h2 class="newBrandPurple">
        You can <span class="italic purple">save</span> <span class="moneyformat purple">${String.format('%.2f', ((best[type].best.price.sale as Double) - (best.rental.best.price.semester as Double)))}</span><br />
        by renting this book!
    </h2>
    <div class="col-xs-12 no-pad">
        <div class="col-xs-6 no-pad">
            <h3 class="purple">
                Buy the book for<br />
                <span class="moneyformat">$${best[type].best.price.sale}</span>
            </h3>
            <g:form controller="cart" action="addItem">
                <input type="hidden" value="null" name="wd_id">
                <input type="hidden" value="${product.id}" name="product_id">
                <input type="hidden" value="false" name="a_listing">
                <input type="hidden" value="true" name="create_cart">
                <input type="hidden" name="sellerMarket_id" value="${best[type].best.id}" id="SaleListingId_${type}"/>
                <input type="hidden" name="shippingType" value="${best[type].best.provider.shippingMethods[0]}"/>
                <input type="hidden" name="condition" value="${best[type].best.condition}"/>
                <input type="hidden" name="isbn" value="${product.productCode}"/>
                <button type="submit" class="addCartLink font-size-xl">Add to Cart <i class="glyphicon glyphicon-menu-right"></i></button>
            </g:form>
        </div>
        <div class="col-xs-6 no-pad">
            <h3 class="purple">
                Rent the book for<br />
                <span class="moneyformat">$${best.rental.best.price.semester}</span>
            </h3>
            <g:form controller="cart" action="addItem">
                <input type="hidden" name="semesterRentalPrice" value="${best.rental.best.price.semester}"/>
                <input type="hidden" name="sellerMarket_id" value="${best.rental.best.rbbSaleId}" />
                <input type="hidden" name="listing_id" value="${best.rental.best.id}" />
                <input type="hidden" value="null" name="wd_id">
                <input type="hidden" value="${product.id}" name="product_id">
                <input type="hidden" value="false" name="a_listing">
                <input type="hidden" value="true" name="create_cart">
                <input type="hidden" value="Semester" name="term">
                <input type="hidden" name="shippingType" value="${best.rental.best.provider.shippingMethods[0]}"/>
                <input type="hidden" name="condition" value="${best.rental.best.condition}"/>
                <input type="hidden" name="isbn" value="${product.productCode}"/>
                <button type="submit" class="btn btn-default sharp btn-xl">Rent Now</button>
            </g:form>
        </div>
    </div>
</div>