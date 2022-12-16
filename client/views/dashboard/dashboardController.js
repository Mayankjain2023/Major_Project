var URL="http://localhost:5500";

app.controller("dashboardController",function(user,$state,$http,$rootScope,$scope,$location,$uibModal,SweetAlert){
    
    
   
    $scope.ownername=user.username;
    $scope.useremail=user.email;
    $rootScope.organizationName=user.orgname;
    
    $rootScope.profileName=user.username;
    $rootScope.profileEmail=user.email;
    $rootScope.profileTeam=user.team;
    $rootScope.profileOrg=user.orgname;
    $rootScope.profileID=user._id;



    console.log(user.role);

    $rootScope.role=user.role;
    var userPermissions=user.permissions;
    $rootScope.profilePermissions=userPermissions;

    console.log(userPermissions);
    console.log(userPermissions.includes("createProjectManager"));

    $scope.viewOrg=userPermissions.includes("viewOrg")
    $scope.viewUsers=userPermissions.includes("viewUser");
    $scope.createUsers=userPermissions.includes("createUser");
    $scope.createProjectManagers=userPermissions.includes("createProjectManager");
    $scope.viewProject=userPermissions.includes("viewProject");
    $scope.viewProjects=userPermissions.includes("viewProjects");
    $scope.reportProjectBugs=userPermissions.includes("reportBug");
    $scope.viewProjectBugs=userPermissions.includes("viewBug");
    $scope.viewSelfProjects=userPermissions.includes('viewSelfProjects');
    $scope.createProjects=userPermissions.includes('createProjects');


    $scope.logout=function(){
        localStorage.setItem("token","");
        $location.path("/login");
    }

    $scope.closeAlert=function(){
        $scope.passAlert=false;
    }

    //creating Users
    $scope.createUser=function(uname,em,pwd,employeeID,orgname){
        console.log(uname);

        var name=uname;
        var email=em;
        var password=pwd;
        var orgname=user.orgname;

        var orgID=orgname+employeeID;

       
        $scope.passAlert=false;
        
        console.log(name+" "+email+" "+ password);
        $http({
            method:"POST",
            url:URL+"/user/createUser",
            data:{'username':name,'email':email,'password':password,'orgname':orgname,'orgID':orgID}
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
            //creating project Manager

    $scope.createProjectManager=function(pmName,pmEmail,orgID,pId){
        // $scope.makeProjectManager=true;
        console.log(pId);
        console.log(pmName,pmEmail,orgID,pId);

        var pmName=pmName;
        var pmEmail=pmEmail;
        var orgname=user.orgname;
        var orgID=orgID;
        var userId=pId;

        console.log(pmName+"" +pmEmail+""+orgname+""+userId);
        $http({
            method:"POST",
            url:URL+"/createProjectManager",
            data:{'pmName':pmName,'pmEmail':pmEmail,'orgname':orgname,'orgID':orgID,'userId':userId}
        }).then( function mysuccess(response){
            SweetAlert.swal("Member succesfully made as project Manager");
            $state.reload();
            console.log(response);
        },function myError(response){
            $location.path("/dashboard");
            console.log(response);
        })
    }

    //creating Project

    $scope.createProject=function(projectName,projectDescription,projectUsersEmail,startDate,deadline){

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
        // console.log(projectUsersEmail);
        var users=projectUsersEmail;
        console.log(users);

        // console.log(projectUserName);
        // console.log(projectUserId);

        //  var projectTeam=[]

            
            // projectUserName:projectUserName,
            // projectUserIdprojectUserId
     
        //  console.log(projectTeam);
        // var projectUserName=projectUserName;
        // var projectUserId=projectUserId;

        $http({
            method:'POST',
            url:URL+"/createProject",
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
                "users":users  

            }
        }).then(function mysuccess(response){
            SweetAlert.swal('Project Created Successfully')
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
            url: URL+"/showProjects",
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
                console.log(user.username);
                

                var userProject=[];
            
                
                for(var i=0;i<OrgProjects.length;i++){
                        console.log(OrgProjects[i].users);
                        if(OrgProjects[i].users.includes(user.email)){
                        //     console.log(OrgProjects[i].users.useremail);
                            userProject.push(OrgProjects[i]);
                            
                        // }

                    }
                }
                
                $scope.projectAssignees=userProject[0].users;
                // console.log(userProject[0].users);

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

    $scope.reportBug=function(projectName,bugCategory,bugTitle,bugDescription,bugListPosition
        ,bugPriority,bugStatus){

        var orgname=user.orgname;
        var projectID=projectName;
        var category=bugCategory;
        var title=bugTitle;
        var status=bugStatus;
        var priority=bugPriority;
        var listPosition=bugListPosition;
        var description=bugDescription;
        // var estimate=bugEstimate;
        // var timeSpent=bugTimeSpent;
        // var timeRemaining=bugTimeRemaining;
        var reporterId={
            username:user.username,
            email:user.email,
            _id:user._id
        }

        $http({
            method:"POST",
            url:URL+"/reportBug",
            data:{
                "orgname":orgname,
                "projectID":projectID,
                "category":category,
                "title":title,
                "status":status,
                "priority":priority,
                "listPosition":listPosition,
                "description":description,
                // "estimate":estimate,
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
                url:URL+"/getAllOrg",
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


    // var app=this;
    // app.searchTerm="";
    // app.debounceTerm="";
    
    //getOrgMembers

    $scope.getOrgMembers=function(){
        $http({
            method:'GET',
            url:URL+"/getAllOrg",
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

    // $scope.$watch("app.searchTerm", _.debounce(function(n,o){
    //     app.debounceTerm=n;
    //     $scope.$apply();
    // },500));



    //collapseTab
    $scope.isCollapsed= true;
    //
    

    $scope.getUser=function(){
        $http({
            method:'GET',
            url:URL+"/user/getAllMembers",
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

    //modals

    $scope.openModal = function () {

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

  

      $scope.openMemberModal = function (users,size) {

        var modalInstance = $uibModal.open({
          ariaLabelledBy:'modal-title',
          ariaDescribedBy:'modal-body',
          templateUrl: 'views/member/memberProfile.html',
          controller: 'modalCtrl',
          controllerAs:'$ctrl',
          size:size,
       
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
        
        });
    
        modalInstance.result.then(function (selectedItem) {
       
        }, function () {
       
        });
      };

});
