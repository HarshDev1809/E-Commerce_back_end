const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({

    adminId : {
        type: Number,
        required : true
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

    userType : {
        type : String,
        default : "admin",
        immutable : true
    }
})

const Admin = mongoose.model("ECommerceAdminDB",adminSchema);

module.exports = Admin;