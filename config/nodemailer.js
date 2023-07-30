const nodemailer=require("nodemailer");
const ejs=require('ejs');
const path=require('path');


// created transporter here and render template !!
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'pkalra794',
        pass:'12345'
    }
});
  // using arrow function
let renderTemplate=(data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering the template',err);
                return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}