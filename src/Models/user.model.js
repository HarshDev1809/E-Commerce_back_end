const mongoose = require("mongoose");
const {state} = require("../Utils/constants");

const cartSchema = mongoose.Schema({
    uId : {
        type : Number
    },

    quantity : {
        type : Number
    }
})

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        minLength : 4
    },

    passWord : {
        type : String,
        required : true,
        minLength : 8
    },

    emailId : {
        type : String,
        required : true
    },

    name : {
        type : String,
        required : true
    },

    address : {
        houseNo : {
            type : String
        },
        area : {
            type : String,
        },
        landMark : {
            type : String,
        },
        town : {
            type : String,
        },
        state : {
            type : String,
            enum : state
        },
        pinCode : {
            type : Number,
        }
    },
    phoneNumber : {
        type : Number,
    },
    shoppingCart : {
        type : [cartSchema],
        default : []
    },
    wishList : {
        type : [Number],
        default : []
    },
    userType : {
        type : String,
        default : "normalUser",
        immutable : true
    },
    order : {
        type : [Number],
        default : []
    }
})

const User = mongoose.model("ECommerceUserDB",userSchema);

module.exports = User;