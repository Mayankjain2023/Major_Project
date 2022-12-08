var express=require("express");

var app=express();
var passport = require("passport");
var bodyparser=require('body-parser');
var router=express.Router();
var superAdmin=require("../controllers/protectedRouteCtrl");
app.use(bodyparser.json());
app.use(passport.initialize());

require('../config/passport');

router.get("/dashboard",passport.authenticate('jwt',{session:false}),superAdmin.dashboard);
router.post("/createOrg",superAdmin.createOrg);
router.get("/getAllOrg",superAdmin.getAllOrg);


module.exports=router;