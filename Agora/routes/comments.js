var express = require('express');
var router = express.Router();
var sqlite = require("sqlite");
var db;
var session = require('express-session');
var bodyParser= require("body-parser");
var results=[];
const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());
var howMany=0;
var limit=5;
var display=[];

router.get('/', async function(req, res, next) {
	
	if(req.session.user){
      await select();
    	res.render('comments', {title : 'Comments', results: display});
  }else{
    res.redirect('/');
  }
});
router.post('/', async function(req, res) {
    var howMany=0;
    var limit=0;
  

    var comment=req.sanitize(req.body.comment);
    await Comment(comment,req.session.user);
    res.redirect(req.get('referer')); 

  
});
router.post('/show5more', async function(req, res) {
  if(limit==0){
    limit=5;
    howMany=0;
  }else{
    howMany+=5;
  }
  
  res.redirect('/comments');
  
});
router.post('/show5less', async function(req, res) {
  howMany-=5;
  limit=5;
  if(howMany<0){
    howMany=0;
  }
  res.redirect('/comments');
  
});
router.post('/hide', async function(req, res) {
  limit=0;
  howMany=0;
  res.redirect('/comments');
  
});




module.exports = router;

async function select() {
    try {
        display=[];
        db = await sqlite.open("./db.sqlite");
        results = await db.all("select * from comments order by date desc");
        if(howMany+limit!=0){
          if(results.length>5){
            if(results.length<howMany+limit){
              howMany=results.length-5;
              let x=0;
              for(let i=results.length;i>results.length-limit;i--){
                display.push(results[results.length-limit+x]);
                x++;
              } 
          }else{
              for(let i=howMany;i<howMany+limit;i++){
                display.push(results[i]);
              } 
          }

          }
          else{
            display=results;
          }
        }
        
        
    } catch (e) { console.log(e); }
}
async function Comment(comment,username) {
    try {
        db = await sqlite.open("./db.sqlite");
        await db.run("create table if not exists comments (comment text, username text, date datetime default(current_timestamp))");
        await db.run("insert into comments(comment,username) values ('"+comment+"','"+username+"')");
    } catch (e) { console.log(e); }
    
    return false;
}
