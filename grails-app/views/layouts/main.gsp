<g:render template="/head-includes/common"/>
	<body class="${pageProperty( name:'body.class' )}" itemscope="itemscope" itemtype="http://schema.org/WebPage">
		<g:render template="/layouts/headers/header"/>
		<g:layoutBody/>
		<g:render template="/layouts/footers/footer"/>
		<g:render template="/foot-includes/global-google-adwords"/>
		<g:if test="${controllerName == 'product'}">
			<g:render template="/foot-includes/product/product-details-google-adwords"/>
			<g:render template="/foot-includes/google-adwords-params" model='[productList: "${product.id}", pageType : "product", amount : "${pageProperty( name:'page.amount' )}"]'/>
		</g:if>
		<g:render template="/foot-includes/adroll"/>
		<newrelic:browserTimingFooter/>
	<!-- Start of HubSpot Embed Code -->
	<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/7408094.js"></script>
	<!-- End of HubSpot Embed Code -->
	</body>
</html>