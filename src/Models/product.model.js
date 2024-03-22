const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    uId : {
        type: Number,
        required : true
    },

    name : {
        type: String,
        required : true
    },

    description : {
        type: String,
        required : true
    },

    price : {
        type: Number,
        required : true
    },

    displayPrice : {
        type : Number,
        required : true
    },

    productCount : {
        type : Number,
        required : true,
        default : 1
    }
})

const Product = mongoose.model("ECommerceProductDB",productSchema);

module.exports = Product;