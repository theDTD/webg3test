package com.valore.analytics

import grails.util.Holders
import org.grails.web.util.WebUtils
import org.joda.time.DateTime

import java.util.regex.Pattern

class TrackingService {

    def grailsApplication
    def segmentIOService
    def cookieService
    ConfigObject config = Holders.getConfig()
    Random random = new Random()
    Pattern spiderAgents = ~/(?i).*(googlebot|baidu|bingbot|duckduckgo|spider|crawl|wget|slurp|Mediapartners-Google).*/

    final Integer TWO_YEARS_IN_SECONDS = 63072000

    def integrations = [
        'Olark': false,
        'AdWords': false,
        'DoubleClick Floodlight': true
    ]

    void pageView( def request, def params ) {
        String userAgent = request.getHeader('User-Agent')
        if(userAgent != null && userAgent ==~ spiderAgents) return

        def originIp = request.getHeader('x-forwarded-for')?.split(',')?.getAt(0)?.trim()
        def siteId = cookieService.getCookie(config.valore.cookie.affSiteId)
        def userId = getUserId(request)

        def gaCampaign = [:]

        if(params.utm_source)   gaCampaign.source =   params.utm_source
        if(params.utm_medium)   gaCampaign.medium =   params.utm_medium
        if(params.utm_term)     gaCampaign.term =     params.utm_term
        if(params.utm_campaign) gaCampaign.name =     params.utm_campaign
        if(params.utm_content)  gaCampaign.content =  params.utm_content

        def PLA_Campaigns = grailsApplication.config.valore.pla.campaigns

        if(params.utm_campaign in PLA_Campaigns) {
            siteId = PLA_Campaigns[params.utm_campaign]
            cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, siteId as String, 432000, null, null, null, false)
        }

        def pageProperties = [
            siteId: siteId
        ]

        def uri = request.forwardURI
        def referrer = request.getHeader('referer')
        if(referrer && referrer.contains('localhost')) referrer = null

        def pageContext = [
                page: [
                        url: uri,
                        referrer: referrer
                ],
                campaign: gaCampaign,
                ip: originIp,
                integrations: integrations,
                "Google Analytics": [
                        "clientId": getGAClientId()
                ],
                user_agent: userAgent
        ]

        segmentIOService.page(userId, uri, null, pageProperties, new DateTime(), pageContext)
    }

    void identify(Map traits = [:]){
        def request = WebUtils.retrieveGrailsWebRequest().getCurrentRequest() ?: null
        def userId = getUserId(request)

        if(!userId) {
            log.error("NO userId available when attempting to identify user to segment.")
            return
        }

        String userAgent = request ? request.getHeader('User-Agent') : null
        if(userAgent != null && userAgent ==~ spiderAgents) return

        segmentIOService.identify(userId, traits, new DateTime(), [user_agent: userAgent])
    }

    void trackEvent(def request, def name, Map properties = [:]) {
        String userAgent = request ? request.getHeader('User-Agent') : null
        if(userAgent != null && userAgent ==~ spiderAgents) return

        def userId = getUserId(request)

        segmentIOService.track(userId, name as String, properties, new DateTime(), [
                integrations: integrations,
                "Google Analytics": [
                        "clientId": getGAClientId()
                ],
                user_agent: userAgent
        ])
    }

    String getUserId(def request) {
        def userId = cookieService.getCookie(config.valore.cookie.user_id)
        def anonId = cookieService.getCookie(config.valore.cookie.anon_id)

        // a user shouldnt have both id cookies set to different things...
        if((userId && anonId) && (userId != anonId)) cookieService.deleteCookie(config.valore.cookie.anon_id)

        // on the very first page view, the anonId cookie was just created, and isn't accessible through cookie service, so we stuck it on the request
        userId ?: anonId ?: request ? request.getAttribute(config.valore.cookie.anon_id) : null
    }

    void enhancedEcommerceViewEvent(def step) {
//        def req = WebUtils.retrieveGrailsWebRequest().getCurrentRequest() ?: null
//        trackEvent(req, 'Viewed Checkout Step', ['step': step])
    }

    void enhancedEcommerceCompletionEvent(def step) {
//        def req = WebUtils.retrieveGrailsWebRequest().getCurrentRequest() ?: null
//        trackEvent(req, 'Completed Checkout Step', ['step': step])
    }

    String getGAClientId() {
        def req = WebUtils.retrieveGrailsWebRequest().getCurrentRequest() ?: null
        String gaCookie = cookieService.getCookie(config.valore.cookie.ga) ?: req.getAttribute(config.valore.cookie.ga)
        String clientId

        if( !gaCookie ) {
            // If the user doesn't have a _ga cookie, we generate one in the same fashion as Google.
            clientId = "" + Math.abs(random.nextLong()) % 2147483648L + "." + Math.floor(new Date().getTime() / 1000).toLong()

            gaCookie = "GA1.2." + clientId
            cookieService.setCookie(config.valore.cookie.ga as String, gaCookie, TWO_YEARS_IN_SECONDS, null, null, null, false)
            // We set this attribute so that subsequent tracking calls on this request can reuse the value, since the cookie wont be set yet
            req.setAttribute(config.valore.cookie.ga, gaCookie)
        } else {
            def chunks = gaCookie.tokenize('.')
            // if this cookie isn't valid, delete it and regenerate
            if( chunks.size() != 4 ){
                cookieService.deleteCookie(config.valore.cookie.ga)
                return getGAClientId()
            }
            clientId = chunks[2]+"."+chunks[3]
        }
        clientId
    }

}
