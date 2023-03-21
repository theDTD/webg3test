<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="react">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <g:render template="/head-includes/favicon"/>
    <title>Payment</title>
    <script src="https://use.fontawesome.com/09ba959dde.js"></script>
    <asset:stylesheet src="sellback/sellback.scss" />
</head>
<body>
<div id="content" staticData="${staticData}" initialItemData="${initialItemData}"></div>
<asset:javascript id="bundle-payment" src="bundle-payment.js"/>
</body>
</html>