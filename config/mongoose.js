const mongoose=require('mongoose');
//connect it to our database !
mongoose.connect('mongodb://localhost/codeial_development');
const db=mongoose.connection;
//if our mongoose is connected to our databse or not
db.on('error',console.error.bind(console,"error in connecting to MongoDB"));
db.once('open',function(){
console.log("connected to MongodB successfully");
});
module.exports=db;
