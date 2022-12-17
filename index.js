const express=require('express');
const app=express();
const port=8000;






app.listen(port,function(err){
   if(err){
    console.log(`error in running the server on port:${port}`);
   }
   console.log(`My server seems to run on port:${port}`);
});