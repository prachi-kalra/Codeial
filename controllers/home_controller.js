module.exports.home=function(req,res){
 console.log(req.cookies);
 res.cookie('user_id','25');
  return res.render('home',{
    title:"home"
  });
}
// earlier i was doing res.send..but now i want my controller to render an html/ejs file
