var User = require("../models/UserModel");
var Org=require("../models/OrgModel");
var async=require("async");
var bcrypt=require("bcryptjs");
var jwt=require('jsonwebtoken');
require("dotenv").config();
var sgMail= require("@sendgrid/mail");
var AWS = require("aws-sdk");
var uuid = require('uuid');
AWS.config.update({region: 'ap-south-1'});
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// console.log(process.env.SENDGRID_API_KEY);

AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
  });

// const msg = {
//     to: 'mayank1903jain@gmail.com', // Change to your recipient
//     from: 'bugtrackerrr@gmail.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent')
//     })
//     .catch((error) => {
//       console.error(error)
//     })

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
        var orgID=req.body.orgID;
        console.log(orgID);

        var org=new Org();
        org.orgname=req.body.orgname;

        var user={
            username:req.body.username,
            email:req.body.email,
            orgID:orgID,
            role:"Admin"
        };

        org.users.push(user);
        console.log(org);

        var userAdmin=new User();
        userAdmin.username=req.body.username;
        userAdmin.email=req.body.email;
        userAdmin.password="Admin@123";
        userAdmin.orgname=req.body.orgname;
        userAdmin.orgID=orgID;
        userAdmin.role="Admin";
        userAdmin.permissions=["createUser","createProjectManager","updateUser","viewUser","viewProjects","deleteUser"];


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
            role:"Member",
            orgID:req.body.orgID
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
                user.orgID=req.body.orgID;
                // user.team=req.body.teamname;
               
                user.role="Member";
                user.permissions=["viewProject","reportBug","viewBug","updateBug"];

  
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

                    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

                          var params = {
    
                            DelaySeconds: 10,
                            MessageAttributes: {
                              "Subject": {
                                DataType: "String",
                                StringValue: "Welcome to Bugtracker"
                              },
                              "Username": {
                                DataType: "String",
                                StringValue: req.body.username
                              },
                              "Usermail": {
                                DataType: "String",
                                StringValue: req.body.email
                              }
                            },
                            MessageBody: req.body.email,
                          
                            QueueUrl: "https://sqs.ap-south-1.amazonaws.com/233050499454/bug_tracker_mails_record"
                          };
                          sqs.sendMessage(params, function(err, data) {
                            if (err) {
                              console.log("Error", err);
                            } else {
                              console.log("Successfully delivered msg to queue", data.MessageId);
                            }
                          });

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

                admin.role="SuperAdmin";
                admin.permissions=["viewOrg","banOrg","deleteOrg"];
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