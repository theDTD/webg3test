<%@ page import="com.valore.util.ProductUrlUtil" contentType="text/html;charset=UTF-8" %>

<%
    def (lowestType, lowestPrice, lowestCondition) = {
        def lowestPrice = best['rental']?.best?.price?.semester
        def lowestType = 'rental'
        def lowestCondition = best['rental']?.best?.condition

        for (def type : best.keySet()) {
            if (type == 'recommended') continue;
            if (!lowestPrice || (type != 'rental' && (lowestPrice as Double) > (best[type].best.price.sale as Double))) {
                lowestPrice = best[type].best.price.sale
                lowestType = type
                lowestCondition = best[type].best.condition
            }
        }
        [lowestType, lowestPrice, lowestCondition]
    }()
%>

<html lang="en-US">
<head>
    <parameter name="amount" value="${lowestPrice}" />
    <meta name="layout" content="main"/>
    <title>${pageTitle}</title>
    <meta property="og:image" content="${product.image ?: 'https://img.valorebooks.com/images/book_coverW120.png'}"/>
    <meta property="og:title" content="${pageTitle}"/>
    <meta property="og:description" content="${product.pageDescription ? raw(product.pageDescription) : product.name}"/>
    <meta property="og:type" content="Book"/>
    <meta property="og:url" content="${grailsApplication.config.valore.legacyUrl}${ProductUrlUtil.generateURL(product.name, product.edition, product.productCode)}"/>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Book",
        "identifier": "${product.id}",
        "isbn": "${product.productCode}",
        "description": "${product.pageDescription ? raw(product.pageDescription) : product.name}",
        "url": "${grailsApplication.config.valore.legacyUrl}${ProductUrlUtil.generateURL(product.name, product.edition, product.productCode)}",
        "image": "${product.image}",
        "name": "${product.name}",
        "author":
        <g:if test="${product.author.size() > 1}">
        [
            <g:each status="i" in="${product.author}" var="author">
            {
                "@type": "Person",
                "name": "${author}"
            }<g:if test="${i < product.author.size()-1}">,</g:if>
            </g:each>
        ],
        </g:if><g:else>
        {
            "@type": "Person",
            "name": "${product.author? product.author[0]: "Unknown Author"}"
        },
        </g:else>
        "about": "${best[lowestType]?.best?.comment}",
        <g:if test="${best[lowestType]?.best?.provider}">
        "provider": {
            "@type": "Organization",
            "name": "${best[lowestType]?.best?.provider?.name}",
            "url": "${grailsApplication.config.valore.legacyUrl}/seller/${best[lowestType]?.best?.provider?.name}/${best[lowestType]?.best?.provider?.id}"
        },
        </g:if>
        "publisher": {
            "@type": "Organization",
            "name": "${product.publisher}"
        },
        "datePublished": "${product.publicationDate}",
        "bookEdition": "${product.edition}",
        <g:if test="${product['reviewTotals']}">
        "aggregateRating": {
            "@type": "AggregateRating",
            "reviewCount": "${product.reviewTotals?.numberOfRatings}",
            "ratingValue": "${String.format("%.2f", (((product.reviewTotals?.totalRating / product.reviewTotals?.numberOfRatings) * 10) / 100) * 5)}",
            "worstRating": "1",
            "bestRating": "5"
        },
        </g:if>
        "offers": [
        <g:if test="${best}">
            <g:each in="${best.keys()}" var="type" status="i">
                <g:if test="${type == 'rental'}">
                    {
                        "@type": "AggregateOffer",
                        "priceCurrency": "USD",
                        "lowPrice": "${best.rental.best?.price?.semester}",
                        "offerCount": "${best.rental.totalQuantity}",
                        "potentialAction": {
                            "@type": "RentAction",
                            "provider": {
                                "@id": "${grailsApplication.config.valore.legacyUrl}/seller/${best.rental.best?.provider?.name}/${best.rental.best?.provider?.id}"
                            }
                        }
                }
                </g:if><g:else>
                {
                    "@type": "AggregateOffer",
                    "priceCurrency": "USD",
                    "lowPrice": "${best[type].best?.price?.sale}",
                    "offerCount": "${best[type].totalQuantity}",
                    "itemCondition": "${type.toString().capitalize()}Condition",
                    "seller": {
                        "@id": "${grailsApplication.config.valore.legacyUrl}/seller/${best[type].best?.provider?.name}/${best[type].best?.provider?.id}"
                    }
                }
            </g:else><g:if test="${i < best.keys().size()-1}">,</g:if>
            </g:each>
        </g:if>
        ]
    }
    </script>
    <g:render template="/head-includes/ga4"/>
</head>

