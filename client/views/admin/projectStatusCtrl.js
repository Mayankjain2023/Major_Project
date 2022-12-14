var URL="http://localhost:5500";

app.controller("projectStatusCtrl",function($state,$http,$rootScope,$scope,$location,$stateParams){

      //openProjectInfo

      $scope.getProjectStatus=function(){

        $http({
            method:"GET",
            url:URL+"/projectStatus/"+$stateParams.projectId,
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function mysuccess(response){
            var project=response.data.docs;
            $scope.projectManagerName=project.projectManager.username;
            $scope.projectName=project.name;
            $scope.bugs=project.bugs;
            $scope.users=project.users;
            
            console.log(response)
        },function myError(err){
            console.log(err);
        })


    }




})