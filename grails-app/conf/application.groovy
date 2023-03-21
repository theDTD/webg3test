// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format
//
//grails.config.locations = [
//        "file:${userHome}/.grails/config/singleDatasource.groovy",
//        "file:/valore/config/singleDatasource.groovy"
//]
//
// if (System.properties["${appName}.config.location"]) {
//    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
// }

grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination

// The ACCEPT header will not be used for content negotiation for user agents containing the following strings (defaults to the 4 major rendering engines)
grails.mime.disable.accept.header.userAgents = ['Gecko', 'WebKit', 'Presto', 'Trident']
grails.mime.types = [ // the first one is the default format
    all:           '*/*', // 'all' maps to '*' or the first available format in withFormat
    atom:          'application/atom+xml',
    css:           'text/css',
    csv:           'text/csv',
    form:          'application/x-www-form-urlencoded',
    html:          ['text/html','application/xhtml+xml'],
    js:            'text/javascript',
    json:          ['application/json', 'text/json'],
    multipartForm: 'multipart/form-data',
    rss:           'application/rss+xml',
    text:          'text/plain',
    hal:           ['application/hal+json','application/hal+xml'],
    xml:           ['text/xml', 'application/xml']
]

// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000

// Legacy setting for codec used to encode data with ${}
grails.views.default.codec = "html"

// The default scope for controllers. May be prototype, session or singleton.
// If unspecified, controllers are prototype scoped.
grails.controllers.defaultScope = 'singleton'

// GSP settings
grails {
    views {
        gsp {
            encoding = 'UTF-8'
            htmlcodec = 'xml' // use xml escaping instead of HTML4 escaping
            codecs {
                expression = 'html' // escapes values inside ${}
                scriptlet = 'html' // escapes output from scriptlets in GSPs
                taglib = 'none' // escapes output from taglibs
                staticparts = 'none' // escapes output from static template parts
            }
        }
        // escapes all not-encoded output at final stage of outputting
        // filteringCodecForContentType.'text/html' = 'html'
    }
}


grails.converters.encoding = "UTF-8"
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []
// whether to disable processing of multi part requests
grails.web.disable.multipart=false

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

// configure auto-caching of queries by default (if false you can cache individual queries with 'cache: true')
grails.hibernate.cache.queries = false

// configure passing transaction's read-only attribute to Hibernate session, queries and criterias
// set "singleSession = false" OSIV mode in hibernate configuration after enabling
grails.hibernate.pass.readonly = false
// configure passing read-only to OSIV session by default, requires "singleSession = false" OSIV mode
grails.hibernate.osiv.readonly = false

grails.plugins.cookie.path.defaultStrategy = 'root'

grails.plugin.awssdk.region = 'us-east-1'

// Google 3rd party script configuration defaults (DEV/QA)
valore.google.analytics.id = "UA-1407080-9"
valore.google.adwords.conversionId = 1111111
valore.google.adwords.conversionLabels = [
        global: "ddCrCKCD6QQQ2KDF6AM",
        productListing: "TEST_CONVERSION"
]

// Segment configuration default
valore.segment.writeKey = "JJuUfJ7CAc7i8hIKRNA5H14H49PCbvFQ"

// Marketing pages path (URL) on S3
valore.marketingPages.url = "https://static.valorebooks.com/marketing-pages"

valore.pla.campaigns = [ 'Froogle':'x0f6M7', 'BingFTP':'quIvVS' ]

