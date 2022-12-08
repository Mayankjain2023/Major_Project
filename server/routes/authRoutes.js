var express=require('express');
var router=express.Router();
var bodyparser=require('body-parser');

var authenticate=require('../controllers/authRouteCtrl');


// router.post("/registerOrg",authenticate.registerOrg);

var app=express();
app.use(bodyparser.json());

router.post("/createUser",authenticate.createUser);
router.post("/login",authenticate.login);
router.post("/updatePassword",authenticate.updatepwd);
router.post("/createSuperAdmin",authenticate.create);
router.get("/getAllMembers",authenticate.getAllMembers);
module.exports=router;