
// 1st step:-authenticating our user
//2nd step:serializing
//3rd step :deserializing !
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/user');
//tell the passport to use local strategy !
//and we are also authenticating our user with the help of passport !
passport.use(new localStrategy({
    usernameField:'email'
},
function(email,password,done){
    //find a user and establish the identity!
    User.findOne({email:email},function(err,user){
        if(err){
            console.log("error in finding the user-->Passport");
            return done(err);
        }
        if(!user ||user.password!=password){
            console.log("invalid username/password");
            return done(null,false);
        }
        //if user found
        return done(null,user);
    });
}

));
//serializing !
passport.serializeUser(function(user,done){
    done(null,user.id);
    //this info will be encrypted in our cookie !
});
//deserializing !
passport.deserializeUser(function(id,done){
          User.findById(id,function(err,user){
                        if(err){
                            console.log("error in finding the user-->Passport");
                            return done(err);
                        }
                        //otherwise
                        return done(null,user);
          });
});
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}
//set authenticated users to views !
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;