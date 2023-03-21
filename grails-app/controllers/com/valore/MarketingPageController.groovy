package com.valore

class MarketingPageController {
//    def trackingService

    def index() { }

    def rankingCost() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/ranking-cost-higher-ed/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/ranking-cost-education"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.png",
                                "title":"Ranking the Cost of a Higher Education",
                                "url":canonical,
                                "description":"An analysis on the cost of a higher education and which schools produce the best paid graduates"]


//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
               model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }

    def visualizingCollege() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/visualizing-college-out-of-state/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/visualizing-college-out-of-state"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.jpg",
                                "title":"Out-of-State Students",
                                "url":canonical,
                                "description":"Would you move to Washington, D.C. for a higher education? 98% of students in D.C. are from out-of-state."]

//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
               model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }

    def howToSellTextBooksOnValore() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/sell-textbooks/how-to-sell-textbooks-on-valorebooks/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/sell-textbooks/how-to-sell-textbooks-on-valorebooks"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.jpg",
                                "title":"Selling Your Textbooks To ValoreBooks | Sell Books To Valore",
                                "url":canonical,
                                "description":"At the end of every semester you are left with expensive textbooks you no longer need or have available space for. learn how you can use the ValoreBooks market place to get cash for the textbooks you no long have use for. Our process is simple and hassle free.  Get more information about selling your textbooks today."]

//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
               model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }

    def buyUsedTextBooks() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/buy-textbooks/buy-used-textbooks/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/buy-textbooks/buy-used-textbooks"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.jpg",
                                "title":"Buy Used Textbooks Online | Save Up to 90% on Textbooks",
                                "url":canonical,
                                "description":"Save a bundle this semester and order college textbooks online form ValoreBooks. Enjoy the peace of mind that comes with our 30-day-money-back guarantee."]

//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
                model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }

    def sellOldTextbooksOnline() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/sell-textbooks/sell-old-textbooks-online/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/sell-textbooks/sell-old-textbooks-online"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.jpg",
                                "title":"Sell Textbooks Online | Get Cash for Old College Textbooks",
                                "url":canonical,
                                "description":"Have a stack of textbooks you no longer need? Sell them online. You can earn cash for your old textbooks. Find out how."]

//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
                model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }

    def learnHowToSellTextbooksOnline() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/sell-textbooks/learn-how-to-sell-textbooks-online/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/sell-textbooks/learn-how-to-sell-textbooks-online"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.jpg",
                                "title":"Learn How to Sell Textbooks Online | Make Cash Fast",
                                "url":canonical,
                                "description":"Sell your old college textbooks online and put more money in your pocket. It's easy, convenient and saves time. Learn the latest hacks and tips to earn more here."]

//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
                model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }

    def sellTextbooksInPerson() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/sell-textbooks/sell-textbooks-in-person/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/sell-textbooks/sell-textbooks-in-person"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.jpg",
                                "title":"How to Sell your Textbooks in Person | ValoreBooks",
                                "url":canonical,
                                "description":"Get the most value from your college textbooks when it is time to sell them."
                                        + "  Click here for the definitive guide on selling textbooks in person, with " +
                                        "tips on advertising, " +
                                        "pricing and timing."]

//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
                model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }

    def onlineTextbookRental() {
        def canonical = "${grailsApplication.config.valore.legacyUrl}/rent-textbooks/online-textbook-rental/"
        def path = "${grailsApplication.config.valore.marketingPages.url}/rent-textbooks/online-textbook-rental"
        def facebookMetadata = ["site_name":"Valore Books",
                                "image":"$path/assets/images/share.jpg",
                                "title":"Rent Textbooks Online | Cheap Online Textbook Rentals",
                                "url":canonical,
                                "description":"Cheap textbook rentals with low price guarantee & free rental " +
                                        "returns. Save up to \$500 on textbooks this year shopping our online " +
                                        "marketplace."]

//        trackingService.pageView(request, params)

        render template: "/marketing-page/landing",
                model: [canonical: canonical, path: "$path/index.html", facebookMetadata: facebookMetadata]
    }
}
