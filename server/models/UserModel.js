var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true 
  },
  password: { 
    type: String,
    required: true
   },
  team:{
    type:String, 
    required:false},
  orgname:{
    type:String,
    required:false
  },
  role:{
    type:String
  },
  permissions:[String]
 
  // isSuperAdmin:{
  //   type:Boolean,
  //   default:false
  // },
  // isAdmin:{
  //   type:Boolean,
  //   default:false
  // },
  // // isMember:{
  //   type:Boolean,
  //   default:false
  // },
  // isProjectManager:{
  //   type:Boolean,
  //   default:false
  // },

// roles:['superAdmin']

// const mapRoles={
//   superAdmind:'SUPERADMIN'
// }
// if(res){
//   mapRoles[res.roles[0]]
// }
    
  // roles:{

  //           role:{        
  //             type:String   //superadmin //admin //projectManager //member
  //           },
  //           order:{  
  //             type:Number    //1 //2 //3 //4
  //           },
  //           permissions:[String]  //['create','read','write','delete']
          
  // }

    

  
});

var User = mongoose.model('UserModel', UserSchema);

module.exports = User;







module.exports.getUserById=function(id,callback){
  User.findById({_id:id},callback);
}

module.exports.getUserByUsername=function(username,callback){
  var query={username:username};
  User.findOne(query,callback);
}

module.exports.addUser=function(newUser,callback){
  newUser.save(callback);
}

module.exports.updatePassword=function(newUser,callback){
    User.updateOne(
      
      {
        $set:{password:newUser.newPassword}
      },
      callback);
}

module.exports.getUsers=function(callback){
  User.find({},callback);
}

module.exports.deleteAccount=function(username,callback){
  User.deleteOne({username:username},callback);
}