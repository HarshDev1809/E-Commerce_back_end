const mongoose = require("mongoose");
const { orderStatus } = require("../Utils/constants");

const orderSchema = mongoose.Schema({
    orderId : {
        type : Number,
    },

    customerId : {
        type : Number
    },

    orderDate : {
        type : String
    },

    deliveryDate : {
        type : String
    },

    orderStatus : {
        type : String,
        default : "Pending",
        enum : orderStatus
    }
});

const Order = mongoose.model("ECommerceOrderDB",orderSchema);

module.exports = Order;