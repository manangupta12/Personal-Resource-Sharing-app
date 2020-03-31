const express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user")
    middleware = require("../middleware");
    
router.use(function(req,res,next){
res.locals.currentUser = req.user;
next();
});

var newUser = new User({
    username : "admin"
});


router.get("/",function(req,res){
    res.render("index");
})
router.get("/login",function(req,res){
    res.render("login");
})

router.post("/login",passport.authenticate("local",{
            successRedirect: "/",
            failureRedirect: "/register"
    }),function(req,res){
        
})

router.get("/register",function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
    User.find({},(err,user)=>{
        console.log(user);
    })
    var newUser = new User({
        username : req.body.username
    });
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            //console.log(user);
            passport.authenticate("local")(req,res,function(){
            res.redirect("/index");
            });
        }
    })
})

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

module.exports = router;