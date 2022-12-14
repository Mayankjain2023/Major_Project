var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var now=new Date();
var projectSchema=new Schema({

    name:String,
    description:String,
    category:String,
    orgname:String,
    startDate:{
      type:String
    },
    createAt:{
      type:String,
      default:now.toISOString()
    },
    deadline:{
      type:String
    },
    updateAt:{
      type:String,
      default:now.toISOString()
    },

    projectManager:{

        username: {
            type: String,required: false
          },
          email: {
            type: String,required: false
          },
          userId:{
            type: mongoose.Schema.Types.ObjectId
          }

        //pm of that project
    },
    bugs:[{
            
            title:String,
            category:String,
            status:String,
            priority:String,
            listPosition:Number,
            description:String,
            estimate:Number,
            timeSpent:Number,
            timeRemaining:Number,
            reporterId:{
              username:String,
              email:String,
              type:mongoose.Schema.Types.ObjectId
            },
            createdAt:{
              type:String,
              default:now.toISOString()
            },
            updateAt:{
              type:String,
              default:now.toISOString()
            },

        //
    }],
    users:[ String ]
})

var projects=mongoose.model("projects",projectSchema);
module.exports=projects;