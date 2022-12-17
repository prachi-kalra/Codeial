module.exports.home=function(req,res){
  return res.render('home',{
    title:"home"
  });
}
// earlier i was doing res.send..but now i want my controller to render an html/ejs file
