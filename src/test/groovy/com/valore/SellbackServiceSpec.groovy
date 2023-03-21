package com.valore

import com.valore.util.AwsUtil
import grails.test.mixin.TestFor
import grails.util.Environment
import groovy.json.JsonSlurper
import groovy.mock.interceptor.MockFor
import spock.lang.Specification
import spock.lang.Unroll

/**
 * See the API for {@link grails.test.mixin.services.ServiceUnitTestMixin} for usage instructions
 */
@TestFor(SellbackService)
class SellbackServiceSpec extends Specification {

    def setup() {
    }

    def cleanup() {
        GroovySystem.metaClassRegistry.removeMetaClass(JsonSlurper)
    }

    @Unroll
    void "test readContentFromS3 (success on read)"() {
        given:
        Collection numberOfItems = (1..3)
        Closure transformation = { int it -> [id: it, data: "value$it"] }
        Map contentFromFile =
            [number: 123, list: numberOfItems.reverse().collect(transformation)]
        Map<String, Object> expected =
            [number: 123, list: numberOfItems.collect(transformation)]
        InputStream inputStreamMock = GroovyMock(InputStream)
        JsonSlurper jsonSlurperMock = Mock(JsonSlurper)
        JsonSlurper.metaClass.constructor = { -> jsonSlurperMock }

        and:
        def awsUtilMockFor = new MockFor(AwsUtil)
        awsUtilMockFor.demand.with {
            readS3File(1) { String bucket, String key ->
                assert bucket == 'valore-assets'
                assert key == "sellback/test/${modifier ?: 'default'}/content.json"
                succeedOnFirstRead ? inputStreamMock : null
            }
            readS3File(succeedOnFirstRead ? 0 : 1) { String bucket, String key ->
                assert bucket == 'valore-assets'
                assert key == "sellback/test/default/content.json"
                inputStreamMock
            }
        }

        when:
        Map<String, Object> actual = null
        awsUtilMockFor.use {
            actual = service.readContentFromS3(modifier)
        }

        then:
        1 * inputStreamMock.asBoolean() >> true
        1 * jsonSlurperMock.parse(inputStreamMock) >> contentFromFile
        actual.toString() == expected.toString() // Need to use toString to validate order

        where:
        modifier << [null, '', 'test', 'test']
        succeedOnFirstRead << [true, true, true, false]
    }

    @Unroll
    void "test readContentFromS3 (fail on all reads)"() {
        given:
        JsonSlurper jsonSlurperMock = Mock(JsonSlurper)
        JsonSlurper.metaClass.constructor = { -> jsonSlurperMock }

        and:
        def awsUtilMockFor = new MockFor(AwsUtil)
        awsUtilMockFor.demand.with {
            readS3File(1) { String bucket, String key ->
                assert bucket == 'valore-assets'
                assert key == "sellback/test/${modifier ?: 'default'}/content.json"
                null
            }
            readS3File(modifier ? 1 : 0) { String bucket, String key ->
                assert bucket == 'valore-assets'
                assert key == "sellback/test/default/content.json"
                null
            }
        }

        when:
        Map<String, Object> result = null
        awsUtilMockFor.use {
            result = service.readContentFromS3(modifier)
        }

        then:
        0 * jsonSlurperMock.parse(*_)
        result.toString() == SellbackService.DEFAULT_CONTENT.toString() // Need to use toString to validate order

        where:
        modifier << [null, 'test']
    }

    @Unroll
    void "test returnPathFromS3"() {
        given:
        String s3Url = "https://valore-assets.s3.amazonaws.com/sellback/$Environment.current.name/default/"
        int returnPathFromS3CallCount = 0

        when:
        String actual = service.returnPathFromS3('', expectedFileName)
        returnPathFromS3CallCount++

        then:
        returnPathFromS3CallCount == 1
        actual == "$s3Url$expectedFileName"

        where:
        expectedFileName << ['header-logo.svg', 'landing.scss']
    }

    @Unroll
    void "test returnFileContentAsMap"() {
        given:
        Collection numberOfItems = (1..3)
        Closure transformation = { int it -> [id: it, data: "value$it"] }
        Map contentFromFile =
            [number: 123, list: numberOfItems.reverse().collect(transformation)]
        Map<String, Object> expected =
            [number: 123, list: numberOfItems.collect(transformation), modifier: exists ? modifier : 'default']
        JsonSlurper jsonSlurperMock = Mock(JsonSlurper)
        JsonSlurper.metaClass.constructor = { -> jsonSlurperMock }

        when:
        Map<String, Object> actual = service.returnFileContentAsMap(modifier)

        then:
        1 * jsonSlurperMock.parse(_ as InputStream) >> { InputStream inputStream ->
            String inputStreamText = inputStream?.getText()
            assert inputStreamText
            String expectedFilePath = "sellback/${exists ? modifier : 'default'}/landing.json"
            InputStream expectedInputStream = this.class.classLoader.getResourceAsStream(expectedFilePath)
            assert inputStreamText == expectedInputStream.getText()
            contentFromFile
        }
        actual == expected

        where:
        modifier << ["test", "undefined"]
        exists << [true, false]
    }

    @Unroll
    void "test getSiteIdFromDynamoDB"() {
        given:
        def modifier = 'modifier1'
        List propsList = [1]
        Map dynamoProperties = returnProperties ? propsList.collectEntries { ["modifier1", ["siteId": "siteId$it"]] } : null

        and:
        def awsUtilMock = new MockFor(AwsUtil)
        awsUtilMock.demand.with {
            getDynamoTableMap(1) { String tableName ->
                assert tableName == "test_whitelabel_affiliates"
                dynamoProperties
            }
        }

        when:
        def result
        awsUtilMock.use {
            result = service.getSiteIdFromDynamoDB(modifier)
        }

        then:
        result == expected

        where:
        returnProperties << [true, false]
        expected << ['siteId1', null]
    }
}