<body class="product-detail">
<div class="container">
    <p class="hide" id="id">${product.id}</p>
    <p class="hide" id="isbn">${product.productCode}</p>
    <ol class="breadcrumb hidden-xs hidden-sm">
        <li><a href="/top-books">Books</a></li>
        <li id="product-name">${product.name}</li>
    </ol>
    <h1 class="main-header">${product.name}</h1>

    <h2 class="hidden-xs hidden-sm author-line weight-normal">
    <g:if test="${product.author}">
        by <g:each in="${product.author}" var="author" status="i"><a href="/author/${author.replaceAll(", ", '+')}"><u>${author}</u></a><g:if test="${i != product.author.size() - 1}">, </g:if></g:each>
    </g:if><g:else>
        by Unknown Author
    </g:else>
    </h2>

    <div class="row" id="MainProductRow">
        <div class="col-xs-12 col-md-3 no-pad-left-md no-pad-left-lg">
            <div class="row">
                <img alt="${product.name}" class="col-xs-5 col-md-12 product-image" src="${product.image.substring(product.image.indexOf("//"))}" />
                <section class="col-md-12 col-xs-7">
                    <h2 class="hidden-md hidden-lg author-mobile weight-normal">
                        <g:if test="${product.author}">
                            by <g:each in="${product.author}" var="author" status="i"><a href="/author/${author.replaceAll(", ", '+')}"><u>${author}</u></a><g:if test="${i != product.author.size() - 1}">, </g:if></g:each>
                        </g:if><g:else>
                            by Unknown Author
                        </g:else>
                    </h2>
                    %{--<span class="hidden-md hidden-lg weight-normal">Own it? <a href="">Sell it for $${product.sellbackPrice}</a></span>--}%

                    <section class="hidden-xs hidden-sm col-md-12">
                        %{--<span class="weight-normal">Own it?</span> <a href=""><u>Sell it for $${product.sellbackPrice}</u></a>--}%

                        <div class="rec-wrapper share-icons">
                            <p class="font-size-large weight-normal">Recommend this!</p>
                            <a aria-label="fb" target="_blank" href="http://www.facebook.com/sharer/sharer.php?u=${URLEncoder.encode(request.getForwardURI(), 'UTF-8')}&title=With ValoreBooks, I'm saving up to 90 percent on all my textbooks needs!">
                                <i class="icon-fbicon"></i>
                            </a>
                            <a aria-label="twitter" target="_blank" href="https://twitter.com/share?original_referer=${URLEncoder.encode(request.getForwardURI(), 'UTF-8')}&source=tweetbutton&text=With ValoreBooks, I'm saving up to 90 percent on all my textbooks needs!&url=${URLEncoder.encode(request.getForwardURI(), 'UTF-8')}?utm_campaign=itemdetail&amp;utm_source=twitterbutton&amp;utm_medium=social&via=ValoreBooks">
                                <i class="icon-ticon"></i>
                            </a>
                            <a aria-label="pinterest" target="_blank" href="http://pinterest.com/pin/create/button/?url=${URLEncoder.encode(request.getForwardURI(), 'UTF-8')}&media=${product.image}">
                                <i class="icon-picon"></i>
                            </a>
                        </div>

                        <ul class="list-unstyled spaced-list">
                            <g:if test="${best}">
                            <li><p class="font-size-large weight-normal">Marketplace Prices</p></li>
                            <g:each in="['new', 'used', 'alternate', 'rental']" var="type">
                                <g:if test="${best[type]?.totalQuantity > 0}">
                                    <g:if test="${type == 'rental'}">
                                        <li><a class="marketplace-total open-tab" data-tabtype="${type}" data-price="${best[type].best.price.semester}" href="#${type}-tab"><u>${best[type].totalQuantity} ${type.capitalize()}</u></a> from <span class="commaFormat">$${best[type].best.price.semester}</span></li>
                                    </g:if>
                                    <g:else>
                                        <li><a class="marketplace-total open-tab" data-tabtype="${type}" data-price="${best[type].best.price.sale}" href="#${type}-tab"><u>${best[type].totalQuantity} ${type.capitalize()}</u></a> from <span class="commaFormat">$${best[type].best.price.sale}</span></li>
                                    </g:else>
                                </g:if>
                            </g:each>
                            </g:if>
                        </ul>

                    </section>
                </section>
            </div>
        </div>
        <div class="col-md-7 col-md-offset-2 relative">
            <g:render template="/body-parts/product/tabs" model="[lowestType: lowestType]"/>
        </div>
        <g:render template="/body-parts/product/details-section"/>
    </div>
    <g:if test="${best}">
        <g:render template="/body-parts/product/marketplace-prices" model="[lowestPrice: lowestPrice]"/>
    </g:if>
    <g:if test="${product.reviewTotals}">
        <g:render template="/body-parts/product/customer-reviews"/>
    </g:if>
    <g:render template="/body-parts/product/question-guarantee-section"/>

</div>

<g:render template="/body-parts/lightboxes/book-condition"/>

<g:render template="/body-parts/lightboxes/how-rentals-work"/>

<asset:javascript src="angular.min.js"/>
<asset:javascript src="MoneyHTMLFormatter.js"/>
<asset:javascript src="ValoreFormInputs.js"/>
<asset:javascript src="handlebars-v3.0.3.js"/>
<asset:javascript src="jquery.validate.min.js"/>
<asset:javascript src="pages/productDetails.js"/>
<asset:javascript src="customerReviews.js"/>
<asset:javascript src="pages/marketplaceTabs.js"/>
</body>
</html>