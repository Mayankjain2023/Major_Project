// var URI="http://localhost:5500/user/";

// app.controller("updatepwdCtrl",function($scope,$http,$location){

//     $scope.updatepwd=function(){
//         var email=$scope.email;
//         var password=$scope.newpwd;
//         $scope.invalidAlert=false;

//         $http({
//             method:"POST",
//             url:URI+"updatePassword",
//             data:{'email':email,'password':password}
//         })
//         .then(function mysuccess(response){
           
//             $location.path("/login");
//             console.log(response);
//         },function myError(response){
//             console.log(response);
//         });
//     }
// });