
app.controller("dashboardController",function(user,$state,$http,$rootScope,$scope,$location,$uibModal,SweetAlert){
    $scope.isSuperAdmin=user.isSuperAdmin;
    $scope.isProjectManager=user.isProjectManager;
    $scope.ownername=user.username;
    $scope.isAdmin=user.isAdmin;
    $scope.isMember=user.isMember
    $scope.role=user.isSuperAdmin;
    $scope.useremail=user.email;
    $rootScope.organizationName=user.orgname;
    $rootScope.profileName=user.username;
    $rootScope.profileEmail=user.email;
    $rootScope.profileTeam=user.team;
    $rootScope.profileOrg=user.orgname;


    $scope.logout=function(){
        localStorage.setItem("token","");
        $location.path("/login");
    }

    $scope.closeAlert=function(){
        $scope.passAlert=false;
    }

    $scope.createUser=function(uname,em,pwd,tmname,orgname){
        console.log(uname);

        var name=uname;
        var email=em;
        var password=pwd;
        var orgname=orgname;
       
        $scope.passAlert=false;
        
        console.log(name+" "+email+" "+ password);
        $http({
            method:"POST",
            url:"http://localhost:5500/user/createUser",
            data:{'username':name,'email':email,'password':password,'orgname':orgname}
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

    $scope.createProjectManager=function(pmName,pmEmail,userId){

        var pmName=pmName;
        var pmEmail=pmEmail;
        var orgname=user.orgname;
        var userId=userId;

        console.log(pmName+"" +pmEmail+""+orgname+""+userId);
        $http({
            method:"POST",
            url:"http://localhost:5500/createProjectManager",
            data:{'pmName':pmName,'pmEmail':pmEmail,'orgname':orgname,'userId':userId}
        }).then( function mysuccess(response){
            SweetAlert.swal('Project Manager Created Successfully')
            $state.reload();
            console.log(response);
        },function myError(response){
            $location.path("/dashboard");
            console.log(response);
        })
    }

    //creating Project

    $scope.createProject=function(projectName,projectDescription,projectUserName,projectUserId,startDate,deadline){

        var projectName=projectName;
        var projectDescription=projectDescription;
        // var projectCategory=projectCategory;
        var projectOrgname=user.orgname;
        var projectStartDate=startDate;
        var projectDeadline=deadline;
        var projectManager={

            username:user.username,
            email:user.email,
            userId:user._id

        }
        console.log(projectUserName);
        console.log(projectUserId);

        //  var projectTeam=[]

            
            // projectUserName:projectUserName,
            // projectUserIdprojectUserId
     
        //  console.log(projectTeam);
        var projectUserName=projectUserName;
        var projectUserId=projectUserId;
    
        
        

        $http({
            method:'POST',
            url:"http://localhost:5500/createProject",
            data:{
                "projectName":projectName,
                "projectDescription":projectDescription,
                "projectStartDate":projectStartDate,
                "deadline":projectDeadline,
                "projectOrgname":projectOrgname,
                "projectManager":{
                    "username":projectManager.username,
                    "email":projectManager.email,
                    "userId":projectManager.userId
                },
                
                "users":{
                    "username":projectUserName,
                    "userId":projectUserId
                }
                        
                 

            }
        }).then(function mysuccess(response){
            $state.reload();
            console.log(response)
        },function myError(response){
            console.log(response);
    })
}   
    //getting the projects

    $scope.showProjects=function(){
        $http({
            method:'GET',
            url:"http://localhost:5500/showProjects",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function success(response){
                var projects=response.data.docs;

                console.log(projects);
                var OrgProjects=[];
                for(var i=0;i<projects.length;i++){
                    if(projects[i].orgname==user.orgname){
                        OrgProjects.push(projects[i]);
                    }
                }

                //all projects in the organization
                $scope.projects=OrgProjects;

               
                console.log(user._id);
                var pmProjects=[];
                for(var i=0;i<OrgProjects.length;i++){
                    if(OrgProjects[i].projectManager.userId==user._id){
                        pmProjects.push(OrgProjects[i]);
                    }
                }
                //projects belonging to particular project Manager
                $scope.pmProjects=pmProjects;
                console.log(OrgProjects);
                console.log(pmProjects);

                var userProject=[];
                for(var i=0;i<OrgProjects.length;i++){
                    if(OrgProjects[i].users.username==user.username){
                        userProject.push(OrgProjects[i]);
                    }
                }
                
                console.log(userProject);

                $scope.userProject=userProject;

                $scope.userProjectName=userProject[0].name;
                $scope.userProjectDescription=userProject[0].description;
                $scope.userProjectManager=userProject[0].projectManager.username;
                $scope.userProjectStartDate=userProject[0].startDate;
                $scope.userProjectDeadline=userProject[0].deadline;

               $scope.bugs=userProject[0].bugs;
               $scope.bugsLength=userProject[0].bugs.length;
               console.log(userProject[0].bugs);
            },
            function myError(response){
                console.log(response);
        })
}

    //creating bugs

    $scope.reportBug=function(projectName,bugTitle,bugDescription,bugListPosition
        ,bugEstimate,bugPriority,bugStatus){

        var orgname=user.orgname;
        var projectID=projectName;
        var title=bugTitle;
        var status=bugStatus;
        var priority=bugPriority;
        var listPosition=bugListPosition;
        var description=bugDescription;
        var estimate=bugEstimate;
        // var timeSpent=bugTimeSpent;
        // var timeRemaining=bugTimeRemaining;
        var reporterId={
            username:user.username,
            email:user.email,
            _id:user._id
        }

        $http({
            method:"POST",
            url:"http://localhost:5500/reportBug",
            data:{
                "orgname":orgname,
                "projectID":projectID,
                "title":title,
                "status":status,
                "priority":priority,
                "listPosition":listPosition,
                "description":description,
                "estimate":estimate,
                // "timeSpent":timeSpent,
                // "timeRemaining":timeRemaining,
                "reporterId":{
                    "username":reporterId.username,
                    "email":reporterId.email,
                    "_id":reporterId._id
                }
            }
        }).then( function mysuccess(response){
            SweetAlert.swal('Bug reported Successfully')
            $state.reload();
            console.log(response);
        },function myError(response){
            console.log(response);
        })

    }




//creating organization


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

    $scope.getOrgMembers=function(){
        $http({
            method:'GET',
            url:"http://localhost:5500/getAllOrg",
            headers:{
                'Content-Type':'application/json'
            }
        }).then(function success(response){
                 var org=response.data.docs;

                 console.log(org);
                
                var organizationUsers=[];
                for(var len=0;len<org.length;len++){
                    if(org[len].orgname==$scope.organizationName){
                        organizationUsers.push(org[len].users);
                    }
                    
                }
                console.log(organizationUsers[0]);

                var userArr=[];
                for(var i=1;i<organizationUsers[0].length;i++){
                    userArr.push(organizationUsers[0][i]);
                }
                console.log(userArr);
                // $scope.orgUsers=organizationUsers[0];
                $scope.orgUsers=userArr;
            },function myError(response){
                console.log(response);
        })
}

    //collapseTab
    $scope.isCollapsed= true;
    //
    

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

        // $state.go('profile');
       

        var modalInstance = $uibModal.open({
          ariaLabelledBy:'modal-title',
          ariaDescribedBy:'modal-body',
          templateUrl: 'views/dashboard/modal.html',
          controller: 'modalCtrl',
          controllerAs:'$ctrl'
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
