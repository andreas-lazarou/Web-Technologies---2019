var sqlite = require("sqlite");
var db;

//drop();
//create();
select();
// insert();
// display();
// updateTheVoid();
var title= "Call of the Wild & White Fang";
var author= "Jack London";
var year = 1992;
var category = "Adventure";
var price= 10;
var image = "/images/18.jpg";
var description= "Set in Alaska during the Klondike Gold Rush of the late 1890s, The Call of the Wild is about Buck, the magnificent cross-bred offspring of a St Bernard and a Scottish Collie. Stolen from his pampered life on a Californian estate and shipped to the Klondike to work as a sledge dog, he triumphs over his circumstances and becomes the leader of a wolf pack. The story records the ''decivilisation'' of Buck as he answers ''the call of the wild'', an inherent memory of primeval origins to which he instinctively responds. In contrast, White Fang relates the tale of a wolf born and bred in the wild which is civilised by the master he comes to trust and love. The brutal world of the Klondike miners and their dogs is brilliantly evoked and Jack London''s rendering of the sentient life of Buck and White Fang as they confront their destiny is enthralling and convincing. The deeper resonance of these stories derives from the author''s use of the myth of the hero who survives by strength and courage, a powerful myth that still appeals to our collective unconscious.";

async function create() {
    try {
        db = await sqlite.open("./db.sqlite");
        await db.run("create table if not exists books (BookID integer primary key autoincrement, title text, author text,year int,category text,description text,price int,image text)");
        
    } catch (e) { console.log(e); }
}
async function drop() {
    try {
        db = await sqlite.open("./db.sqlite");
        await db.run("DROP TABLE books");
    } catch (e) { console.log(e); }
}
async function insert() {
    try {
        db = await sqlite.open("./db.sqlite");
        await db.run("insert into books (title,author,year,category,description,price,image) values ('"+title+"','"+author+"', '"+year+"', '"+category+"','"+description+"', '"+price+"','"+image+"')");
    } catch (e) { console.log(e); }
}
async function select() {
    try {
        db = await sqlite.open("./db.sqlite");
        var as = await db.all("select * from books");
        console.log(as);
    } catch (e) { console.log(e); }
}

async function updateTheVoid(){
    try {
        db = await sqlite.open("./db.sqlite");
        var as = await db.all("update books set title ='Touching the Void' where BookID=16");
        console.log(as);
    } catch (e) { console.log(e); }
}