var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/',function(req, res, next) {
	if(req.session.user){
		res.render('termsandconditionsLogged');
	}else{
		res.render('termsandconditions');
	}
		
});
module.exports = router;