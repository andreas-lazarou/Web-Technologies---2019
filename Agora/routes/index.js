var express = require('express');
var router = express.Router();
var sqlite = require("sqlite");
var db;
var session = require('express-session');
var bodyParser= require("body-parser");
var results_crime=[];
var results_adventure=[];
var results_romance=[];
const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());

router.get('/', async function(req, res, next) {
	if(req.session.user){
		await select(); 

		res.render('index2', {title : 'Agora', results_romance: results_romance , results_crime: results_crime , results_adventure: results_adventure});
	}
	else{
		res.render('index', { title: 'Agora' ,user : "You are not logged in!"});
	}
});
module.exports = router;
async function select() {
    try {
        db = await sqlite.open("./db.sqlite");
        results_crime = await db.all("select BookID,image from books where category= 'Crime'");
        results_adventure = await db.all("select BookID,image from books where category= 'Adventure'");
        results_romance = await db.all("select BookID,image from books where category= 'Romance'");
    } catch (e) { console.log(e); }
}
