const Post=require('../../../models/post');
const Comment=require('../../../models/comment');
module.exports.index=async function(req,res){
    let posts=await Post.find({})
    .sort('_createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });
    return res.json(200,{
        message:"List Of Posts",
        posts:posts
    });
}
module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        // if the same user who created it ,if he is trying to delete it 
           if(post.user==req.user.id){
            post.remove();
            //corresponding comments are deleted if post with {} particular id is found !
            //else we are handling the error !
            await Comment.deleteMany({post:req.params.id});
           
                return res.json(200,{
                    message:"Post and associated comments deleted successfully !"
                });
            
            }else{
                 return res.json(401,{
                    message:"You cannot delete this POST !"
                 });
            }
        }
     catch(err){
        console.log("ERROR",err);
        return;
    }
      
}