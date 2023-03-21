package com.valore.data.cart

enum ShippingType {
    STANDARD(1, "Standard"),
    EXPEDITED(2, "Expedited"),
    SECOND_DAY(3, "Second Day"),
    NEXT_DAY(4, "Next Day"),
    DIGITAL_DELIVERY(5, "Digital Delivery")

    int id
    String name

    private ShippingType(id, name) {
        this.id = id
        this.name = name
    }

    static ShippingType getShippingType(String name) {
        values().find {it.name ==~ "(?i)$name"}
    }
}
