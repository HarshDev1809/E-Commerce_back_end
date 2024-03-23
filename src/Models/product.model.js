const mongoose = require("mongoose");
const { tags } = require("../Utils/constants");

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
    },

    productUrl : {
        type : String,
        default : "https://drive.google.com/file/d/1pxm7Me1-HTSBd6TPyiitFV0vbaepiJGg/view?usp=drive_link"
    },

    tags : {
        type : [String],
        enum : tags,
        default : []
    },

    productImages : {
        type : [String],
        default : []
    }
})

const Product = mongoose.model("ECommerceProductDB",productSchema);

module.exports = Product;