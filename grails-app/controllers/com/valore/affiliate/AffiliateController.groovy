package com.valore.affiliate

import com.valore.util.ApiUtil
import com.valore.util.ProductUrlUtil

class AffiliateController {
    def cookieService
//    def trackingService

    final static List<String> AFFILIATE_TRACKING_PARAMS =
        ['utm_source', 'utm_medium', 'utm_campaign', 'clickid', 'irgwc', 'site_id']

    /**
     * Incoming URL sample:
     * /rental-listing?product_id=32250368&listing_id=1332308505&site_id=WX5iw2&sellerMarket_id=896791477
     */
    def rental() {
        def listingId = params.listing_id
        def rbbSaleId = params.sellerMarket_id
        Map affiliateTrackingParamValues = [:]

        AFFILIATE_TRACKING_PARAMS.each {
            if (params.containsKey(it)) {
                affiliateTrackingParamValues[it] = params[it]
            }
        }

        cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, params.site_id as String, 432000, null, null, null, false)
        cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, params.t_id as String, 432000, null, null, null, false)

        trackAffiliateClick()
//        trackingService.pageView( request, params )

        def listing
        if (!rbbSaleId) {
            listing = ApiUtil.get(path: 'rentalListing', id: listingId)
        } else {
            listing = ApiUtil.get(path: 'rentalListing', id: listingId, query: [rbbId: rbbSaleId])
        }

        def product = ApiUtil.get(path: 'product', id: params.product_id)

        if (!product) {
            log.debug "Affiliate '$params.site_id'${"($params.t_id)"} gave us a ${listing ? '' : 'bad '}rental listing $listingId ${rbbSaleId ? "with RBB id $rbbSaleId " : ''}and bad product $params.product_id"
            redirect uri: '/', base: grailsApplication.config.valore.legacyUrl, params: affiliateTrackingParamValues
            return
        }

        if (!listing) {
            log.debug "Affiliate '$params.site_id'${"($params.t_id)"} gave us a bad rental listing $listingId ${rbbSaleId ? "with RBB id $rbbSaleId " : ''}for product $params.product_id"
            redirect uri: ProductUrlUtil.generateURL(product.name, product.edition, product.productCode),
                    base: grailsApplication.config.valore.legacyUrl,
                    params: affiliateTrackingParamValues
            return
        }

        log.info "Affiliate '$params.site_id'${"($params.t_id)"} referred product $product.id and rental listing $listingId ${rbbSaleId ? "with RBB id $rbbSaleId" : ''}"
        addListingToCart(listing, product, affiliateTrackingParamValues)
    }

    /**
     * Possible incoming URL query strings:
     * product_id=39406029&sellerMarket_id=1512620319&a_listing=false&site_id=WX5iw2
     * site_id=XXXXXX&isbn=9780321558237
     * site_id=XXXXXX&isbn=9780321558237&default=rent
     */
    def sale() {
        def listing = null
        def isbn
        def product
        Map affiliateTrackingParamValues = [:]

        AFFILIATE_TRACKING_PARAMS.each {
            if (params.containsKey(it)) {
                affiliateTrackingParamValues[it] = params[it]
            }
        }

        cookieService.setCookie(grailsApplication.config.valore.cookie.affSiteId as String, params.site_id as String, 432000, null, null, null, false)
        cookieService.setCookie(grailsApplication.config.valore.cookie.affTrackingId as String, params.t_id as String, 432000, null, null, null, false)

        trackAffiliateClick()
//        trackingService.pageView( request, params )

        if (!params.isbn) {
            product = ApiUtil.get(path: 'product', id: params.product_id)
            if (!product) {
                log.debug "Affiliate '$params.site_id'${"($params.t_id)"} gave us a bad product $params.product_id"
                redirect uri: '/', base: grailsApplication.config.valore.legacyUrl, params: affiliateTrackingParamValues
                return
            }
            isbn = product.productCode

            listing = ApiUtil.get(path: 'saleListing', id: params.sellerMarket_id)
        } else {
            isbn = params.isbn

            product = ApiUtil.get(path: 'productDetails', id: isbn)
            if (!product) {
                log.debug "Affiliate '$params.site_id'${"($params.t_id)"} gave us a bad ISBN $isbn"
                redirect uri: '/', base: grailsApplication.config.valore.legacyUrl, params: affiliateTrackingParamValues
                return
            }
            if (!params.default) {
                log.debug "Affiliate '$params.site_id'${"($params.t_id)"} referred ISBN $isbn without a default type"
                redirect uri: ProductUrlUtil.generateURL(product.name, product.edition, isbn), base: grailsApplication.config.valore.legacyUrl, params: affiliateTrackingParamValues
                return
            }

            def bestListings = ApiUtil.get(path: 'saleListing/best', id: isbn)

            if (params.default == 'rent') listing = bestListings.rental?.best
            else if (params.default == 'used') listing = bestListings.used?.best
            else if (params.default == 'new') listing = bestListings.new?.best
            else if (params.default == 'alt') listing = bestListings.alternate?.best
            else if (params.default == 'new_and_used') {
                if (bestListings.new && bestListings.used)
                    listing = bestListings.new.best.price.sale < bestListings.used.best.price.sale ? bestListings.new.best : bestListings.used.best
                else if (bestListings.new) listing = bestListings.new.best
                else if (bestListings.used) listing = bestListings.used.best
            }

            if (!listing && bestListings) {
                def lowestPrice = bestListings['used']?.best?.price?.sale
                if (lowestPrice)
                    listing = bestListings['used'].best
                for (def type : bestListings.keySet()) {
                    if (type == 'recommended' || type == 'rental' || type == 'used') continue;
                    if (!lowestPrice || (type != 'used' && (lowestPrice as Double) > (bestListings[type].best.price.sale as Double))) {
                        listing = bestListings[type].best
                    }
                }
            }
        }

        if (!listing) {
            if (params.sellerMarket_id)
                log.debug "Affiliate '$params.site_id'${"($params.t_id)"} gave us a bad listing $params.sellerMarket_id for ISBN $isbn"
            else
                log.debug "Affiliate '$params.site_id'${"($params.t_id)"} referred to ISBN $isbn with a default type '${params.default}' but none of the type was found"
            redirect uri: ProductUrlUtil.generateURL(product.name, product.edition, product.productCode),
                    base: grailsApplication.config.valore.legacyUrl,
                    params: affiliateTrackingParamValues
            return
        }

        log.info "Affiliate '$params.site_id'${"($params.t_id)"} referred product $product.id and sale listing $listing.id"
        addListingToCart(listing, product, affiliateTrackingParamValues)
    }

    private def addListingToCart(def listing, def product, Map affiliateTrackingParamValues = [:]) {
        def rental = listing.type == 'rental'

        def params = affiliateTrackingParamValues
        params['product_id'] = product.id
        params['listing_id'] = rental ? listing.id : null
        params['sellerMarket_id'] = listing.rbbSaleId ?: (!rental ? listing.id : null)
        params['shippingType'] = listing.provider.shippingMethods[0]
        params['condition'] = listing.condition
        if (rental) {
            params['term'] = 'semester'
        }

        redirect controller: 'cart', action: 'addItem', params: params
    }

    def trackAffiliateClick() {
        def originIp = request.getHeader('x-forwarded-for')?.split(',')?.getAt(0)?.trim() ?: request.remoteAddr
        def json = [ipAddress: originIp]
        ApiUtil.post(path: 'affiliate/click', id: params.site_id, json: json)
    }
}
