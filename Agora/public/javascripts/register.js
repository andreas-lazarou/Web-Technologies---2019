var sqlite = require("sqlite");
var db;
async function register(email,password) {
    try {
        db = await sqlite.open("./db.sqlite");
        var blue =await db.get("select count(email) from users where email='"+email+"'");
        blue=blue["count(email)"];
        if(blue>0){
        	console.log("input exists");
        }else{
        	await db.run("insert into users values ('"+email+"', '"+password+"')");
        	console.log("inputted");
        }
        
    } catch (e) { console.log(e); }
    return false;
}
//register();