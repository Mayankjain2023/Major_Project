var User = require("../models/UserModel");
var Org=require("../models/OrgModel");
var comments=require("../models/comments");
var projects=require("../models/projects");
var issues=require("../models/issues");
var projectManager=require('../models/projectManager');
var bcrypt=require("bcryptjs");
var jwt=require('jsonwebtoken');

var admin={
    postComment:function(req,res){
        var newComment=new comments(req.body);

        newComment.save(function(err,result){

            if(err){
                console.log("error occured in the project");
                res.send('error occured');
                res.status(200);
            }
            else{
                console.log(result);
                    //async await
                    //check for promise
                issues.findByIdAndUpdate(req.params.id,{
                    $push:{
                        "comments":newcomment._id
                    }
                });

                res.status(200).json({"message":"New comment has been created succesfully"});
            }
        })
    },


    createIssue:function(req,res){
        var newIssue=new issues(req.body);

        newIssue.save(function(err,result){
            if(err){
                console.log("error occured in the issue created");
                res.status(400);
                res.send("error occured");
            }else{
                console.log(result);
                res.status(200);

                    projects.findByIdAndUpdate(req.params.id,{
                        $push:{
                            "issues":newIssue._id
                        }
                    });

                    res.status(200).json({"message":"New issue created successfully"});
            }
        });
    },


    updateIssue:function(req,res){
        console.log(req.params.id);
        var newUpdateDoc=JSON.parse(JSON.stringify(req.body));


        issues.findByIdAndUpdate({"_id":req.params.id.toString()},newUpdateDoc,{new:true},

        function(err,result){
            if(err){
                console.log("error occured in the issue");
                res.send("error occured while updating issue");
            }
            else if(!result){
                res.send("No issue found");
            }
            else{
                console.log('result');
                res.json(result);
            }

        });
    }
    ,

    deleteIssue:function(req,res){
        
        issues.findByIdAndRemove({
            "_id":req.params.iid //issue id =iid
        },
        function(err,result){
            if(err){
                res.status(400);
                res.send('Unable to find the issue')
            }
            console.log(result)
            res.status(200);

        }.then(function(response){
                projects.findByIdAndUpdate(req.params.pid),  //project id :pid
                {
                    $pull:{
                        "issues":result._id
                    }
                }

            }.then(function(response){
                comments.remove({
                    "issueId":req.params.pid //project id
                });

                res.json({"message":"new issue removed succesfully"});
            })

            )
        )
    },

    getProject:function(req,res){

        console.log(req.params.id);
        projects.findById(req.params.id) 
        ///complete later

    },

    updateProject:function(req,res){

        console.log(req.params.id);
        var newUpdateDoc=JSON.parse(JSON.stringify(req.body));

        projects.findByIdAndUpdate({
            "_id":req.params.id.toString()
        },newUpdateDoc,{
            new:true
        },
        function(err,result){
            if(err){
                console.log("error has occured in project");
                res.send("error occured while updating project");
            }
            else if(!result){
                res.send("No such project found");

            }else{
                console.log(result);
                res.json(result);
            }
        });
    }
}
