
app.controller("dashboardController",function(user,$state,$http,$scope,$location,$uibModal,SweetAlert){
    $scope.isSuperAdmin=user.isSuperAdmin;
    $scope.ownername=user.username;
    $scope.isAdmin=user.isAdmin;
    $scope.isMemer=user.isMember
    $scope.role=user.isSuperAdmin;
    $scope.useremail=user.email;

    $scope.logout=function(){
        localStorage.setItem("token","");
        $location.path("/login");
    }



    $scope.createOrg=function(orgName,adminName,adminEmail,adminPassword){
        var username=adminName;
        var orgname = orgName;
        var email=adminEmail;
        var password=adminPassword;
        $scope.passAlert=false;
        
        console.log(username+" "+email+" "+ password);
        $http({
            method:"POST",
            url:"http://localhost:5500/createOrg",
            data:{'username':username,'orgname': orgname,'email':email,'password':password}
        })
        .then(function mysuccess(response){
            SweetAlert.swal("Organization added successfully");
            $state.reload();
            console.log(response);
        },function myError(response){
            console.log(response);
        });
    }
    $scope.closeAlert=function(){
        $scope.passAlert=false;
    }

    $scope.createUser=function(uname,em,pwd,tmname,orgname){
        console.log(uname);

        var name=uname;
        var email=em;
        var password=pwd;
        var teamname=tmname;
        var orgname=orgname;
       
        $scope.passAlert=false;
        
        console.log(name+" "+email+" "+ password);
        $http({
            method:"POST",
            url:"http://localhost:5500/user/createUser",
            data:{'username':name,'email':email,'password':password,'teamname':teamname,'orgname':orgname}
        })
        .then(function mysuccess(response){

            SweetAlert.swal("User added successfully");
            $state.reload();
            console.log(response);
        },function myError(response){
            $location.path("/dashboard");

            console.log(response);
            
        });
    }

    $scope.getOrg=function(){
            $http({
                method:'GET',
                url:"http://localhost:5500/getAllOrg",
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(function success(response){
                    var org=response.data.docs;
                    
                    var organization=[];
                    for(var len=0;len<org.length;len++){
                        organization.push(org[len].orgname);
                    }

                    $scope.orgNameValues=organization;
                    console.log(response);

                
            },function myError(response){
                    console.log(response);
            })
    }

    

    $scope.getUser=function(){
        $http({
            method:'GET',
            url:"http://localhost:5500/user/getAllMembers",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function success(response){
                var users=response.data.docs;

                $scope.userValues=users;
                // var userNames=[];
                // for(var len=0;len<users.length;len++){
                //     userNames.push(users[len].username);
                // }

                // $scope.userNameValues=userNames;

                console.log(response);
        },function myError(response){
                console.log(response);
        })
    }

    $scope.closeAlert=function(){
        $scope.passAlert=false;
    }


    $scope.toggleSidebar = function() {
		$("#wrapper").toggleClass("active");
		$("#menu-toggle").find('i').toggleClass('fa fa-angle-double-left').toggleClass('fa fa-angle-double-right');
	}


    $scope.openModal = function () {

        var modalInstance = $uibModal.open({
          ariaLabelledBy:'modal-title',
          ariaDescribedBy:'modal-body',
          templateUrl: 'views/dashboard/modal.html',
          controller: 'modalCtrl',
          controllerAs:'$ctrl'
        //   resolve: {
        //     items: function () {
        //       return $scope.items;
        //     }
        //   }
        });
    
        modalInstance.result.then(function (selectedItem) {
       
        }, function () {
       
        });
      };

      $scope.openLargeModal = function (size) {

        var modalInstance = $uibModal.open({
          ariaLabelledBy:'modal-title',
          ariaDescribedBy:'modal-body',
          templateUrl: 'views/superAdmin/reportmodal.html',
          controller: 'modalCtrl',
          controllerAs:'$ctrl',
          size:size,
        //   resolve: {
        //     items: function () {
        //       return $scope.items;
        //     }
        //   }
        });
    
        modalInstance.result.then(function (selectedItem) {
       
        }, function () {
       
        });
      };

      


      $scope.openAdminModal = function (size) {

        var modalInstance = $uibModal.open({
          ariaLabelledBy:'modal-title',
          ariaDescribedBy:'modal-body',
          templateUrl: 'views/admin/adminModal.html',
          controller: 'modalCtrl',
          controllerAs:'$ctrl',
          size:size,
        //   resolve: {
        //     items: function () {
        //       return $scope.items;
        //     }
        //   }
        });
    
        modalInstance.result.then(function (selectedItem) {
       
        }, function () {
       
        });
      };

});
