<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="react">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rent Textbooks Online | Cheap College Textbook Rentals</title>
    <g:render template="/head-includes/favicon"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
          type="text/css" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous" />
    <g:render template="/foot-includes/bbbSeal"/>
    <asset:stylesheet src="react.scss"/>

</head>

<body>
<div id="content" urlOrigin="${grailsApplication.config.valore.legacyUrl}" popularRentalProducts="${popularRentalProducts}"></div>
<asset:javascript id="bundle-rentTextbooks" src="bundle-rentTextbooks.js" />
</body>
</html>