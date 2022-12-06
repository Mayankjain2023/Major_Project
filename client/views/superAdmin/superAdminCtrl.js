// app.controller('superAdminCtrl',function(user,$http,$scope,$location){

//     $scope.isSuperAdmin=user.isSuperAdmin;
//     $scope.name=user.username;
//     $scope.isAdmin=user.username=="Admin";
//     $scope.role=user.isSuperAdmin;
//     $scope.useremail=user.email;

//     $scope.logout=function(){
//         localStorage.setItem("token","");
//         $location.path("/login");
//     }

            
//         $scope.createOrg=function(){
//             var orgname = $scope.orgname;
//             var adminname=$scope.username;
//             var email=$scope.email;
//             var password=$scope.password;
//             $scope.passAlert=false;
            
//             console.log(username+" "+email+" "+ password);
//             $http({
//                 method:"POST",
//                 url:"http://localhost:5500/createOrg",
//                 data:{'username':orgname,'email':email,'password':password}
//             })
//             .then(function mysuccess(response){
//                 // SweetAlert.swal("Organization added successfully");
//                 // $location.path("/dashboard");
//                 console.log(response);
//             },function myError(response){
//                 console.log(response);
//             });
//         }

//         $scope.openLargeModal = function (size) {

//             var modalInstance = $uibModal.open({
//               ariaLabelledBy:'modal-title',
//               ariaDescribedBy:'modal-body',
//               templateUrl: 'views/superAdmin/reportmodal.html',
//               controller: 'modalCtrl',
//               controllerAs:'$ctrl',
//               size:size,
//             //   resolve: {
//             //     items: function () {
//             //       return $scope.items;
//             //     }
//             //   }
//             });
        
//             modalInstance.result.then(function (selectedItem) {
           
//             }, function () {
           
//             });
//           };









// })
