<g:each in="${best.keys()}" var="type">
<g:if test="${type != 'recommended'}">
    <div id="tab-${type}" role="tabpanel" class="tab-pane <g:if test="${type == lowestType}">active</g:if>">
    <div class="fullTab">
        <div class="container col-xs-12">
            <div class="border-thin col-xs-12 clearfix price-box">
                <span class="hidden" id="ProviderId_${type}">${best[type].best.provider.id}</span>
                <g:form class="add-to-cart" controller="cart" action="addItem">
                <g:if test="${type == 'rental'}">
                    <g:if test="${best[type].best.rbbSaleId}">
                        <input type="hidden" name="sellerMarket_id" value="${best[type].best.rbbSaleId}" id="SaleListingId_${type}"/>
                    </g:if>
                    <input type="hidden" name="listing_id" value="${best[type].best.id}" id="RentalListingId_${type}"/>
                </g:if><g:else>
                    <input type="hidden" name="sellerMarket_id" value="${best[type].best.id}" id="SaleListingId_${type}"/>
                </g:else>
                <div class="clearfix">
                    <div class="col-xs-5 col-md-6 no-pad-xs no-pad-sm">

                        <g:if test="${type == 'rental'}">
                            <div class="RentalHeroPrice moneyformat">$${best[type].best.price.semester}</div>
                            <input id="RentalHeroPrice" type="hidden" name="price" value="${best[type].best.price.semester}"/>
                        </g:if>
                        <g:else>
                            <div class="moneyformat">$${best[type].best.price.sale}</div>
                            <input type="hidden" name="price" value="${best[type].best.price.sale}"/>
                        </g:else>

                        <span class="italic gray font-size-small">$${best[type].best.shippingFee} Shipping</span>
                    </div>
                    <input type="hidden" name="type" value="${type}"/>
                    <input type="hidden" name="wd_id" value="null"/>
                    <input type="hidden" name="product_id" value="${product.id}"/>
                    <input type="hidden" name="a_listing" value="false"/>
                    <input type="hidden" name="create_cart" value="true"/>

                    <button type='submit' class="btn btn-default sharp pull-right btn-xl add-to-cart-btn" aria-label="<g:if test="${type=='rental'}">Rent Now</g:if><g:else>Add to Cart</g:else>"><g:if test="${type=='rental'}">Rent Now</g:if><g:else>Add to Cart</g:else></button>
                </div>

                <g:if test="${type=='rental'}">
                    <hr class="clearboth rentalBorder"/>

                    <div class="col-md-7 no-pad">
                        <label for="" class="font-size-large vertical-middle weight-normal">Rental Length</label>
                        <select name="term" id="" class="ValoreDropdown-rental s-hidden vertical-middle">
                            <option value="Semester" data-duedate="${best[type].best.dueDate.semester}" data-price="$${best[type].best.price.semester}">Semester</option>
                            <option value="Quarter" data-duedate="${best[type].best.dueDate.quarter}" data-price="$${best[type].best.price.quarter}">Quarter</option>
                        </select>
                    </div>
                    <br class="hidden-md hidden-lg"/>

                    <div class="col-md-5 no-pad">
                        <p class="newBrandPurple weight-normal">Your due date: <span id="RentalDueDate">${best[type].best.dueDate.semester}</span></p>
                        <button type="button" class="link-button" data-toggle="modal" data-target="#howRentalWorksModal"><u>How do rentals work?</u></button>
                    </div>
                    <s class="listPrice hide">$${product.listPrice}</s>
                </g:if>
                <input type="hidden" name="shippingType" value="${best[type].best.provider.shippingMethods[0]}"/>
                <input type="hidden" name="condition" value="${best[type].best.condition}"/>
                <input type="hidden" name="isbn" value="${product.productCode}"/>
                </g:form>
            </div>

            <g:if test="${product.listPrice && ((type =='rental' && (product.listPrice as Double) > (best[type].best.price.semester as Double)) || (type !='rental' && (product.listPrice as Double) > (best[type].best.price.sale as Double)))}">
            <div class="row gray price-list">
                <div class="col-xs-4">
                    <div class="italic">List Price</div>
                    <s class="listPrice">$${product.listPrice}</s>
                </div>

                <div class="col-xs-4">
                    <div class="italic">Discount</div>
                    <g:if test="${type == 'rental'}">
                        <span id="discount">${(100 - (best[type].best.price.semester as Double) / (product.listPrice as Double) * 100) as int}</span>% Off
                    </g:if>
                    <g:else>
                        ${(100 - (best[type].best.price.sale as Double) / (product.listPrice as Double) * 100) as int}% Off
                    </g:else>
                </div>

                <div class="col-xs-4">
                    <div class="italic">You Save</div>
                    <g:if test="${type == 'rental'}">
                        $<span id="sale">${String.format('%.2f', ((product.listPrice as Double) - (best[type].best.price.semester as Double)))}</span>
                    </g:if>
                    <g:else>
                        $${String.format('%.2f', ((product.listPrice as Double) - (best[type].best.price.sale as Double)))}
                    </g:else>
                </div>
            </div>
            <hr/>
            </g:if>
        </div>

        <hr class="hidden-md hidden-lg"/>

        <g:if test="${best[type].best.provider.recommended}">
            <div class="hidden-md hidden-lg clearboth text-center">
                <div class="rec-badge">
                    <hr/>
                    Recommended
                    <hr/>
                    <span class="glyphicon glyphicon-star text-top" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star large text-top" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star text-top" aria-hidden="true"></span>
                </div>
            </div>
        </g:if>

        <hr class="hidden-md hidden-lg"/>

        <div class="text-left col-xs-12  relative"> <!--hidden-xs hidden-sm-->
            <g:if test="${best[type].best.provider.recommended}">
                <div class="rec-badge rec-badge-full hidden-xs hidden-sm">
                    <span class="glyphicon glyphicon-star hidden-xs hidden-sm" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star large hidden-xs hidden-sm" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star hidden-xs hidden-sm" aria-hidden="true"></span>
                    <hr/>
                    Recommended
                    <hr/>
                    <span class="glyphicon glyphicon-star text-top" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star large text-top" aria-hidden="true"></span>
                    <span class="glyphicon glyphicon-star text-top" aria-hidden="true"></span>
                </div>
            </g:if>

            <div class="text-left">
                <g:if test="${best[type].best.quantity <= 5}"><p class="newBrandPurple hidden-md hidden-lg">${best[type].best.quantity} left in stock at this price</p></g:if>
                <h2 data-target="#AboutItemDropdown${type}" class="blue weight-normal dropdown-toggle hidden-md hidden-lg">About this item <span class="hidden-lg glyphicon glyphicon-menu-right"></span></h2>

                <div id="AboutItemDropdown${type}" class="mobile-accordion">
                    <ul class="spaced-list list-unstyled">
                        <li>
                            <p class="font-size-xl weight-normal hidden-xs hidden-sm">Item Details</p>
                        </li>
                        <li>
                            <span class="newBrandPurple weight-normal">Condition:</span> ${best[type].best.condition}
                        </li>
                        <li>
                            <span class="newBrandPurple weight-normal">Provider:</span>
                            <a aria-label="${best[type].best.provider.name}" href="${grailsApplication.config.valore.legacyUrl}/seller/${best[type].best.provider.name}/${best[type].best.provider.id}"><u>${best[type].best.provider.name}</u></a>
                            <a aria-label="contact" href="#contactSellerFromAnc" class="contact-link" data-type="${type}" onclick="contactForm(event)">Contact<i class="glyphicon glyphicon-menu-right"></i></a>
                        </li>
                        <li><span class="newBrandPurple weight-normal">Provider Rating:</span>
                            <div class="ratings-star">
                                <div class="ratings-top" style="width: ${best[type].best.provider.ratingPercent}%">
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
                            ${best[type].best.provider.ratingPercent}%</li>
                        <g:if test="${best[type].best.provider.city}">
                            <li><span class="newBrandPurple weight-normal">Ships From:</span> ${best[type].best.provider.city}, ${best[type].best.provider.state}</li>
                        </g:if><g:else>
                            <li><span class="newBrandPurple weight-normal">Ships From:</span> Multiple Locations</li>
                        </g:else>
                        <li>
                            <span class="newBrandPurple weight-normal">Shipping:</span> <g:each in="${best[type].best.provider.shippingMethods}" var="method" status="i">${method}<g:if test="${i != best[type].best.provider.shippingMethods.size() - 1}">, </g:if></g:each>
                            <g:if test="${best[type].best.provider.trackingAvailable}">(tracking available)</g:if>
                        </li>
                        <g:if test="${best[type].best.comment}">
                        <li>
                            <g:if test="${type=='alternate'}">
                                <span class="newBrandPurple weight-normal">Comments:</span> <span class="orange-dark bold">ALTERNATE EDITION:</span> ${raw(best[type].best.comment)}
                            </g:if>
                            <g:else>
                                <span class="newBrandPurple weight-normal">Comments:</span> ${raw(best[type].best.comment)}
                            </g:else>
                        </li>
                        </g:if>
                    </ul>
                    <hr/>
                    <div class="text-center seal-container">
                        <img class="vertical-middle" src="//images.valorebooks.com/images/vb/web/sellback/10656_home/sealv2.png" alt="seal" width="50" height="50"/>&nbsp;&nbsp;
                        <span class="newBrandPurple">30-day money back guarantee</span>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</g:if>
</g:each>