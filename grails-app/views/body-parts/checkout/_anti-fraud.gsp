<%
    def afSessionId = "${grailsApplication.config.valore.litleOnline.antiFraud.sessionPrefix}-${cart.id}"
%>
<script type="text/javascript"
        src="https://h.online-metrix.net/fp/tags.js?org_id=${grailsApplication.config.valore.litleOnline.antiFraud.orgId}&session_id=${afSessionId}&pageid=PAGE_ID">
</script>
<noscript>
    <iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://h.online-metrix.net/tags?org_id=${grailsApplication.config.valore.litleOnline.antiFraud.orgId}&session_id=${afSessionId}&pageid=PAGE_ID"></iframe>
</noscript>
