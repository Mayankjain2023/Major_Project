var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var now=new Date();

var projectManagerSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    orgname:{
        type:String

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    createAt:{
            type:String,
            default:now.toISOString()
    },
    updateAt:{
        type:String,
        default:now.toISOString()
    }

});


var projectManagers=mongoose.model('projectManagers',projectManagerSchema);
module.exports=projectManagers;