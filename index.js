var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var dbCon = require('./configuration/db');
var app = express(); 
//Comment
app.listen(8000);
app.set('view engine','ejs');
app.use(session({secret: "mysecret",resave:false, saveUninitialized:false, cookie: { maxAge:90000}}));
//Middleware
//app.use('/myStaticFiles',express.static('static'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'static')));
// req -- middleware -- res
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
    //res.render('home.ejs',{view: null});
    let query = "SELECT * FROM todos ORDER BY id DESC";
    dbCon.query(query,function(err,result){
        if(err) throw err;
        res.render('home.ejs', { view: true, todo : result } );
    });
});

app.get('/about/:userName/:password',function(req,res){
    let username = req.params.userName;
    let lastName = req.params.password;
    res.send("About page for "+username+":"+lastName);
});

app.get('/contact',function(req,res){
    console.log(req.query)
    res.send("Contact page")
});
app.post('/contact',function(req,res){
    console.log(req.body);
});

let todo = require('./routes/todo');
app.use('/todo',todo);