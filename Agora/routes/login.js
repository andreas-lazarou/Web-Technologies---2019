var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser= require("body-parser");
var sqlite = require("sqlite");
var errors=[];
var db;
var session = require('express-session');
var sess;
var h3z="";
const bcrypt = require('bcrypt');
const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());
router.get('/',function(req,res,next){
  if(!req.session.user){
    res.render('login', {title : 'Login' , h3: h3z });
    h3z="";
    errors.length=0;
  }else{
    res.redirect('/');
  }
  
});
router.post('/', async function(req, res) {
	var user_name= req.sanitize(req.body.username);
  var password=req.sanitize(req.body.password);
	await login(user_name,password);

	if(errors.length>0){
    h3z= errors[0]; 
      
    res.redirect(req.get('referer'));
  }else{
  	req.session.user= user_name;
    req.session.cart=[];
    res.redirect('/welcome');
  }
});



async function login(username,password) {
    try {

        db = await sqlite.open("./db.sqlite");
        await db.run("create table if not exists profile (username text unique, email text, password text)");
        var blue =await db.get("select count(username) from profile where username='"+username+"'");
        blue=blue["count(username)"];
        if(blue<1){
          errors.push("Login credentials invalid!");
        }else{
          var hash =await db.get("select password from profile where username='"+username+"'");
          hash= hash['password'];
              if(bcrypt.compareSync(password, hash)) {
                errors.length=0;
               // Passwords match
              } else {
                errors.push("Login credentials invalid!");
               // Passwords don't match
              } 
        }    
    } catch (e) { console.log(e); }
    
    return false;
}


module.exports = router;
