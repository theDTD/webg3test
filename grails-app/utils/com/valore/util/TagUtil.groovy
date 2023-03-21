package com.valore.util

class TagUtil {
    static String attributesToString(Map attrs) {
        def attributes = ""
        for (Map.Entry attribute : attrs)
            attributes += attributeToString(attribute) + ' '
        attributes
    }

    static String attributeToString(Map.Entry attribute) {
        "${attribute.key}=\"${attribute.value}\""
    }

    static String createImage(Map attrs) {
        "<img ${attributesToString(attrs)}>"
    }

    static String createLink(Map attrs, def content) {
        "<a ${attributesToString(attrs)}>$content</a>"
    }
}
