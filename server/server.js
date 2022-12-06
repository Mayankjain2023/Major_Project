var express=require("express");
var mongoose = require("mongoose");
var bodyparser=require('body-parser');
var mongoURI=require("./config/database").mongo.url;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


var app=express();
require('./config/passport');
app.use(bodyparser.json());
// app.get("*",function(req,res){
//     res.sendFile(__dirname+'../client/index.html');
// })
app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-type,Accept,X-Access-Token,X-key,Authorization');
    if(req.method=='OPTIONS'){
        res.status(200).end();
    }else{
        next();
    }
});
app.use('/user/',require('./routes/authRoutes.js'));
app.use('/',require('./routes/protectedRoutes.js'));


app.listen(5500,function(){
    console.log("Server is running on port 5500");
});