package web.g3

import com.valore.util.ApiUtil
import org.apache.http.HttpStatus

class HealthCheckController {

    def index() {
        String[] urlList = [
                grailsApplication.config.valore.apiUrl,
                grailsApplication.config.valore.sourceUrl,
                grailsApplication.config.valore.buybackUrl,
        ]
        int status = HttpStatus.SC_OK
        String text = 'Good'

        for (String url in urlList) {
            try {
                def (json, statusCode) = ApiUtil.get(domain: url, path: "healthCheck/index", includeStatus: true)

                if (statusCode != HttpStatus.SC_OK) {
                    status = HttpStatus.SC_INTERNAL_SERVER_ERROR
                    text = 'Something is not right'
                    break
                }
            } catch (ignore) {
                status = HttpStatus.SC_INTERNAL_SERVER_ERROR
                text = 'Something is not right'
                break
            }
        }
        render status: status, text: text
    }

}
