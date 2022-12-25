const { localsName } = require("ejs");
const User = require("../models/user");

module.exports.profile=function(req,res){
     User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"User Profile",
            profile_user:user            
        });
     });

}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        });
     }else{
        return res.status(401).send('Unauthorized');
     }
}
// we need  a route to access our controller !
// we will create a new file in routes users.js!
//we will have to define couple of more actions for sign up !
module.exports.signUp=function(req,res){
    //so that the sign-in and sign-up pages are not easily accessible !
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial|Sign UP"
    });
}
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial|Sign In"
    });
}

// get the sign up data
module.exports.create=function(req,res){
if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
}
User.findOne({email:req.body.email},function(err,user){
    if(err){
        console.log('error in finding the user in signing up !');
        return;
    }
    if(!user){
        User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating ');
                return;
            }
            return res.redirect('/users/sign-in');
        })
    }else{
        return res.redirect('back');
    }
});
}
//sign in and create a session for the user !
module.exports.createSession=function(req,res){

// User.findOne({email:req.body.email},function(err,user){
//     if(err){
//         console.log('error in finding the user signing in');
//         return;
//     }if(user){
//         if(user.password!=req.body.password){
//             return res.redirect('back');
//         }
//         res.cookie('user_id',user.id);
//         return res.redirect('/users/profile');
//     }else{
//         return res.redirect('back');
//     }
// });
return res.redirect('/');
}
module.exports.destroySession=function(req,res,next){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}