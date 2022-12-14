var URL="http://localhost:5500";

app.controller("projectManagerCtrl",function($state,$http,$rootScope,$scope,$location,$stateParams){

      //openProjectInfo

      $scope.getProjectBugs=function(){

        $http({
            method:"GET",
            url:URL+"/project/"+$stateParams.projectId,
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function mysuccess(response){
            var project=response.data.docs;

            $scope.projectName=project.name;
            $scope.bugs=project.bugs;
            $scope.users=project.users;
            
            console.log(response)
        },function myError(err){
            console.log(err);
        })


    }




})