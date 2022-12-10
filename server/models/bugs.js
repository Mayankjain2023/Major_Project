var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var now=new Date();
var bugSchema=new Schema({
    orgname:String,
    projectName:String,
    title:String,
    status:String,
    priority:String,
    listPosition:Number,
    description:String,
    estimate:Number,
    timeSpent:Number,
    timeRemainingl:Number,
    createdAt:{
      type:String,
      default:now.toISOString()
    },
    updateAt:{
      type:String,
      default:now.toISOString()
    },

    reporterId:{
            username:String,
            email:String,
            type:mongoose.Schema.Types.ObjectId
    },

    users:[{

        username: {
            type: String,required: true
          },
          email: {
            type: String,required: false
          }

        //all users assigned to that issue
    }],
    comments:[{
        //comments on that issue
        body:String,
        createdAt:{
          type:String,
          default:now.toISOString()
        },
        updatedAt:{
          type:String,
          default:now.toISOString()
        },
    }],
});

var bugs=mongoose.model('bugs',bugSchema);    

module.exports=bugs;