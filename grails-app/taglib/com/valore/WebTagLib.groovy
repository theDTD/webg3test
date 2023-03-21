package com.valore

class WebTagLib {
    static namespace = "vb"

    // TODO: Allow setting the rounding mode dynamically
    def moneyFormat = { attrs ->
        String html = ""

        String value = "$attrs.value".replaceAll('\\$', '')

        try {
            BigDecimal bigDecimal = value.contains('.') ? new BigDecimal(value).setScale(2, BigDecimal.ROUND_DOWN) : new BigDecimal(value).movePointLeft(2)

            String classes = "${attrs.class ? "${attrs.class} " : ""}moneyformat"
            if (bigDecimal == 0 && !classes.contains("gray-light")) {
                classes += " gray-light"
            }

            html = "<span class=\"$classes\"><span>\$</span>${"$bigDecimal".replaceFirst('\\.', '<span>.')}</span></span>"
        }
        catch (Exception e) {
            // TODO: Add logging?
        }
        finally {
            out << html
        }
    }
}
