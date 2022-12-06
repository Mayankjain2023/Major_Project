// app.controller("adminCtrl",function(user,$http,$scope,$state,$location){

//     $scope.isSuperAdmin=user.isSuperAdmin;
//     $scope.name=user.username;
//     $scope.isAdmin=user.username=="Admin";
//     $scope.role=user.isSuperAdmin;
//     $scope.useremail=user.email;

//     $scope.logout=function(){
//         localStorage.setItem("token","");
//         $location.path("/login");
//     }
    
//     $scope.createUser=function(){

//         var name=$scope.username;
//         var email=$scope.email;
//         var password=$scope.password;
//         var teamname=$scope.teamname;
//         $scope.passAlert=false;
        
//         console.log(username+" "+email+" "+ password);
        
//         $http({
//             method:"POST",
//             url:"http://localhost:5500/user/createUser",
//             data:{'username':name,'email':email,'password':password,'teamname':teamname}
//         })
//         .then(function mysuccess(response){
//             // SweetAlert.swal("User added successfully");
            
//             $location.path("/dashboard");
          
//             console.log(response);
//         },function myError(response){
//             console.log(response);
//         });
//     }



//     $scope.openAdminModal = function (size) {

//         var modalInstance = $uibModal.open({
//           ariaLabelledBy:'modal-title',
//           ariaDescribedBy:'modal-body',
//           templateUrl: 'views/admin/adminModal.html',
//           controller: 'modalCtrl',
//           controllerAs:'$ctrl',
//           size:size,
       
//         });
    
//         modalInstance.result.then(function (selectedItem) {
       
//         }, function () {
       
//         });
//       };


// })