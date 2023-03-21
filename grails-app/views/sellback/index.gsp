<!DOCTYPE html>
<html>
    <head>
        <meta name="layout" content="react">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <g:render template="/head-includes/favicon"/>
        <title>Sellback</title>
        <asset:stylesheet src="sellback/${whitelabel}/landing.css"/>
    </head>
    <body>
        <div id="content" staticData="${staticData}" initialItemData="${initialItemData}"></div>
        <asset:javascript id="bundle-sellback" src="bundle-sellback.js" />
    </body>
</html>