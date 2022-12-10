var Org=require("../models/OrgModel");
var User=require("../models/UserModel");
var bcrypt=require("bcryptjs");
var async=require("async");


var superAdmin={

    dashboard:
    function(req,res){
        res.status(200).send({msg:"done",user:req.user});
    },



    getAllOrg:function(req,res){

        Org.find(function(err,docs){
            if(err){
                return res.status(500).json({status:"error",message:"Database Error"+err,docs:""});
            }
            else{
                res.status(200).json({status:'success',message:"success",docs:docs});
            }
        });

    }

}
module.exports=superAdmin;