var mongoose = require('mongoose');

var OrgSchema = new mongoose.Schema({
  orgname: {
    type: String,required: true
  },
  users:[{
    username: {
        type: String,required: true
      },
      email: {
        type: String,required: true
      },
      orgID:{
        type:String,
        required:true
      },
      role:{
        type:String,default:"Member",required:true
      }
  }]
});

var Org = mongoose.model('OrgModel', OrgSchema);

module.exports = Org;













module.exports.addOrg=function(newOrg,callback){
    newOrg.save(callback);
}

module.exports.getOrgAll=function(callback){
  Org.find({},callback);
}

module.exports.getOrgOne=function(orgname,callback){
  Org.find({orgname:orgname},callback);
}
module.exports.removeOgr=function(orgname,callback){
  Org.deleteOne({orgname:orgname},callback);
}