var express=require('express');
var router=express.Router();
var admin=require('../controllers/adminRouteCtrl');


router.post('/comment/create/:id',admin.postComment);
router.post("/issue/create/:id",admin.createIssue);
router.post("/issue/update/:id",admin.updateIssue);
router.post("/issue/delete/:pid/:iid",admin.deleteIssue);

router.get('/project/:id',admin.getProject);
router.post('/project/update/:id',admin.updateProject);




