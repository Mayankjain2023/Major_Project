var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var now=new Date();

var projectManagerSchema=new Schema({

    name:{
        type:String
    },
    email:{
        type:String
    },
    createAt:{
            type:String,
            default:now.toISOString()
    },
    updateAt:{
        type:String,
        default:now.toISOString()
    }

},{
    collection:"projectManagers"
});

module.exports=mongoose.model('projectManagers',projectManagerSchema);