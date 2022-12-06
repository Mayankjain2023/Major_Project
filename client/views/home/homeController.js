
app.controller("homeController",function($scope,$http,$location){
    if(!localStorage.getItem("token")==""){
        $location.path('/dashboard')
        return;
     }
    $scope.signUp=function(){
        var name = $scope.name;
        var email=$scope.email;
        var password=$scope.password;
        $scope.passAlert=false;
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(regex.exec(password)==null)
        {
            $scope.passAlert=true;
            return;
        }
        console.log(name+" "+email+" "+ password);
        $http({
            method:"POST",
            url:"http://localhost:5500/user/register",
            data:{'name':name,'email':email,'password':password}
        })
        .then(function mysuccess(response){
            $location.path("/login");
            console.log(response);
        },function myError(response){
            console.log(response);
        });
    }
    $scope.closeAlert=function(){
        $scope.passAlert=false;
    }

})