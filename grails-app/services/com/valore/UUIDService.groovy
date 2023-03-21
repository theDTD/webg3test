package com.valore

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsyncClient
import com.amazonaws.services.dynamodbv2.document.DynamoDB
import com.amazonaws.services.dynamodbv2.document.Item
import com.amazonaws.services.dynamodbv2.document.KeyAttribute
import grails.util.Holders

class UUIDService {
    def grailsApplication

    static DynamoDB dynamo

    static {
        // load the credentials
        ConfigObject config = Holders.getConfig()
        AmazonDynamoDBAsyncClient client = new AmazonDynamoDBAsyncClient()
        client.setEndpoint("http://dynamodb.us-east-1.amazonaws.com/")
        dynamo = new DynamoDB(client)
    }

    void put(String email, String uuid) {
        def users = dynamo.getTable("Valore_User2")

        Item user = new Item().withPrimaryKey("EmailAddress", email).withString("UUID", uuid)

        users.putItem(user)
    }

    String getEmail(String uuid) {
        def users = dynamo.getTable("Valore_User2")
        def index = users.getIndex("UUID-index")

        def items = index.query(new KeyAttribute("UUID", uuid))

        def iter = items.iterator()
        if (iter.hasNext()) {
            return String.valueOf(iter.next().get("EmailAddress"))
        }

        null
    }

    String getUUID(String email) {
        def users = dynamo.getTable("Valore_User2")

        Item user = users.getItem("EmailAddress", email)
        if (user != null) {
            return String.valueOf(user.get("UUID"))
        }

        null
    }
}
