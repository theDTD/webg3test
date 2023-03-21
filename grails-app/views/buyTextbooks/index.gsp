<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="layout" content="react">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <g:render template="/head-includes/favicon"/>
    <title>Buy College Textbooks Online | Save Up to $500 Per Year</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
          type="text/css" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous" />
    <asset:stylesheet src="react.scss"/>
    <g:render template="/foot-includes/bbbSeal"/>
</head>
<body>
<div id="content" urlOrigin="${grailsApplication.config.valore.legacyUrl}" params="${params as grails.converters.JSON}"></div>
<asset:javascript id="bundle-buyTextbooks" src="bundle-buyTextbooks.js" />
</body>
</html>