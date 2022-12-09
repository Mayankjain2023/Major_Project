var User = require("../models/UserModel");
var Org=require("../models/OrgModel");
var comments=require("../models/comments");
var projects=require("../models/projects");
var bugs=require("../models/bugs");
var projectManagers=require('../models/projectManager');
var bcrypt=require("bcryptjs");
var jwt=require('jsonwebtoken');

var project={

    //create project manager

    createProjectManager:function(req,res){
        console.log(req.body);

        var projectManager=new projectManagers();
        projectManager.name=req.body.pmName;
        projectManager.email=req.body.pmEmail;
        projectManager.orgname=req.body.orgname;
        projectManager.userId=req.body.userId;
        console.log(projectManager);
        // project.orgname=req.body.orgname;

        projectManager.save(function(err){
            if(err){
                return res.status(401).json({status:'error',message:'failed to create projectManager'});
            }
            else{
                return res.status(200).json({status:'success',message:'Project Manager created successfully'});
            }
        })
    },




    //to post a comment
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

    //create a new Bug
    createBug:function(req,res){
        var newBug=new bugs(req.body);

        newBug.save(function(err,result){
            if(err){
                console.log("error occured in the bug created");
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

                    res.status(200).json({"message":"New Bug created successfully"});
            }
        });
    },

    //update a particular bug
    updateBug:function(req,res){
        console.log(req.params.id);
        var newUpdateDoc=JSON.parse(JSON.stringify(req.body));


        issues.findByIdAndUpdate({"_id":req.params.id.toString()},newUpdateDoc,{new:true},

        function(err,result){
            if(err){
                console.log("error occured in the issue");
                res.send("error occured while updating issue");
            }
            else if(!result){
                res.send("No such bug found");
            }
            else{
                console.log('result');
                res.json(result);
            }

        });
    },

    //to delete the bug
    deleteBug:function(req,res){
        
                issues.findByIdAndRemove({
                    "_id":req.params.iid //issue id =iid
                },
                function(err,result){
                    if(err){
                        res.status(400);
                        res.send('Unable to find the bug')
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


    //to get a particular project
    getProject:function(req,res){

        console.log(req.params.id);
        projects.findById(req.params.id) 
        ///complete later

    },

    //to update a particular Project
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

module.exports=project;