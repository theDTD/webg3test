<div class="col-xs-12 border-bottom-thin no-pad product-details-section" id="ProductDetailsSection">
    <span id="contactSellerFromAnc"></span>
    <form class="col-md-7 pull-right main-contact" id="MainContact" action="" method="post">
        <div class="col-md-12">
            <p class="purple asktext">Ask the provider about this item.</p>
            Most renters respond to questions in 48 hours or less.<br/>
            The response will be emailed to you.
            <hr/>
            <div class="formgroup clearfix">
                <label for="" class="col-xs-12 col-md-4">First name <span class="orange">*</span></label>
                <input name="firstName" type="text" class="col-xs-12 col-md-8" required/>
            </div>
            <div class="formgroup clearfix">
                <label for="" class="col-xs-12 col-md-4">Last name <span class="orange">*</span></label>
                <input name="lastName" type="text" class="col-xs-12 col-md-8" required/>
            </div>
            <div class="formgroup clearfix">
                <label for="" class="col-xs-12 col-md-4">Email address <span class="orange">*</span></label>
                <input name="email" id="email" type="text" class="col-xs-12 col-md-8" required/>
            </div>
            <div class="formgroup clearfix">
                <label for="" class="col-xs-12 col-md-4">Confirm email <span class="orange">*</span></label>
                <input name="confirmEmail" id="confirmEmail" type="text" class="col-xs-12 col-md-8" required/>
            </div>
            <div class="formgroup clearfix">
                <label for="" class="col-xs-12 col-md-4">Your message<span class="orange">*</span></label>
                <textarea name="message" class="col-xs-12 col-md-8" required></textarea>
            </div>

            <input type="hidden" name="listing_id" id="ContactRentalId" value=""/> %{-- rentableProduct.id aka listing_id --}%
            <input type="hidden" name="sellerMarket_id" id="ContactSaleId" value=""/> %{-- saleListing.id --}%

            <input type="hidden" name="subject" value="4"/>
            <input type="hidden" name="a_listing" value="false"/>
            <input type="hidden" name="marketUser" id="ContactProviderId" value=""/> %{-- marketUser.id --}%
            <input type="hidden" name="product_id" value="${product.id}"/>
            <div class="col-md-offset-4 col-md-8"><a href="" id="contact_cancel" aria-label="cancel"><i class="glyphicon glyphicon-menu-left"></i> Cancel</a><button type="submit" href="" class="sendmsg pull-right btn btn-link">Send message <i class="glyphicon glyphicon-menu-right"></i></button></div>
        </div>
    </form>
    <div class="details-wrapper">

        <h2 data-target="#ProductDetailsDropdown" data-toggle="dropdown" class="blue weight-normal dropdown-toggle">Product details <span class="hidden-lg glyphicon glyphicon-menu-right"></span></h2>

        <div id="ProductDetailsDropdown" class="mobile-accordion">
            <ul class="font-size-base col-md-3 no-pad" id="DetailInfo">
                <li>ISBN-13: <span>${product.productCode}</span></li>
                <g:if test="${product.isbn10}"><li>ISBN: ${product.isbn10}</li></g:if>
                <g:if test="${product.edition}"><li>Edition: <span>${product.edition}</span></li></g:if>
                <g:if test="${product.publicationDate && product.publicationDate.size() > 3}"><li>Publication Date: <span>${product.publicationDate.substring(0, 4)}</span></li></g:if>
                <g:if test="${product.publisher}"><li>Publisher: <span>${product.publisher}</span></li></g:if>
            </ul>

            <div class="col-md-8 no-pad" id="DetailSummary">
                <h3 class="newBrandPurple weight-semi-bold">AUTHOR</h3>
                <p class="font-size-base authors">
                    <g:if test="${product.author}">
                        <g:each in="${product.author}" var="author" status="i">${author}<g:if test="${i != product.author.size() - 1}">, </g:if></g:each>
                    </g:if><g:else>
                        by Unknown Author
                    </g:else>
                </p>

                <g:if test="${product.reviewTotals}">
                    <div class="ratings-star">
                        <div class="ratings-top" style="width: ${(product.reviewTotals.totalRating / product.reviewTotals.numberOfRatings) * 10}%">
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


                    <a class="reviewTotals" href="#CustReviewAnc" aria-label="customer reviews"><u>${product.reviewTotals.numberOfRatings} Customer Product Reviews</u></a>
                </g:if>
                <h3 class="newBrandPurple weight-semi-bold">SUMMARY</h3>
                <div class="readShowMore">
                    <p class="font-size-base summary">
                        ${raw(product.description)}
                    </p><span class="toLess">[<a class="read-more-toggle" aria-label="read more" href="#"><u>read more</u></a>]</span>
                </div>
            </div>
        </div>
    </div>
</div>