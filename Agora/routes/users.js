var express = require('express');
var router = express.Router();
var sqlite = require("sqlite");
var db;
var session = require('express-session');

var users;
const bcrypt = require('bcrypt');
const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());
router.get('/', async function(req, res, next) {
	
	if(req.session.user){
		db = await sqlite.open("./db.sqlite");
    	users =await db.get("select username,email from profile where username='"+req.session.user+"'");
    	res.render('userprofile', {title : 'User Profile' , username: users['username'],email: users['email']});
  }else{
    res.redirect('/');
  }
});
router.post('/password',async function(req, res) {
  let user_name= req.session.user;
  let password1=req.sanitize(req.body.password);
  let password2=req.sanitize(req.body.confirm_password);
  await updatePass(user_name,password1);
  res.render('succesful',{h1:'Password successfully updated'});
});
router.post('/email',async function(req, res) {
  let user_name= req.session.user;
  let email=req.sanitize(req.body.email);
  await updateEmail(email,user_name);

  res.render('succesful',{h1:'Email successfully updated'});
});
async function updatePass(username,password1) {
    try {
        db = await sqlite.open("./db.sqlite");
          await bcrypt.hash(password1, 10, function(err, hash) {db.run("update profile set password= '"+hash+"' where username= '"+username+"'");});

        
        
    } catch (e) { console.log(e); }
    
    return false;
}
async function updateEmail(email,username) {
    try {
        db = await sqlite.open("./db.sqlite");
          await db.run("update profile set email= '"+email+"' where username= '"+username+"'");        
    } catch (e) { console.log(e); }
    
    return false;
}




module.exports = router;