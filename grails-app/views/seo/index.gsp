<html lang="en-US">
<head>
    <title>${data.title}</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Book",
        "identifier": "${data.product.id}",
        "isbn": "${data.product.productCode}",
        "description": "${data.product.description}",
        "url": "${data.product.url}",
        "image": "${data.product.image}",
        "name": "${data.product.name}",
        "author":
        <g:if test="${data.product.author.size() > 1}">
        [
        <g:each status="i" in="${data.product.author}" var="author">
            {
                "@type": "Person",
                "name": "${author}"
            }<g:if test="${i < data.product.author.size()-1}">,</g:if>
        </g:each>
        ],
        </g:if><g:else>
            {
                "@type": "Person",
                "name": "${data.product.author? data.product.author[0]: "Unknown Author"}"
            },
        </g:else>
        "bookEdition": "${data.product.edition}",
        "offers": [
                {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": "${data.product.price}",
                    "offerCount": "${data.product.quantity}",
                    "itemCondition": "${data.product.type.capitalize()}Condition"
                }
        ]
    }
    </script>

    <g:each status="i" in="${data.meta}" var="meta">
        <meta property="${meta.property}" content="${meta.content}" />
    </g:each>

</head>

<body>

<g:link action="edit" params='["isbn": "${data.product.productCode}"]'>Edit</g:link>

<h1>Book: ${data.product.name}</h1>
<br/>
<div><strong>Description:</strong> ${data.description}</div>
<br/>
<div><strong>Author(s):</strong> ${data.product.author}</div>
<br/>
<img src="${data.product.image}" />
<br />
<div><string>Price:</string> $${data.product.price}</div>
<br />
<div><string>Quantity:</string> ${data.product.quantity}</div>
</body>
</html>