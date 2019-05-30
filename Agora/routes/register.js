var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser= require("body-parser");
var sqlite = require("sqlite");
var db;
var errors=[];
var h3z="";
const bcrypt = require('bcrypt');
const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());

router.get('/',function(req,res,next){

  if(!req.session.user){
    res.render('register', {title : 'Register' , h3:h3z, error1: errors[0], error2: errors[1], error3: errors[2]});
    h3z="";
    errors.length=0;
  }else{
    res.redirect('/');
  }
  
});
router.post('/',async function(req, res) {
  var user_name=req.sanitize(req.body.username);
  var password1=req.sanitize(req.body.password);
  var password2=req.sanitize(req.body.confirm_password);
  var email = req.sanitize(req.body.email);
  await register(user_name,password1,password2,email);
  if(errors.length>0){
    h3z= "Your previous submission was not accepted because:";  
    res.redirect(req.get('referer'));
  }else{
    res.redirect('/login');
  }

  
  
});



async function register(username,password1,password2,email) {
    try {
        db = await sqlite.open("./db.sqlite");
        await db.run("create table if not exists profile (username text unique, email text, password text)");
        var blue =await db.get("select count(username) from profile where username='"+username+"'");
        blue=blue["count(username)"];

        if(email.length<1){
          errors.push("Email field must be filled!");
        }
        if(username.length<1){
          errors.push("Username field must be filled!");
        }


        if(blue>0){
        	console.log("input exists");
          errors.push("Username already registered!");
        }
         else if(email.length<1){

         }
          else{
          await bcrypt.hash(password1, 10, function(err, hash) {db.run("insert into profile values ('"+username+"','"+email+"', '"+hash+"')");});
          errors.length=0;

        }
        
    } catch (e) { console.log(e); }
    
    return false;
}

module.exports = router;