valore {
    google {
        recaptcha {
            siteKey = '6LfS7yYUAAAAAKe46h9jD3bVckWO7TydnSzzmxoF'
        }
    }

    cart {
        lockTime {
            item = 5
            cart = 10
        }

        approvedReferers = ['valore.com', 'www.valore.com', 'valorebooks.com', 'www.valorebooks.com']
    }

    litleOnline {
        username = "SIMPLETKN"
        password = "cert2W4D"
        merchantId = "1166256"
        paypageId = "PovoYuHde8ojDy3m"
        reportGroup = "Default Report Group"
        jsUrl = "https://request.eprotect.vantivprelive.com"
        jsLitleApiUrl = "https://request.eprotect.vantivprelive.com/eProtect/litle-api2.js"
        jsUrlTest = "https://request.eprotect.vantivprelive.com"
        jsLitleApiUrlTest = "https://request.eprotect.vantivprelive.com/eProtect/litle-api2.js"

        antiFraud {
            sessionPrefix = "valor"
            orgId = "h1zcgl86"
        }
    }

    affiliate {
        commissionJunction {
            siteId = 'ekxlV1'
            cid = '1528604'

            type {
                sale = '363865'
                rental = '366111'
            }
        }
    }

    cookie {
        user_id = "ValoreUserID"
        anon_id = "ValoreAnonID"
        cartId = "VCartID"
        sellbackCartId = "VSellbackCartID"
        prevTransId = "VTxnID"
        affSiteId = "VAffSiteID"
        affTrackingId = "VAffTrackingID"
        legacy {
            affSiteId = "AffiliateSiteID"
            affTrackingId = "AffiliateTID"
        }
        checkoutIdentify = "VCheckoutID"
        ga = "_ga"
    }

    encryption.aes.password = 'U3RvZ3M='

    sqs {
        rental {
            overdue.queue = 'https://sqs.us-east-1.amazonaws.com/453787502721/DevRentalOverdueEmail'
            extension.queue = 'https://sqs.us-east-1.amazonaws.com/453787502721/DevRentalExtensionEmail'
            buyout.queue = 'https://sqs.us-east-1.amazonaws.com/453787502721/DevBuyoutEmail'
        }
    }
}

// Config for SegmentIOService
segmentio.enabled = true

hibernate {
    cache {
        queries = false
        use_second_level_cache = true
        use_query_cache = false
        region.factory_class = 'org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory'
    }
    connection.release_mode = "on_close"
}

dataSource {
    pooled = true
    jmxExport = true
    driverClassName = "org.h2.Driver"
    username = "sa"
    password = ""
}

quartz {
    autoStartup = true
    jdbcStore = true
    exposeSchedulerInRepository = false

    scheduler {
        instanceName = 'reporting_quartz'
        instanceId = 'AUTO'
        skipUpdateCheck = true
    }
    threadPool.class = 'org.quartz.simpl.SimpleThreadPool'
    threadPool.threadCount = 5
    threadPool.threadPriority = 5
    jobStore.class = 'org.quartz.impl.jdbcjobstore.JobStoreTX'
    jobStore {
        useProperties = false
        driverDelegateClass = 'org.quartz.impl.jdbcjobstore.StdJDBCDelegate'
        dataSource = 'dataSource'
        isClustered = true
        tablePrefix = 'QRTZ_'
        clusterCheckinInterval = 5000
    }
    plugin.shutdownhook.class = 'org.quartz.plugins.management.ShutdownHookPlugin'
    plugin.shutdownhook.cleanShutdown = true
}

