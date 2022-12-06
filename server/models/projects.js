var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var projectSchema=new Schema({
    name:String,
    description:String,
    category:String,
    createAt:String,
    updateAt:String,

    projectManager:{
        username: {
            type: String,required: false
          },
          email: {
            type: String,required: false
          }
        //pm of that project
    },
    issues:[{
            
            title:String,
            type:String,
            status:String,
            priority:String,
            listPosition:Number,
            description:String,
            estimate:Number,
            timeSpent:Number,
            timeRemainingl:Number,
            createdAt:String,
            updateAt:String,

        //
    }],
    users:[
        {
            username: {
                type: String,required: false
              },
              email: {
                type: String,required: false
              },
              teamname:{
                type:String,required:false
              }
        
    }]
},
{
    collection:"projects"
})

module.exports=mongoose.model("projects",projectSchema);