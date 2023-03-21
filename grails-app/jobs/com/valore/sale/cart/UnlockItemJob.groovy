package com.valore.sale.cart

import com.valore.util.ApiUtil

class UnlockItemJob {
    def execute(context) {
        def now = new Date()
        Map data = context.mergedJobDataMap
        String cartId = data['cartId']
        String cartItemId = data['cartItemId']

        ApiUtil.get(id: cartItemId, path: 'cartItem/unlock', query: [cart: cartId])
        log.debug("$UnlockItemJob.simpleName took ${new Date().time - now.time} ms.")
    }
}
