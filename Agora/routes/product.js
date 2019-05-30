var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser= require("body-parser");
var session = require('express-session');
var sqlite = require("sqlite");
var book_id=1;
router.get('/',async function(req,res,next){
	if(req.session.user){
		db = await sqlite.open("./db.sqlite");
   		book =await db.all("select * from books where BookID='"+book_id+"'");
 		res.render('product', {title : book['title']  , books: book});

	}
	else{
		res.redirect('/');
	}
	
});
router.post('/', async function(req, res) {
	book_id=req.body.BookID;
	if(req.session.user){
		db = await sqlite.open("./db.sqlite");
   		book =await db.all("select * from books where BookID='"+book_id+"'");
 		res.render('product', {title : book['title']  , books: book});

	}
	else{
		res.redirect('/');
	}
});
router.post('/addToBasket', async function(req, res) {
	if(req.session.user){	
		var cart = await add(req.body.BookID,req.session.cart,req.body.quantity);
		req.session.cart=cart;
		console.log(req.session.cart);

		res.render('succesful',{h1:'The product has been added to your cart'});
	}
	
	else{
		res.redirect('/');
	}
	
});

module.exports = router;
function add(id,cart,quant){
	var exists=false;
	for(var key in cart){
		 if(id === cart[key].key){
		 	cart[key].value+=Number(quant);
		 	exists=true;
		 }
	}
		if(!exists){
	    	cart.push({
		  	key : id,
		   	value :Number(quant)
		});

		}
	return cart;
}


