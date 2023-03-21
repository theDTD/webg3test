<span id="CustReviewAnc"></span>
<div class="row border-bottom-thin customerReviews">
    <div>
        <h2 data-target="#CustomerReviewsDropdown" data-toggle="dropdown" class="blue weight-normal dropdown-toggle col-md-12 customerHeading">Customer reviews <span class="hidden-lg glyphicon glyphicon-menu-right"></span></h2>
    </div>
    <hr class="hidden-xs hidden-sm"/>
    <div id="CustomerReviewsDropdown" class="mobile-accordion">
        <div class="col-xs-12 col-md-6 text-center star-rating-section">
            <p class="font-size-xl purple weight-normal">Average customer review</p>
            <div class="ratings-star ratings-star-large customer-star-rating">
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
            <p><span id="totalReviews">${product.reviewTotals.numberOfRatings}</span> Customer Product Reviews</p>
        </div>

        <div class="col-xs-12 col-md-6 no-pad">
            <div class="col-xs-2 star-label">5 Star</div>
            <div class="col-xs-10">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ${(product.reviewTotals.fiveStarRatings / product.reviewTotals.numberOfRatings) * 100}%;">
                        <span class="sr-only">60% Complete</span> %{-- TODO: Fix this stupid stuff --}%
                    </div>
                </div>
            </div>

            <div class="col-xs-2 star-label">4 Star</div>
            <div class="col-xs-10">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: ${(product.reviewTotals.fourStarRatings / product.reviewTotals.numberOfRatings) * 100}%;">
                        <span class="sr-only">40% Complete</span>
                    </div>
                </div>
            </div>

            <div class="col-xs-2 star-label">3 Star</div>
            <div class="col-xs-10">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style="width: ${(product.reviewTotals.threeStarRatings / product.reviewTotals.numberOfRatings) * 100}%;">
                        <span class="sr-only">30% Complete</span>
                    </div>
                </div>
            </div>

            <div class="col-xs-2 star-label">2 Star</div>
            <div class="col-xs-10">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style="width: ${(product.reviewTotals.twoStarRatings / product.reviewTotals.numberOfRatings) * 100}%;">
                        <span class="sr-only">10% Complete</span>
                    </div>
                </div>
            </div>

            <div class="col-xs-2 star-label">1 Star</div>
            <div class="col-xs-10">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: ${(product.reviewTotals.oneStarRatings / product.reviewTotals.numberOfRatings) * 100}%;">
                        <span class="sr-only">00% Complete</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearboth clearfix" ng-controller="PostsCtrl" data-url="${createLink(controller: 'product', action: 'reviews')}/${product.id}">
            <hr class="hidden-xs hidden-sm"/>

            <div ng-repeat="post in posts" class="col-xs-12 review col-md-4">
                <div class="ratings-star">
                    <div class="ratings-top r{{post.rating * 10}}">

                        <g:each var="i" in="${ (0..<5) }">
                            <span class="glyphicon glyphicon-star star"></span>
                        </g:each>
                    </div>

                    <div class="ratings-bottom">
                        <g:each var="i" in="${ (0..<5) }">
                            <span class="glyphicon glyphicon-star star"></span>
                        </g:each>
                    </div>
                </div> <span class="purple weight-normal font-size-large reviewName">&nbsp;By {{post.name|unescape}}</span>
                <div class="readShowMore" read-more-directive>
                    <p class="font-size-base summary">
                        {{post.questionOneAnswer|unescape}}
                        <span class="space"></span>
                        {{post.questionTwoAnswer|unescape}}
                    </p><span class="toLess">[<a class="read-more-toggle" href="#" aria-label="read more"><u>read more</u></a>]</span>
                </div>
            </div>

            <div class="text-center">
                <button ng-click="loadMore()" class="loadMore link-button icon-link-bottom font-size-large font-weight-normal noUnderline">More reviews<i class="glyphicon glyphicon-menu-down"></i></button>
            </div>
        </div>
    </div>
</div>
