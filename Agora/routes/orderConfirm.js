var express = require('express');
var router = express.Router();
var sqlite = require("sqlite");
var db;
var session = require('express-session');
var bodyParser= require("body-parser");
var results;
var cart=[];
var total=0;
var total_quant=0;
const expressSanitizer = require('express-sanitizer');
router.use(expressSanitizer());
router.post('/', async function(req, res, next) {
		let username= req.sanitize(req.session.user);
		let address= req.sanitize(req.body.address);
		let city= req.sanitize(req.body.city);
		let postcode= req.sanitize(req.body.postcode);
		list= await displayCart(req.session.cart);


		req.session.cart=[];
    	res.render('order', {title : 'Order', results: list, total_price: total, total_quantity: total_quant, username:username,address:address,city:city,postcode:postcode});
  
});


module.exports = router;
async function displayCart(cart){
	var list=[];
	total=0;
	total_quant=0;
	for(var key in cart){
		try {
    		db = await sqlite.open("./db.sqlite");
    		results = await db.get("select BookID,title,price from books where BookID= '"+cart[key].key+"'");
    		results["Qty"]=cart[key].value;
    		total+=cart[key].value*results["price"];
    		total_quant+=cart[key].value;
    		list.push(results);
    		} catch (e) { console.log(e); }
		}
	return list;			
}


