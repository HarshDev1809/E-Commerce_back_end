const mongoose = require("mongoose");
const {state} = require("../Utils/constants");
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
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "ECommerceProductDB",
        default : []
    },
    wishList : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "ECommerceProductDB",
        default : []
    },
    userType : {
        type : String,
        default : "normalUser",
        immutable : true
    }
})

const User = mongoose.model("ECommerceUserDB",userSchema);

module.exports = User;