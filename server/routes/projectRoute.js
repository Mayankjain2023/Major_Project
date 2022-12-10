var express=require('express');
var router=express.Router();
var project=require('../controllers/projectRouteCtrl');

router.post('/createProjectManager',project.createProjectManager);
router.post('/createProject',project.createProject);
router.get('/showProjects',project.showProjects);
router.post('/reportBug',project.reportBug);
router.post('/comment/create/:id',project.postComment);
// router.post("/issue/create/:id",project.createIssue);
// router.post("/issue/update/:id",project.updateIssue);
// router.post("/issue/delete/:pid/:iid",project.deleteIssue);
router.get('/project/:id',project.getProject);
router.post('/project/update/:id',project.updateProject);
module.exports=router;



