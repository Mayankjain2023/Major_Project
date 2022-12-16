var express=require('express');
var router=express.Router();
var profile=require('../controllers/profileImageCtrl');
var multer=require('multer');

// var storage=multer.diskStorage({
//     destination:function(req,file,callBack){
//         callBack(null,'uploads');
//     },
//     filename:function(req,file,callBack){

//         callBack(null,`BugTracker_${file_originalname}`);
//     }
// })

// var upload=multer({storage:storage});
var upload=multer({dest:'uploads/'});


router.post('/profileImage',upload.single('file'),profile.uploadImage);
// router.get()

module.exports=router;
