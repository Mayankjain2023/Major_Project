var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var bugSchema=new Schema({

    title:String,
    status:String,
    priority:String,
    listPosition:Number,
    description:String,
    estimate:Number,
    timeSpent:Number,
    timeRemainingl:Number,
    createdAt:String,
    updateAt:String,

    reporterId:{
            //user who is reporting the issue
            
    },

    userIds:[{

        username: {
            type: String,required: true
          },
          email: {
            type: String,required: false
          },
          teamname:{
            type:String,required:false
          }

        //all users assigned to that issue
    }],
    comments:[{
        //comments on that issue
        body:String,
        createdAt:String,
        updatedAt:String,
    }],
},
    {
        collection:"bugs"
    });

module.exports=mongoose.model('bugs',issueSchema);    