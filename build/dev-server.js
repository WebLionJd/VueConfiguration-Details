var express = require('express');
var app = express();

app.get('/',function(req,res){
    console.log(req,res)
    res.send('开始')
})
app.listen(3200,function(){
    console.log('listen At')
})
