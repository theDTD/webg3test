package com.valore

import com.amazonaws.services.dynamodbv2.document.DynamoDB
import com.amazonaws.services.dynamodbv2.document.KeyAttribute
import grails.test.mixin.TestFor
import groovy.mock.interceptor.MockFor
import spock.lang.Specification
import com.amazonaws.services.dynamodbv2.document.Item

@TestFor(UUIDService)
class UUIDServiceSpec extends Specification{

    String TABLE_NAME = "Valore_User2"
    String INDEX_NAME = "UUID-index"

    String EMAIL_KEY = "EmailAddress"
    String UUID_KEY = "UUID"

    String EMAIL_VALUE = "email@whatever.com"
    String UUID_VALUE = "0"

    def result

    class FakeTable {
        def putItem(Item item) {
            assert item.getClass() == Item.class
            assert item.get(EMAIL_KEY) == EMAIL_VALUE
            assert item.get(UUID_KEY) == UUID_VALUE
            result = true
        }

        def getIndex(String name) {
            assert name == INDEX_NAME
            return new FakeIndex()
        }

        Item getItem(String key, String value){
            assert key == EMAIL_KEY
            assert value == EMAIL_VALUE
            return new Item().withPrimaryKey(EMAIL_KEY, EMAIL_VALUE).withString(UUID_KEY, UUID_VALUE)
        }
    }

    class FakeIndex {
        def query(KeyAttribute ka) {
            assert ka.name == UUID_KEY
            assert ka.value == UUID_VALUE
            def item = new Item().withPrimaryKey(EMAIL_KEY, EMAIL_VALUE).withString(UUID_KEY, UUID_VALUE)
            [ item ]
        }
    }

    def setup() {
    }

    def cleanup() {
    }

    void "test put"() {
        given:
        def dynamo = new MockFor(DynamoDB)
        result = false

        and:
        dynamo.demand.with {
            getTable(1) { def arg ->
                assert arg == TABLE_NAME
                return new FakeTable()
            }
        }

        when:
        dynamo.use {
            service.put(EMAIL_VALUE, UUID_VALUE)
        }

        then:
        result
    }

    void "test getEmail"() {
        given:
        def dynamo = new MockFor(DynamoDB)
        result = false

        and:
        dynamo.demand.with {
            getTable(1) { def arg ->
                assert arg == TABLE_NAME
                return new FakeTable()
            }
        }

        when:
        dynamo.use {
            result = service.getEmail(UUID_VALUE)
        }

        then:
        assert result == EMAIL_VALUE
    }

    void "test getUUID"() {
        given:
        def dynamo = new MockFor(DynamoDB)
        result = false

        and:
        dynamo.demand.with {
            getTable(1) { def arg ->
                assert arg == TABLE_NAME
                return new FakeTable()
            }
        }

        when:
        dynamo.use {
            result = service.getUUID(EMAIL_VALUE)
        }

        then:
        assert result == UUID_VALUE
    }

}