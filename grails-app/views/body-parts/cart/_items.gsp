<g:each status="index" var="item" in="${cart?.items?.sort{a, b -> b.dateCreated <=> a.dateCreated}}">
    <div class="col-md-12 no-pad cart-row row-remove${item.id}" ng-cloak ng-class="{'added' : ${item.id == addedItem},
                                                                           'hideOnSidebar removed' : ${item.state == 'REMOVED_NOT_AVAILABLE'}}">
        <h2 class="purple font-size-xl" ng-cloak ng-hide="${item.id != addedItem && item.state != 'REMOVED_NOT_AVAILABLE'}">
            <g:if test="${item.id == addedItem}">You just added:
        </h2>
            </g:if>
            <g:elseif test="${item.state == 'REMOVED_NOT_AVAILABLE'}">
                Item no longer in cart:
        </h2>
        <p class="gray-light removed">Sorry, it looks like someone else snatched up the following book. Luckily, you can still find great prices on this book from other sellers in our marketplace.</p>
            </g:elseif>
            <g:else>
        </h2>
            </g:else>
        <div class="col-md-6 sidebarWidth clearfix">
            <div class="col-xs-12 no-pad details">
                <img class="item-img col-xs-2 no-pad" alt="product image" src="${item.product.image.substring(item.product.image.indexOf("//"))}" />
                <div class="col-xs-8 no-pad">
                    <vb:productLink title="${item.product.name}" edition="${item.product.edition}" isbn="${item.product.productCode}">
                        <h3 class="font-size-large newBrandPurple bookTitle">${item.product.name}</h3>
                    </vb:productLink>
                    <div class="bookAttribute"><vb:author attributes="${item.product.attributes}"/></div>
                    <div class="bookAttribute"><span class="bold">ISBN:</span> ${item.product.productCode}</div>
                    <div class="bookAttribute"><span class="bold">Condition:</span> ${item.condition}</div>
                    <g:if test="${!(item.bookType ==~ /(?i)NORMAL/ || item.bookType ==~ /(?i)DIGITAL_ALTERNATE/)}">
                        <span class="bookAttribute orange-dark bold">ALTERNATE EDITION </span>
                        <span class="glyphicon glyphicon-question-sign shipping-icon">
                            <div class="tool-tip alternateEdition">
                                <i class="glyphicon glyphicon-triangle-top triangle alternateEdition"></i>
                                <div class="tip-inner alternateEdition">
                                    <p class="white">You have selected an alternate edition of this textbook. Alternate editions may include international,
                                    instructor, or previous edition textbooks that can differ slightly from the regular edition.
                                    These editions may not include supplementary materials such as workbooks and CDs.
                                    Please read the seller comments carefully for more information.</p>
                                </div>
                            </div>
                        </span>
                    </g:if>
                    <div class="bookAttribute hideOnCart"><span class="bold">Quantity:</span> ${item.quantity}</div>
                    %{--<p><span class="bold">Shipping:</span> <g:if test="${item.shippingType.name == "Second Day"}">2nd Day</g:if><g:else>${item.shippingType.name}</g:else> <g:if test="${item?.shippingCost}">(+ <g:formatNumber number="${item.shippingCost / 100}" type="currency" currencyCode="USD"/>)</g:if></p>--}%
                    <g:if test="${item.renterMarketId}">
                        <div class="bookAttribute"><span class="bold">Rental:</span> ${item.rentalTerm}</div>
                    </g:if>
                </div>
            </div>
        </div>
        <div class="col-md-6 no-pad sidebarWidth">
            <div class="col-md-12 no-pad items-right">
                <div class="col-md-8 no-pad-left hideOnSidebar">
                    <form>
                        <div class="row">
                            <label class="col-xs-4 no-pad-left">
                                Shipping:
                            </label>
                            <div class="col-xs-8 no-pad-left">
                                <div class="styled-select">
                                    <select ng-cloak ng-class="{'disabled' : ${item.state == 'REMOVED_NOT_AVAILABLE'}}" ng-disabled="${item.state == 'REMOVED_NOT_AVAILABLE'}" class="shipping-price" ng-change="updateShipping(${item.id})"  ng-model="shippingMethod${item.id}">
                                        <g:if test="${item.state != 'REMOVED_NOT_AVAILABLE'}">
                                            <g:each var="shippingMethod" in="${item.shippingMethods.sort{it.value}}">
                                                <option data-price="${shippingMethod.value}" value="${shippingMethod.key}" <g:if test="${item.shippingType.name == shippingMethod.key}">ng-init="shippingMethod${item.id}='${shippingMethod.key}'"</g:if>>
                                                    <g:if test="${shippingMethod.key == 'Standard'}">
                                                        <g:formatNumber number="${shippingMethod.value / 100}" type="currency" currencyCode="USD" /> : 4 - 14 business days
                                                    </g:if>
                                                    <g:elseif test="${shippingMethod.key == 'Expedited'}">
                                                        <g:formatNumber number="${shippingMethod.value / 100}" type="currency" currencyCode="USD" /> : 2 - 5 business days
                                                    </g:elseif>
                                                    <g:else>
                                                        ${shippingMethod.key} <g:if test="${shippingMethod?.value}">( <g:formatNumber number="${shippingMethod.value / 100}" type="currency" currencyCode="USD" /> )</g:if>
                                                    </g:else>
                                                </option>
                                            </g:each>
                                        </g:if>
                                        <g:else>
                                            <option ng-init="shippingMethod${item.id}='N/A'">N/A</option>
                                        </g:else>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <g:if test="${item.renterMarketId}">
                            <div class="row">
                                <label class="col-xs-4 rentalLength">Rental Length:</label>
                                <div class="col-xs-8 no-pad-left">
                                    <div class="styled-select">
                                        <select ng-cloak ng-class="{'disabled' : ${item.state == 'REMOVED_NOT_AVAILABLE'}}" ng-disabled="${item.state == 'REMOVED_NOT_AVAILABLE'}" class="rentalDropDown${item.id}" ng-change="updateRentalLength(${item.id})"  ng-model="rentalLength${item.id}">
                                            <g:if test="${item.state != 'REMOVED_NOT_AVAILABLE'}">
                                                <option value="Semester" <g:if test="${item.rentalTerm == 'Semester'}">ng-init="rentalLength${item.id}='Semester'"</g:if> >Semester (${item.rentalDueDates.Semester})</option>
                                                <option value="Quarter" <g:if test="${item.rentalTerm == 'Quarter'}">ng-init="rentalLength${item.id}='Quarter'"</g:if> >Quarter (${item.rentalDueDates.Quarter})</option>
                                            </g:if>
                                            <g:else>
                                                <option ng-init="rentalLength${item.id}='N/A'">N/A</option>
                                            </g:else>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </g:if>
                        <div class="row">
                            <label class="col-xs-4">Quantity:</label>
                            <div class="col-xs-8 no-pad-left">
                                <span class="quantityOne">${item.quantity}</span>
                                <div class="styled-select quantity pull-left hidden">
                                    <select>
                                        <option value="quantity">1</option>
                                        <option value="quantity">2</option>
                                    </select>
                                </div>
                                <a class="remove" aria-label="remove" ng-click="removeClick(${item.id}, ${item.state == 'REMOVED_NOT_AVAILABLE'}, '${item.productId}', '${item.product.productCode}', ${item.currentPrice}, ${item.quantity}, '${item.sale ? "sale" : "rent"}', '${(item.product.name).replaceAll("'","\\\\'")}');" href=""><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Remove</a>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-4 sidebarWidth price clearfix">
                    <g:if test="${item.product.listPrice}">
                        <h4 class="gray-light hidden-xs hidden-sm hideOnSidebar"><span>List:</span>
                            <s>
                                <g:formatNumber number="${item.product.listPrice / 100}" type="currency" currencyCode="USD" />
                            </s>
                        </h4>
                    </g:if>
                    <span class="hidden-lg hidden-md gray-dark pull-left">Price:</span>
                    <h4 class="gray-light hidden-md hidden-lg hideOnSidebar">
                        <s>
                            <g:if test="${item.product.listPrice}">
                                <g:formatNumber number="${item.product.listPrice / 100}" type="currency" currencyCode="USD" />
                            </g:if>
                        </s>
                    </h4>
                    <span class="purple itemPrice${item.id} itemPrice moneyformat" data-price="${item.currentPrice}">
                        <g:if test="${item.state == 'REMOVED_NOT_AVAILABLE'}">
                            N/A
                        </g:if>
                        <g:else test="${item.currentPrice}">
                            <g:formatNumber number="${item.currentPrice / 100}" type="currency" currencyCode="USD" />
                        </g:else>
                    </span>
                </div>
            </div>
        </div>

        <g:if test="${item.renterMarketId}">
            <img class="cart-arrow" alt="rent arrow" src="//img.valorebooks.com/images/vb/web/cart-arrows/rentArrowV2.png" />
        </g:if>

        <img class="cart-arrow hidden" alt="cart arrow" src="//img.valorebooks.com/images/vb/web/cart-arrows/digital-arrow.png" />
    </div>
    <hr class="hidden-lg hidden-md">
</g:each>