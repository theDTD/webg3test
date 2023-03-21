<script type="text/javascript">
    var site_id = getSiteIdFromCookie();
    var userId = readCookie('${grailsApplication.config.valore.cookie.user_id}');
    var anonId = readCookie('${grailsApplication.config.valore.cookie.anon_id}');
    var segmentContext = {
        integrations: {
            'All': false,
            'Olark': true,
            'AdWords': true,
            'Google Tag Manager': true,
            'Bing Ads': true
        }
    };

    ! function() {
        var analytics = window.analytics = window.analytics || [];
        if (!analytics.initialize) {
            if (analytics.invoked) {
                window.console && console.error && console.error("Segment snippet included twice.");
            } else {
                analytics.invoked = !0;
                analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "group", "track", "ready", "alias", "page", "once", "off", "on"];
                analytics.factory = function(t) {
                    return function() {
                        var e = Array.prototype.slice.call(arguments);
                        e.unshift(t);
                        analytics.push(e);
                        return analytics
                    }
                };
                for (var t = 0; t < analytics.methods.length; t++) {
                    var e = analytics.methods[t];
                    analytics[e] = analytics.factory(e)
                }
                analytics.load = function(t) {
                    var e = document.createElement("script");
                    e.type = "text/javascript";
                    e.async = !0;
                    e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
                    var n = document.getElementsByTagName("script")[0];
                    n.parentNode.insertBefore(e, n)
                };
                analytics.SNIPPET_VERSION = "3.0.1";
                analytics.load("${grailsApplication.config.valore.segment.writeKey}");
            }
        }
    }();

    $(window).load( function() {
        var headerForm = document.getElementById('HeaderSearchForm');
        var headerInput = document.getElementById('search_input');
        var submitData = {
            query: headerInput && headerInput.value || null
        }
        if (headerInput) $(headerInput).change(function () {
            submitData.query = headerInput.value;
        })

//        if (headerForm) analytics.trackForm(headerForm, 'Product Search', submitData);
    });

    <g:if test="${itemTotal}">
        total_cart_price = ${itemTotal}
    </g:if>
    <g:else>
        total_cart_price = 0;
    </g:else>

    function submitCompletedOrder() {
        // This event must be done on the front end as well, since AdWords doesn't support server-side tracking via segment
        %{--analytics.track('Completed Order', { revenue: ${itemTotal ? (itemTotal / 100) : 0} }, segmentContext);--}%
    }

    function submitStepViewEvent(step) {
        <%-- analytics.track('Viewed Checkout Step', {
            step: step
        }); --%>
    }

    function submitStepCompletionEvent(step) {
        <%-- analytics.track('Completed Checkout Step', {
            step: step
        }); --%>
    }

</script>
