const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            //made change
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created !"
            });
        }
        req.flash('success', 'Post published!');

        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        console.log("ERROR",err);
        return res.redirect('back');

    }
    
}
//controller to destroy !
module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        // if the same user who created it ,if he is trying to delete it 
            if(post.user==req.user.id){
                await Like.deleteMany({
                    likeable:post,onModel:'Post'
                });
                await Like.deleteMany({_id:{$in:post.comments}})
            post.remove();
            //corresponding comments are deleted if post with {} particular id is found !
            //else we are handling the error !
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted ! !"
                });
            }
            req.flash('success', 'Post and associated comments deleted!');
                return res.redirect('back');
            
            }else{
                req.flash('error', 'You cannot delete this post!');

                 return res.redirect('back');
            }
        }
     catch(err){
        console.log("ERROR",err);
        return res.redirect('back');

    }
      
}