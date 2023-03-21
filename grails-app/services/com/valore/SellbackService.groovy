package com.valore

import com.valore.util.AwsUtil
import grails.util.Environment
import groovy.json.JsonSlurper

class SellbackService {
    final static Map<String, Object> DEFAULT_CONTENT = [
        "faq": [
            [
                "id": 1,
                "question": "What's an ISBN?",
                "answer": "ISBN is the acronym for International Standard Book Number. This 10 or 13-digit number identifies a specific book, an edition of a book, or a book-like product (such as an audiobook). An ISBN can usually be found on the back cover, next to the barcode. If a book doesn't show the ISBN on the back cover, look on the page featuring the copyright and publisher information and the ISBN will be found there."
            ],
            [
                "id": 2,
                "question": "How long does it take to get paid?",
                "answer": "Once your item is received at our warehouse and approved, payment is issued within 14 business days."
            ],
            [
                "id": 3,
                "question": "How can I get paid for selling my book?",
                "answer": "ValoreBooks supports two methods of payment:\n\nCheck\n\nOnce a check has been issued, you can expect to receive your payment within 7-14 business days. Checks will be sent through USPS first class mail to the address you listed on your sellback order.\n\nPayPal\n\nOnce issued, Paypal payments typically post to your account within 2-14 business days. Payments will be deposited using the email provided during checkout."
            ],
            [
                "id": 4,
                "question": "Where can I drop off my textbook?",
                "answer": "Drop your books off at any UPS location. And make sure to bring your shipping label, so that you don't have to pay for shipping!"
            ],
            [
                "id": 5,
                "question": "How can I check whether you've received my book?",
                "answer": "The best way to track receipt is via the tracking number that UPS provides. To check whether we've received your book, visit the UPS website, and type in the tracking number provided."
            ],
            [
                "id": 6,
                "question": "Who can I call or email if I have questions about my sale?",
                "answer": "You can reach our Valorebooks customer service at sellbackhelp@valore.com."
            ]
        ],
        "how-it-works": [
            [
                "id": 1,
                "icon": "faBook",
                "header": "Sell your books",
                "body": "Get an instant quote from ValoreBooks, sell only the textbooks you want to."
            ],
            [
                "id": 2,
                "icon": "faTruck",
                "header": "Ship for free",
                "body": "Print your free shipping label and drop your books off at your nearest USPS."
            ],
            [
                "id": 3,
                "icon": "faDollarSign",
                "header": "Get paid",
                "body": "Select either Paypal or check to get paid for your textbooks."
            ]
         ]
    ] as Map<String, Object>

    private static String S3_SELLBACK_URL = "https://valore-assets.s3.amazonaws.com/"

    Map<String, Object> readContentFromS3(String modifier) {
        String subfolder = "sellback/$Environment.current.name/"
        String defaultPath = "default/content.json"
        String path = modifier ? "$modifier/content.json" : defaultPath

        InputStream inputStream = AwsUtil.readS3File('valore-assets', "$subfolder$path")
        if (inputStream == null && path != defaultPath) {
            inputStream = AwsUtil.readS3File('valore-assets', "$subfolder$defaultPath")
        }

        Map<String, Object> content =
            inputStream ? new JsonSlurper().parse(inputStream as InputStream) as Map<String, Object> : DEFAULT_CONTENT

        content.collectEntries { k, v ->
            if (v instanceof List<Map>) {
                [k, v.sort { a, b -> a.id <=> b.id } ]
            } else [k, v]
        } as Map<String, Object>
    }

    String returnPathFromS3(String modifier, String fileName) {
        String subfolder = "sellback/$Environment.current.name/"
        String defaultPath = "default/$fileName"
        String path = modifier ? "$modifier/$fileName" : defaultPath

        InputStream inputStream = AwsUtil.readS3File('valore-assets', "$subfolder$path")
        if (inputStream == null && path != defaultPath) {
            inputStream = AwsUtil.readS3File('valore-assets', "$subfolder$defaultPath")
            if (inputStream != null) {
                "$S3_SELLBACK_URL$subfolder$defaultPath"
            }
        } else {
            "$S3_SELLBACK_URL$subfolder$path"
        }
    }

    Map<String, Object> returnFileContentAsMap(String modifier) {
        ClassLoader classLoader = this.class.classLoader

        InputStream contentFromFile = classLoader.getResourceAsStream("sellback/${modifier}/landing.json")
        if (contentFromFile == null) {
            modifier = 'default'
            contentFromFile = classLoader.getResourceAsStream("sellback/${modifier}/landing.json")
        }

        Map<String, Object> content = new JsonSlurper().parse(contentFromFile) as Map<String, Object>

        content.collectEntries { k, v ->
            if (v instanceof List<Map>) {
                [k, v.sort { a, b -> a.id <=> b.id } ]
            } else [k, v]
        } as Map<String, Object>
        content << [["modifier": modifier]]
    }

    String getSiteIdFromDynamoDB(String modifier) {
        String environment = "$Environment.current.name".toLowerCase()
        String tableName = "${environment}_whitelabel_affiliates"

        Map dynamoTableMap = AwsUtil.getDynamoTableMap(tableName)
        Map dynamoItems = dynamoTableMap?.collectEntries { k, v -> [k, v['siteId']] }

        dynamoItems? dynamoItems[(modifier)] : null
    }
}
