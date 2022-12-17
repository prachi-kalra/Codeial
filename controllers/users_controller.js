module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"user_profile"
    });
}
// we need  a route to access our controller !
// we will create a new file in routes users.js!