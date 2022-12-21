const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
        // password need not be unique say many people keep it as 1234
     },
     name:{
        type:String,
        required:true
     }
},{
    timestamps:true
});
const User=mongoose.model('User',userSchema);
module.exports=User;