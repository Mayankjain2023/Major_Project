app.controller("registerCtrl",function($state,$http,$scope,SweetAlert){

    $scope.createOrg=function(orgName,adminName,adminEmail,adminPassword){
       
        var orgname = orgName;
        var username= adminName;
        var email= adminEmail;
        var password= adminPassword;
        var orgID=orgName+"1";

        // $scope.passAlert=false;
        console.log(username+" "+email+" "+ orgname);

        $http({
            method:"POST",
            url:"http://localhost:5500/user/createOrg",
            data:{
                "orgname": orgname,
                "username":username,
                "email":email,
                "orgID":orgID,
                "password":password
            }
        }).then(function mysuccess(response){

            SweetAlert.swal("Registered", "You have successfully registered,kindly login", "success");
            $state.go('login');
            console.log(response);

        },function myError(response){
            console.log(response);
        });
    }
})