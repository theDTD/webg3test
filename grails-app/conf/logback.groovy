import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.rolling.RollingFileAppender
import ch.qos.logback.core.rolling.TimeBasedRollingPolicy
import grails.util.BuildSettings
import grails.util.Environment
import org.springframework.boot.logging.logback.ColorConverter
import org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter

import java.nio.charset.Charset

conversionRule 'clr', ColorConverter
conversionRule 'wex', WhitespaceThrowableProxyConverter

// See http://logback.qos.ch/manual/groovy.html for details on configuration
appender('STDOUT', ConsoleAppender) {
    encoder(PatternLayoutEncoder) {
        charset = Charset.forName('UTF-8')

        pattern = '%p WEB %d{YYYY-MM-dd HH:mm:ss:SSS} %c{2} %m%n'
    }
}
appender('VALORE', RollingFileAppender) {
    file = '/var/log/valore/web.log'
    append = true
    encoder(PatternLayoutEncoder) {
        charset = Charset.forName('UTF-8')

        pattern = '%p WEB %d{YYYY-MM-dd HH:mm:ss:SSS} %t %c{2} - %m%n'
    }
    rollingPolicy(TimeBasedRollingPolicy) {
        fileNamePattern = '/var/log/valore/web.log.%d{yyyy-MM-dd}'
    }
}

logger("grails.app.services.grails.plugin.cookie.CookieService", ERROR, ['STDOUT', 'VALORE'])
logger("grails.app.init.BootStrap", INFO, ['STDOUT', 'VALORE'], false)

def targetDir = BuildSettings.TARGET_DIR
if (Environment.isDevelopmentMode() && targetDir != null) {
    appender("FULL_STACKTRACE", FileAppender) {
        file = "${targetDir}/stacktrace.log"
        append = true
        encoder(PatternLayoutEncoder) {
            pattern = "%level %logger - %msg%n"
        }
    }
    logger("StackTrace", ERROR, ['FULL_STACKTRACE'], false)
    logger("grails.app", TRACE, ['STDOUT', 'VALORE'])
} else {
    logger("grails.app", DEBUG, ['STDOUT', 'VALORE'])
}
