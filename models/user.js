var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var User_schema = mongoose.Schema({
    username : String,
    password : String,
});
User_schema.plugin(passportLocalMongoose);
const User = mongoose.model("User",User_schema);

module.exports = mongoose.model("User",User_schema);