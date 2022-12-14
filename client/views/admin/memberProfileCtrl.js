var URL="http://localhost:5500";

app.controller("memberProfileCtrl",function($scope,$state,$stateParams,$http){

    $scope.showMemberProfile=function(){
        $http({
            method:"GET",
            url:URL+"/memberProfile/"+profileID,
            headers:{
                'Content-Type':'application/json'
            }
        }).then( function mysuccess(response){
            $scope.member=response.data.docs;
        },function(myError){
            console.log(myError);
        })
    }


})