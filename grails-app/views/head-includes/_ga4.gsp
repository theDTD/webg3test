<%@ page import="grails.util.Environment" %>

<%
    String measurementId = Environment.current == Environment.PRODUCTION ? 'G-C72NNY81ET' : 'G-1EHL1V50Y4'
%>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    <g:if env="production">
        gtag('config', '${measurementId}');
    </g:if>
    <g:else>
        gtag('config', '${measurementId}',{
            'debug_mode': true
        } );
    </g:else>
</script>