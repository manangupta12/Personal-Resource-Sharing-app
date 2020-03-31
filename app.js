const express = require("express");
const mongoose = require("mongoose");
const methodoverride = require("method-override");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const flash   = require("connect-flash");
const middleware = require("./middleware");
const indexRoutes = require("./routes/index");
const User = require("./models/user");
const fileRoutes = require("./routes/file");
//==============>>>> Setting up the app >>>>>>>>==============
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://manan:manan@cluster0-yiw6j.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri, function(err, client) {
  if(err) {
       console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }
  console.log('Connected to MongoDB...');
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });


app.use(require("express-session")({
    secret: "I love my life !!",
    resave : false,
    saveUninitialized : false
}));
app.use(indexRoutes);
app.use("/file",fileRoutes);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));
app.use(function(req,res,next){
    res.locals.files = false;
    next();
    });
app.use(flash());
app.set("view engine","ejs");
//app.use(bodyParser.json);
app.use(methodoverride("_method"));

//====================MongoDb Atlas============================
const mongoURI = "mongodb+srv://manan:manan@cluster0-yiw6j.mongodb.net/test?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI);
//==============================================================


// @route GET /
// @desc Loads form

app.get("")
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));