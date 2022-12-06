var Org=require("../models/OrgModel");
var User=require("../models/UserModel");
var bcrypt=require("bcryptjs");
var async=require("async");


var superAdmin={

    dashboard:
    function(req,res){
        res.status(200).send({msg:"done",user:req.user});
    },
    createOrg:
    function(req,res){
        var org=new Org();

        org.orgname=req.body.username;

        var user={
            username:"Admin",
            email:req.body.email,
            role:"Admin"
        };

        org.users.push(user);

        var userAdmin=new User();
        userAdmin.username="Admin";
        userAdmin.email=req.body.email;
        userAdmin.password="Admin@123";
        userAdmin.org=req.body.name;

        async.waterfall([function(callback){
            org.save(function(err){
                if(err){
                    callback(err,null);
                }else{
                    callback(null,"done");
                }
                })
        },function(arg1,callback){
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(userAdmin.password, salt, function(err, hash){
                  if (err) 
                  {
                    callback(err,null);
                  }
                  else
                    callback(null,hash);
                });
            });
        },function(hash,callback){
            userAdmin.password=hash;
            userAdmin.save(function(err){
                if(err){
                    callback(err,null);
                }else{
                    callback(null,"Organisation added successfully");
                }
                });
        }],function(err,result){
            if(err){
                res.status(500).json({status:'error',message:'Cannot create organization. Error is '+err});
            }else{
                res.status(200).json({status:'success',message:result});
            }
        })
        
    }
}
module.exports=superAdmin;