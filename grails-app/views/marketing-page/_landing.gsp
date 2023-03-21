<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>

<head>
    <g:if test="${canonical}">
        <link rel="canonical" href="${canonical}" />
    </g:if>
    <g:each var="item" in="${facebookMetadata}">
        <meta property="og:${item.key}" content="${item.value}" />
    </g:each>
    <meta name="layout" content="react">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <g:render template="/head-includes/favicon"/>
    <title>${facebookMetadata.title}</title>
    <meta name="DESCRIPTION" content="${facebookMetadata.description}">
    <meta name="KEYWORDS" content="${facebookMetadata.description}">
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

<div id="content" urlOrigin="${grailsApplication.config.valore.legacyUrl}" path="${path}"></div>
<asset:javascript id="bundle-marketingPage" src="bundle-marketingPage.js" />

</body>