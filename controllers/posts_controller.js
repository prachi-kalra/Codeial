const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log("ERROR",err);
        return;
    }
    
}
//controller to destroy !
module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        // if the same user who created it ,if he is trying to delete it 
            if(post.user==req.user.id){
            post.remove();
            //corresponding comments are deleted if post with {} particular id is found !
            //else we are handling the error !
            await Comment.deleteMany({post:req.params.id});
                return res.redirect('back');
            
            }else{
                 return res.redirect('back');
            }
        }
     catch(err){
        console.log("ERROR",err);
        return;
    }
      
}