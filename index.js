
const express=require('express');
const cookieParser = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app=express();
app.use(express.static('./assets'));
const port=8000;
app.use(expressEjsLayouts);
// inorder to be able to use the css of the individual pages
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true,
   outputStyle:'extended',
   prefix:'/css'
}));
app.use(express.urlencoded());
//set up the cookie parser
app.use(cookieParser());
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
   name:'codeial',
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie:{
      maxAge:(1000*60*100)
   },
   store:new MongoStore(
      {
         mongooseConnection:db,
         autoRemove:'disabled'
      },
      function(err){
         console.log(err||'connect-mongodb setup ok');
      }
   )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//should be put after this because passport ke baad routes chalne chahiye !
app.use('/',require('./routes'));
app.listen(port,function(err){
   if(err){
    console.log(`error in running the server on port:${port}`);
   }
   console.log(`My server seems to run on port:${port}`);
});