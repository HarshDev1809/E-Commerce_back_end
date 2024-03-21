const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
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

    adminPassword : {
        type: String,
        required : true,
        minLength : 8
    }
})

const Admin = mongoose.model("ECommerceAdminDB",adminSchema);

module.exports = Admin;