var mongoose=require(mongoose);
var permissionSchema= new mongoose.Schema({
    role:"SUPERADMIN",
    permissions:["view","update","delete"]
})

var rolePermissions=mongoose('permissionModel',permissionSchema);
module.exports=rolePermissions;

