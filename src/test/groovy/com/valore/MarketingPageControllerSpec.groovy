package com.valore

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(MarketingPageController)
class MarketingPageControllerSpec extends Specification {
    String legacyUrl = "legacyUrl"
    String marketingPagesUrl = "marketingPagesUrl"

    def setup() {
//        controller.trackingService = Mock(TrackingService)
        grailsApplication.config.valore.legacyUrl = legacyUrl
        grailsApplication.config.valore.marketingPages.url = marketingPagesUrl
    }

    def cleanup() {
    }

    void "test rankingCost"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/ranking-cost-higher-ed/"
        def expectedPath = "$marketingPagesUrl/ranking-cost-education"
        def expectedFacebookMetadata =
         "{site_name=Valore Books," +
         " image=$expectedPath/assets/images/share.png," +
         " title=Ranking the Cost of a Higher Education," +
         " url=$expectedCanonical," +
         " description=An analysis on the cost of a higher education and which schools produce the best paid graduates}"

        when:
        controller.rankingCost()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }

    void "test visualizingCollege"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/visualizing-college-out-of-state/"
        def expectedPath = "$marketingPagesUrl/visualizing-college-out-of-state"
        def expectedFacebookMetadata =
         "{site_name=Valore Books," +
         " image=$expectedPath/assets/images/share.jpg," +
         " title=Out-of-State Students," +
         " url=$expectedCanonical," +
         " description=Would you move to Washington, D.C. for a higher education? 98% of students in D.C. are from out-of-state.}"

        when:
        controller.visualizingCollege()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }

    void "test howToSellTextBooksOnValore"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/sell-textbooks/how-to-sell-textbooks-on-valorebooks/"
        def expectedPath = "$marketingPagesUrl/sell-textbooks/how-to-sell-textbooks-on-valorebooks"
        def expectedFacebookMetadata =
         "{site_name=Valore Books," +
         " image=$expectedPath/assets/images/share.jpg," +
         " title=Selling Your Textbooks To ValoreBooks | Sell Books To Valore," +
         " url=$expectedCanonical," +
         " description=At the end of every semester you are left with expensive textbooks you no longer need or have available space for. learn how you can use the ValoreBooks market place to get cash for the textbooks you no long have use for. Our process is simple and hassle free.  Get more information about selling your textbooks today.}"

        when:
        controller.howToSellTextBooksOnValore()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }

    void "test buyUsedTextBooks"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/buy-textbooks/buy-used-textbooks/"
        def expectedPath = "$marketingPagesUrl/buy-textbooks/buy-used-textbooks"
        def expectedFacebookMetadata =
                "{site_name=Valore Books," +
                        " image=$expectedPath/assets/images/share.jpg," +
                        " title=Buy Used Textbooks Online | Save Up to 90% on Textbooks," +
                        " url=$expectedCanonical," +
                        " description=Save a bundle this semester and order college textbooks online form ValoreBooks. Enjoy the peace of mind that comes with our 30-day-money-back guarantee.}"

        when:
        controller.buyUsedTextBooks()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }

    void "test sellOldTexbooksOnline"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/sell-textbooks/sell-old-textbooks-online/"
        def expectedPath = "$marketingPagesUrl/sell-textbooks/sell-old-textbooks-online"
        def expectedFacebookMetadata =
                "{site_name=Valore Books," +
                        " image=$expectedPath/assets/images/share.jpg," +
                        " title=Sell Textbooks Online | Get Cash for Old College Textbooks," +
                        " url=$expectedCanonical," +
                        " description=Have a stack of textbooks you no longer need? Sell them online. You can earn cash for your old textbooks. Find out how.}"

        when:
        controller.sellOldTextbooksOnline()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }

    void "test learnHowToSellTextbooksOnline"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/sell-textbooks/learn-how-to-sell-textbooks-online/"
        def expectedPath = "$marketingPagesUrl/sell-textbooks/learn-how-to-sell-textbooks-online"
        def expectedFacebookMetadata =
                "{site_name=Valore Books," +
                        " image=$expectedPath/assets/images/share.jpg," +
                        " title=Learn How to Sell Textbooks Online | Make Cash Fast," +
                        " url=$expectedCanonical," +
                        " description=Sell your old college textbooks online and put more money in your pocket. It&#39;s easy, convenient and saves time. Learn the latest hacks and tips to earn more here.}"

        when:
        controller.learnHowToSellTextbooksOnline()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }

    void "test sellTextbooksInPerson"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/sell-textbooks/sell-textbooks-in-person/"
        def expectedPath = "$marketingPagesUrl/sell-textbooks/sell-textbooks-in-person"
        def expectedFacebookMetadata =
                "{site_name=Valore Books," +
                        " image=$expectedPath/assets/images/share.jpg," +
                        " title=How to Sell your Textbooks in Person | ValoreBooks," +
                        " url=$expectedCanonical," +
                        " description=Get the most value from your college textbooks when it is time to sell them.  Click here for the definitive guide on selling textbooks in person, with tips on advertising, pricing and timing.}"

        when:
        controller.sellTextbooksInPerson()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }

    void "test onlineTextbookRental"() {
        given:
        views['/marketing-page/_landing.gsp'] = "\${canonical} \${path} \${facebookMetadata}"
        def expectedCanonical = "$legacyUrl/rent-textbooks/online-textbook-rental/"
        def expectedPath = "$marketingPagesUrl/rent-textbooks/online-textbook-rental"
        def expectedFacebookMetadata =
                "{site_name=Valore Books," +
                        " image=$expectedPath/assets/images/share.jpg," +
                        " title=Rent Textbooks Online | Cheap Online Textbook Rentals," +
                        " url=$expectedCanonical," +
                        " description=Cheap textbook rentals with low price guarantee &amp; free rental returns. Save up to \$500 on textbooks this year shopping our online marketplace.}"

        when:
        controller.onlineTextbookRental()

        then:
        response.text == "$expectedCanonical $expectedPath/index.html $expectedFacebookMetadata"
    }
}