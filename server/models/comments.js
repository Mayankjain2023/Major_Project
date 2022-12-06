var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var commentSchema= new Schema({

    body:String,
    createdAt:String,
    updatedAt:String,

    issueId:{
        //issue on which the comment has been made
        title:String
    },
    userId:{
        //user who comments
        username: {
            type: String,required: true
          },
          email: {
            type: String,required: false
          },
          teamname:{
            type:String,required:false
          }

    },
    user:{
        username: {
            type: String,required: true
          } 
    }
},
{
    collection:"comments"
});

module.exports=mongoose.model('comments',commentSchema);