environments {
    test {
        grails.auth.apiKey = 'test'
        grails.valore.apiUrl = "http://localhost:8090/api"

        valore {
            apiUrl = "http://localhost:8090/api"
            sourceUrl = "http://localhost:8081"
            buybackUrl = "http://localhost:8082/buyback"
        }

        dataSource {
            dbCreate = ""
            url = "jdbc:h2:mem:testDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
        }

        quartz {
            autoStartup = false
        }
    }
    development {
        grails.logging.jul.usebridge = true
        grails.valore.apiUrl = "http://localhost:8090/api"
        grails.auth.apiKey = 'test'

        valore {
            apiUrl = "http://localhost:8090/api"
            apiKey = 'test'
            legacyUrl = "https://localhost"
            paypalApi = "https://api.sandbox.paypal.com/v1"
            paypalAuthToken = "Basic QVY4S3N6NlJJQWRENlZDLVVUUDRadmVjYkxCUDlrcDlwcXJHVkNmT3pPVW5kMnB0RFV5WEVYODAzOWFLUFlYbk9jQTZ3cVhFcjNaQW4xQkI6RU0wdjZjYmwySW9EQVVZbGRybzN2bVEwdVJGS1ZNd2hQOVhfQWZSeWlnUWRlVnBFd2pVMFpiYmQ4ZU5Ib2ZZR2VISXhySDgxNmhYWW5BQVk="

            cart.approvedReferers = ['valore.com', 'www.valore.com', 'valorebooks.com', 'www.valorebooks.com', 'localhost']

            sourceUrl = "http://localhost:8081"
            buybackUrl = "http://localhost:8082/buyback"

            marketingPages {
                url = "https://static.valorebooks.com/marketing-pages-qa"
            }
        }

        segmentio.apiKey = "JJuUfJ7CAc7i8hIKRNA5H14H49PCbvFQ"

        dataSource {
            url = "jdbc:mysql://qa-db5.ct5q9cdxna74.us-east-1.rds.amazonaws.com:3306/qrtz_web?zeroDateTimeBehavior=convertToNull&useSSL=false"
            driverClassName = "com.mysql.cj.jdbc.Driver"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"

            properties {
                validationQuery = "SELECT 1"
                validationQueryTimeout = 3
                validationInterval = 15000
                testOnBorrow = true
                testWhileIdle = true
                testOnReturn = false
            }
        }
    }
    qa {
        grails.serverURL = "http://uat.valorebooks.com/vb"
        grails.assets.url = "//static.valorebooks.com/"
        grails.logging.jul.usebridge = true
        grails.valore.apiUrl = "http://localhost:8090/api"
        grails.auth.apiKey = 'test'

        grails.plugin.springsecurity.portMapper.httpPort = 80
        grails.plugin.springsecurity.portMapper.httpsPort = 443
        grails.plugin.springsecurity.secureChannel.definition = [
                [pattern: '/healthCheck/**',   access: 'ANY_CHANNEL'],
                [pattern: '/**',               access: 'REQUIRES_SECURE_CHANNEL']
        ]
        grails.plugin.springsecurity.auth.forceHttps = true
        grails.plugin.springsecurity.secureChannel.useHeaderCheckChannelSecurity = true
        grails.plugin.springsecurity.secureChannel.secureHeaderName = 'X-Forwarded-Proto'
        grails.plugin.springsecurity.secureChannel.secureHeaderValue = 'http'
        grails.plugin.springsecurity.secureChannel.insecureHeaderName = 'X-Forwarded-Proto'
        grails.plugin.springsecurity.secureChannel.insecureHeaderValue = 'https'

        valore {
            apiUrl = "http://localhost:8090/api"
            apiKey = 'test'
            legacyUrl = "https://uat.valorebooks.com"
            paypalApi = "https://api.sandbox.paypal.com/v1"
            paypalAuthToken = "Basic QVY4S3N6NlJJQWRENlZDLVVUUDRadmVjYkxCUDlrcDlwcXJHVkNmT3pPVW5kMnB0RFV5WEVYODAzOWFLUFlYbk9jQTZ3cVhFcjNaQW4xQkI6RU0wdjZjYmwySW9EQVVZbGRybzN2bVEwdVJGS1ZNd2hQOVhfQWZSeWlnUWRlVnBFd2pVMFpiYmQ4ZU5Ib2ZZR2VISXhySDgxNmhYWW5BQVk="

            cart.approvedReferers = ['valore.com', 'www.valore.com', 'valorebooks.com', 'www.valorebooks.com', 'legacy-vb-web-qa-1492487687.us-east-1.elb.amazonaws.com']

            sourceUrl = "http://localhost:8080"
            buybackUrl = "http://localhost:8080/buyback"

            marketingPages {
                url = "https://static.valorebooks.com/marketing-pages-qa"
            }
        }

        segmentio.apiKey = "JJuUfJ7CAc7i8hIKRNA5H14H49PCbvFQ"

        dataSource {
            dbCreate = ""
            url = "jdbc:mysql://qa-db01.vb.local:3306/qrtz_web?useSSL=false"
            driverClassName = "com.mysql.cj.jdbc.Driver"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"

            properties {
                // See http://grails.org/doc/latest/guide/conf.html#dataSource for documentation
                jmxEnabled = true
                initialSize = 5
                maxActive = 50
                minIdle = 5
                maxIdle = 25
                maxWait = 10000
                maxAge = 10 * 60000
                timeBetweenEvictionRunsMillis = 5000
                minEvictableIdleTimeMillis = 60000
                validationQuery = "SELECT 1"
                validationQueryTimeout = 3
                validationInterval = 15000
                testOnBorrow = true
                testWhileIdle = true
                testOnReturn = false
                jdbcInterceptors = "ConnectionState"
                defaultTransactionIsolation = java.sql.Connection.TRANSACTION_READ_COMMITTED
            }
        }
    }
    production {
        grails.assets.url = "//static.valorebooks.com/"
        grails.logging.jul.usebridge = false
        grails.valore.apiUrl = "http://localhost:8090/api"
        grails.valore.sourceUrl = ""
        grails.valore.buybackUrl = ""
        grails.auth.apiKey = 'P8z6CL6PAbQ='

        grails.plugin.springsecurity.portMapper.httpPort = 80
        grails.plugin.springsecurity.portMapper.httpsPort = 443
        grails.plugin.springsecurity.secureChannel.definition = [
                [pattern: '/healthCheck/**',   access: 'ANY_CHANNEL'],
                [pattern: '/**',               access: 'REQUIRES_SECURE_CHANNEL']
        ]
        grails.plugin.springsecurity.auth.forceHttps = true
        grails.plugin.springsecurity.secureChannel.useHeaderCheckChannelSecurity = true
        grails.plugin.springsecurity.secureChannel.secureHeaderName = 'X-Forwarded-Proto'
        grails.plugin.springsecurity.secureChannel.secureHeaderValue = 'http'
        grails.plugin.springsecurity.secureChannel.insecureHeaderName = 'X-Forwarded-Proto'
        grails.plugin.springsecurity.secureChannel.insecureHeaderValue = 'https'

        valore {
            apiUrl = "http://localhost:8090/api"
            sourceUrl = ""
            buybackUrl = ""
            apiKey = 'P8z6CL6PAbQ='
            legacyUrl = "https://www.valorebooks.com"

            paypalApi = "https://api.paypal.com/v1"
            paypalAuthToken = "Basic QVZfMnVtU2lUUUktNmRtejRvUHIwQmpFcTEwSEFWSFdmR0EwdTdmc2lDUEJqSTFSb0VFZVFIeVlrQjlUWG9ScHVGcy1Qa3loWk1sNGEtd3I6RUU0MnIyREdiT2FId1lpTmV0SmItYW9xOUQ3TndwRHpZWGZpNWVHYzBJXy1hWG82MmJ3ZG5TcHZVZFAtbVU2ZGxqZkFWcy1CeC1ZUHk5T3A="

            google {
                analytics.id = "UA-1407080-1"

                adwords {
                    conversionId = 1024544856
                    conversionLabels = [ productListing: "NDMsCKicxQIQ2KDF6AM" ]
                }
            }

            segment.writeKey = "zDmcm2QuYHZ1Zit2MXs8Ik24FOc2FnyH"

            litleOnline{
                username = "SMPTUITION"
                password = "5xAwQ4v3"
                merchantId = "7214300"
                paypageId = "PovoYuHde8ojDy3m"
                reportGroup = "Default Report Group"
                jsUrl = "https://request.eprotect.vantivcnp.com"
                jsLitleApiUrl = "https://request.eprotect.vantivcnp.com/eProtect/litle-api2.js"
                jsUrlTest = "https://request.eprotect.vantivprelive.com"
                jsLitleApiUrlTest = "https://request.eprotect.vantivprelive.com/eProtect/litle-api2.js"
            }

            sqs {
                rental {
                    overdue.queue = 'https://sqs.us-east-1.amazonaws.com/453787502721/RentalOverdueEmail'
                    extension.queue = 'https://sqs.us-east-1.amazonaws.com/453787502721/RentalExtensionEmail'
                    buyout.queue = 'https://sqs.us-east-1.amazonaws.com/453787502721/ProdBuyoutEmail'
                }
            }

            sourceUrl = "http://localhost:8080"
            buybackUrl = "http://localhost:8080/buyback"
        }

        segmentio.apiKey = "zDmcm2QuYHZ1Zit2MXs8Ik24FOc2FnyH"

        dataSource {
            dbCreate = ""
            url = "jdbc:mysql://prod-db04.ct5q9cdxna74.us-east-1.rds.amazonaws.com:3306/qrtz_web?useSSL=false"
            driverClassName = "com.mysql.cj.jdbc.Driver"
            dialect = "org.hibernate.dialect.MySQL5InnoDBDialect"

            properties {
                // See http://grails.org/doc/latest/guide/conf.html#dataSource for documentation
                jmxEnabled = true
                initialSize = 5
                maxActive = 50
                minIdle = 5
                maxIdle = 25
                maxWait = 10000
                maxAge = 10 * 60000
                timeBetweenEvictionRunsMillis = 5000
                minEvictableIdleTimeMillis = 60000
                validationQuery = "SELECT 1"
                validationQueryTimeout = 3
                validationInterval = 15000
                testOnBorrow = true
                testWhileIdle = true
                testOnReturn = false
                jdbcInterceptors = "ConnectionState"
                defaultTransactionIsolation = java.sql.Connection.TRANSACTION_READ_COMMITTED
            }
        }
    }
}


grails.plugin.springsecurity.controllerAnnotations.staticRules = [
        [pattern: '/**', access: ['permitAll']]
]
grails.plugin.springsecurity.filterChain.chainMap = [
        [pattern: '/**', filters: 'securityHeaderFilter']
]
