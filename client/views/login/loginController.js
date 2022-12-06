
app.controller("loginController",function($scope,$http,$location){
    if(!localStorage.getItem("token")==""){
             $location.path('/dashboard')
                return; 
    }
    $http({
        method:"POST",
        url:"http://localhost:5500/user/createSuperAdmin"
    })
    .then(function mysuccess(response){
        console.log(response);
    },function myError(response){
        console.log(response);
    });
    $scope.login=function(){
        var email=$scope.email;
        var password=$scope.password;
        $scope.invalidAlert=false;
        $http({
            method:"POST",
            url:"http://localhost:5500/user/login",
            data:{'email':email,'password':password}
        })
        .then(function mysuccess(response){
            localStorage.setItem("token",response.data.token);
            $location.path("/dashboard");
            console.log(response);
        },function myError(response){
            console.log(response);
        });
    }
});