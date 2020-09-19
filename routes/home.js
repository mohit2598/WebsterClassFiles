var app = require('express')();
app.get('/',(req,res)=>{
    res.send('okk working');
});

module.exports = app;