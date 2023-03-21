package com.valore

import com.valore.data.WebImageSize
import com.valore.util.ProductImageUrlUtil
import com.valore.util.ProductUrlUtil
import com.valore.util.TagUtil


class ProductTagLib {
    static namespace = "vb"

    def productLink = { attrs, body ->
        def title = attrs.remove('title')
        def edition = attrs.remove('edition')
        def isbn = attrs.remove('isbn')
        attrs['href'] = ProductUrlUtil.generateURL(title, edition, isbn)

        out << TagUtil.createLink(attrs, body())
    }

    def productImage = { attrs ->
        boolean hasImage = Boolean.parseBoolean(attrs.remove('hasImage')?.toString())
        boolean secure = Boolean.parseBoolean(attrs.remove('secure')?.toString())
        String productCode = attrs.remove('productCode')?.toString() ?: ""
        String productCodeType = attrs.remove('productCodeType')?.toString() ?: ""
        WebImageSize size = WebImageSize.valueOf(attrs.remove('size')?.toString()?.toUpperCase() ?: "MEDIUM")

        attrs['src'] = ProductImageUrlUtil.getProductImageUrl(productCode, productCodeType, hasImage, size, secure)

        out << TagUtil.createImage(attrs)
    }

    def appendOrdinal = { attrs ->
        def val = attrs.get('number')
        if (!val.isNumber() || "$val".contains('.')) {
            out << val
            return
        }

        def num = val as long
        def hundredRemainder = num % 100
        def tenRemainder = num % 10

        if (hundredRemainder - tenRemainder == 10) {
            out << val + "th"
            return
        }

        switch (tenRemainder) {
            case 1:
                out << val + "st"
                break
            case 2:
                out << val + "nd"
                break
            case 3:
                out << val + "rd"
                break
            default:
                out << val + "th"
        }
    }

    def author = { attr, body ->
        if (attr.attributes) {
            for (def attribute : attr.attributes) {
                if (attribute['type'] == 4)
                    out << "by ${attribute['value'].replace("|,", " ")}".toString()
            }
        }
    }
}
