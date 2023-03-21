package com.valore.legacy

class PayPalController {

    def paypalService

    def auth() {

        def authCode = params.code

        if(!authCode){
            redirect(url: legacyErrorUrl())
            return
        }

        def (tokenType, accessToken) = paypalService.getPayPalAccessToken(authCode)

        if (!tokenType || !accessToken){
            redirect(url: legacyErrorUrl())
            return
        }

        def userInfoBase64 = paypalService.getPayPalUserData(tokenType, accessToken, true)

        if(!userInfoBase64){
            redirect(url: legacyErrorUrl())
            return
        }

        def legacyUrl = "${grailsApplication.config.valore.legacyUrl}/SellBack.ShipmentOptions.do?paymentOption=2&userInfo=${userInfoBase64}"

        redirect(url: legacyUrl)
    }


    private def legacyErrorUrl(){
        "${grailsApplication.config.valore.legacyUrl}/SellBack.ShipmentOptions.do?paymentOption=2&errorPaypal=true"
    }
}
