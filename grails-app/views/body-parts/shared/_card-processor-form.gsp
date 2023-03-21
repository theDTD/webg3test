<form method=post id="fCheckout" name="fCheckout">
    <g:each in="${['request$paypageId': ["value": "${grailsApplication.config.valore.litleOnline.paypageId}"],
                   'request$merchantTxnId': ["value": "${grailsApplication.config.valore.litleOnline.merchantId}"],
                   'response$merchantTxnId': ["readOnly": "true"],
                   'request$orderId': ["value": "${vantivOrderId}"],
                   'request$reportGroup': ["value": "${vantivReportGroup}"],
                   'response$paypageRegistrationId': ["value": "", "readOnly": "true"],
                   'response$bin': ["readOnly": "true"],
                   'response$code': ["readOnly": "true"],
                   'response$message': ["readOnly": "true"],
                   'response$responseTime': ["readOnly": "true"],
                   'response$type': ["readOnly": "true"],
                   'response$litleTxnId': ["readOnly": "true"],
                   'response$firstSix': ["readOnly": "true"],
                   'response$lastFour': ["readOnly": "true"],
                   'response$expMonth': [:],
                   'response$expYear': [:],
                   'litleOnlineJs': ["value": "${litleOnlineJs}"],
                   'timeoutMessage': ["readOnly": "true"],
                   'response$orderId': ["readOnly": "true"],
                   'response$reportGroup': ["readOnly": "true"],
                   'paypageRegistrationId': ["readOnly": "true"],
                   'bin': ["readOnly": "true"]]}">
        <input type="hidden"
               id="${it.key}"
               name="${it.key}"
        <g:each in="${it.value}" var="attr">
            ${attr.key}="${attr.value}"
        </g:each>/>
    </g:each>
    <input type="hidden" id="amount" name="amount" value="{{totalValue}}"/>
</form>
