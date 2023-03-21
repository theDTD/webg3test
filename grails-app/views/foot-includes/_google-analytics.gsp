<%-- <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', '${grailsApplication.config.valore.google.analytics.id}', 'auto', {'allowAnchor': true});

    ga('send', 'pageview');

<g:if test="${ecommerce}">
    ga('require', 'ecommerce');

    ga('ecommerce:addTransaction', ${raw(ecommerce.transaction)});

<g:each var="item" in="${ecommerce.items}">
    ga('ecommerce:addItem', ${raw(item)});
</g:each>

    ga('ecommerce:send');
</g:if>

</script> --%>
