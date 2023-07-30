
{
   let createPost=function(){
    let newPostForm=$('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostForm.serialize(),
            success:function(data){
                let newPost=newPostDom(data.data.post);
                console.log(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
              //change added
                new PostComments(data.data.post._id);
                // new ToggleLike($('.toggle-like-button',newPost));
                new Noty({
                    theme:'relax',
                    text:"Post published!",
                    type:'success',
                    layout:'topRight',
                    timeout:1500
                }).show();

            },error:function(error){
                console.log(error.responseText);
            }
        });
    });
   }
   let newPostDom=function(post){
    return $(`<li id="post-${post._id}">
    <p>
       
        ${post.content}
        <br>
        <small>
            <a href="/posts/destroy/${post._id}" class="delete-post-button">X</a>
           ${post.user.name}
        </small>
       <br>
     
        </p>
        <div class="post-comments">
         
        
               <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
              <input type="text" name="content" placeholder="Type Here To add Comment">
              <input type="hidden" name="post" value="${post._id}">
              <input type="submit" value="Add comment">
               </form>
          
            <div class="post-comments-list">
    
                <ul id="post-comments-${post._id}">
                </ul>
            </div>
        </div>
        </li>`)
   }
   //another func to delete in DOM !
   let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                console.log(data);
                $(`#post-${data.data.post_id}`).remove();
            },error:function(error){
                console.log(error.responseText);
            }
        });
    });
   }
   //added
   let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
    let self = $(this);
    let deleteButton = $(' .delete-post-button', self);
    deletePost(deleteButton);
    
    let postId = self.prop('id').split("-")[1]
    new PostComments(postId);
    });
    }
    
    
    
    createPost();
    convertPostsToAjax();
}