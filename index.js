var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
app.listen(8000);
app.set('view engine','ejs');
require('dotenv').config();
app.use(cookieParser("mySecret"));
app.use(session({
    secret: "mySecret",
    saveUninitialized: false,
    resave : false,
    cookie: { maxAge: 90000}
}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "websterdb"
});
// Session - server, data remove browser close
// Cookies - browser, 
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request,response){
    response.send("Hello World 21!");
});
var middleware = function(req,res,next){
    console.log(req.url);
    let value = 231;
    req.local = value
    next(); // Never send any data inside this
}
app.get('/home',function(req,res){
    res.cookie('myCookie','myName',{maxAge:6000000});
    let query = "SELECT * FROM temp";
    conn.query(query,function(err,result){
        if(err) throw err;
        res.render('home.ejs', { result : result , value : { key: "value"}, arr: "String"} );
    });
});

app.get('/cookies',function(req,res){

    res.send(req.cookies['myCookie'])
})

app.get('/about/:userName/:password',function(req,res){
    let username = req.params.userName;
    let lastName = req.params.password;
    res.send("About page for "+username+":"+lastName);
});

app.get('/contact',function(req,res){
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count = 1;
    }
    res.send("session Value"+req.session.count);
});

app.post('/addFeedback',function(req,res){
    let name = req.body.name;
    let feedback = req.body.feedback;
    let query = "INSERT INTO temp(name,feedback) VALUES (?,?)";
    conn.query(query,[name,feedback],function(err,result){
        if(err) throw err;
        res.send("OK Inserted");
    });
});
