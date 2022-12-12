var User = require("../models/UserModel");
var Org=require("../models/OrgModel");
var async=require("async");

var bcrypt=require("bcryptjs");
var jwt=require('jsonwebtoken');

var authenticate={

    //get all members in the org

    getAllMembers:function(req,res){

        User.find(function(err,docs){
            if(err){
                return res.status(500).json({status:"error",message:"Database Error"+err,docs:""});
            }
            else{
                res.status(200).json({status:'success',message:"success",docs:docs});
            }
        });

    },

    createOrg:function(req,res){
        console.log(req.body);
        var org=new Org();
        org.orgname=req.body.orgname;

        var user={
            username:req.body.username,
            email:req.body.email,
            role:"Admin"
        };

        org.users.push(user);
        console.log(org);



        var userAdmin=new User();
        userAdmin.username=req.body.username;
        userAdmin.email=req.body.email;
        userAdmin.password="Admin@123";
        userAdmin.orgname=req.body.orgname;
      

        userAdmin.roles.role="ADMIN";
        userAdmin.roles.order=2;
        userAdmin.roles.permissions=["create","write","read","delete"];


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
        
    },

    createUser:function(req,res){
        var user={
            username:req.body.username,
            email:req.body.email,
            role:"Member"
        }
        Org.updateOne(
            {
                orgname:req.body.orgname
             
            },{
                $push:{users: user}
            }
        ).then(function(sucess){
            if(!sucess)
                res.status(200).json({status:"success",message:"Cannot organization added"});

            var user=new User();
                user.username=req.body.username;
                user.email=req.body.email;
                user.orgname=req.body.orgname;
                user.password=req.body.password;
                // user.team=req.body.teamname;
               
                user.roles.role="MEMBER";
                user.roles.order=4;
                user.roles.permissions=["read"];

  
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
              if (err) 
              {
                res.status(500).json({status:'error',message:'Bcrypt Error:'+err,token:''});
                return;
              }

              user.password = hash;

              user.save(function(err){
                if(err){
                    res.status(500).json({status:'error',message:'Database Error:'+err,token:''});
                }else{
                    var payload={email:user.email,id:user.id};
                    var secret="SECRET";
                    var token=jwt.sign(payload,secret,{expiresIn:'1d'});
                    res.status(200).json({status:'success',message:'User added successfully',token:"Bearer "+token});
                }
                });
            });
        });
            
    });

},

    login: function(req,res){

        User.findOne({email:req.body.email}).then(function(user){
            if(!user)
            {
                return res.status(401).json({status:'error',message:'User not found',token:''});
            }
            bcrypt.compare(req.body.password,user.password)
            .then(function(same){
                    if(!same)
                    {
                        return res.status(401).json({status:'error',message:'Incorrect password',token:''});
                    }

                var payload={email:user.email,id:user.id};
                var secret="SECRET";
                var token=jwt.sign(payload,secret,{expiresIn:'1d'});
                return res.status(200).json({status:'success',message:'SignIn successful',token:"Bearer "+token});
            });
        })
    },

    updatepwd:function(req,res){

        User.findOne({email:req.body.email}).then(function (user){
            if(!user)
            {
                return res.status(401).json({status:'error',message:'User not found',token:''});
            }
            var newPassword=req.body.newpwd;
            
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newPassword, salt, function(err, hash){
                  if (err) 
                  {
                    res.status(500).json({status:'error',message:'Bcrypt Error:'+err});
                    return;
                  }
                user.password = hash;
                User.updateOne({
                      $set:{password:user.password}
                    }).then(function (success){
                        return res.status(200).json({status:"success",message:"Password Updated"});
                    });
                  
                });
            });


           

        })
    },

    create:function(req,res){
        User.findOne({email:"superadmin@gmail.com"})
        .then(function(user){
            if(!user){
                
                var admin=new User();
                admin.username="SuperAdmin";
                admin.email="superadmin@gmail.com";
                admin.password="Superadmin@1234";

                admin.isSuperAdmin=true;
                admin.isMember=false;
                admin.isAdmin=false;
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(admin.password, salt, function(err, hash){
                      if (err) 
                      {
                        res.status(500).json({status:'error',message:'Bcrypt Error:'+err});
                        return;
                      }
                      admin.password = hash;
                      admin.save(function(err){
                        if(err){
                            res.status(500).json({status:'error',message:'Database Error:'+err});
                        }else{
                            res.status(200).json({status:'success',message:'Super admin created'});
                        }
                        });
                    });
                });
            }
            else{
                res.status(200).json({status:"success",message:"Super Admin already existed"});
            }
        })
    }
}
module.exports=authenticate;