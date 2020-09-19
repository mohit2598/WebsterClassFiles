var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express(); 
//Comment
app.listen(8000);
app.set('view engine','ejs');
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
    console.log(req.local);
    res.render('home.ejs', { name : "<b>Mohit</b>" , value : { key: "value"}, arr: "String"} );
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
