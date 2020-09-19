const connection = require('../configuration/db');

var router = require('express').Router();
var dbCon = require('../configuration/db');

router.post('/add',function(req,res){
    let query = "INSERT INTO todos(task,timeToComplete) VALUES (?,?)";
    console.log(req.body);
    dbCon.query(query,[req.body.todo,req.body.time],function(err,result){
        if(err) throw err;
        res.redirect('/home')
    });
});

router.get('/view',function(req,res){
    
});
module.exports = router;