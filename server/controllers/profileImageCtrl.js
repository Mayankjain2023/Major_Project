var AWS = require("aws-sdk");
var uuid = require('uuid');
var multer=require('multer');
// var upload=require({dest:'uploads/'});


AWS.config.update({region: 'ap-south-1'});
AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
 
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
  });




var profile={

    uploadImage:function(req,res,next){
        console.log(req.file);
        // var file=req.file;
        // if(!file){
        //     var err=new Error("Please upload a file");
        //     err.httpStatusCode=400;
        //     return next(err);
        // }
        
    //    res.file();

    }
}

module.exports=profile;