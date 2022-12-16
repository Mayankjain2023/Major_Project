
//<reference path="angular.js"/>
//<reference path="ui-route.js"/>
var app=angular.module('myApp',["ngTouch","ngSanitize","ngAnimate","ui.bootstrap","ui.router","oitozero.ngSweetAlert"])
        
app.config(function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise("home");
                $stateProvider
                .state("dashboard",{
                    controller:"dashboardController",
                    templateUrl:"views/dashboard/dashboard.html",
                    url:"/dashboard",
                    resolve:{
                        user:function(isAuthenticated){
                            return isAuthenticated.getUser();
                        }
                    }
                })
                .state("login",{
                    controller:"loginController",
                    templateUrl:"views/login/login.html",
                    url:"/login"
                    
                })
                .state("register",{
                    controller:"registerCtrl",
                    templateUrl:"views/register/register.html",
                    url:"/register"
                })
                // .state("updatePassword",{
                //     templateUrl:"views/login/updatePwd.html",
                //     controller:"updatepwdCtrl",
                //     url:"/updatePassword"
                // })
                .state("home",{
                    controller:"homeController",
                    templateUrl:"views/home/home.html",
                    url:"/home"
                })
                .state("project",{
                    url:'/project/:projectId',
                    templateUrl:"views/projectManager/projectBugs.html",
                    controller:"projectManagerCtrl"
                })
                .state("projectStatus",{
                    url:'/projectStatus/:projectId',
                    templateUrl:"views/admin/projectStatus.html",
                    controller:"projectStatusCtrl"
                })
                // .state("memberProfile",{
                //     url:'/memberProfile/:memberID',
                //     templateUrl:"views/admin/memberProfile.html",
                //     controller:"memberProfileCtrl"
                // })
                .state("updateProfile",{
                    url:'/updateProfile/:profileId',
                    templateUrl:"views/member/memberProfile.html",
                    controller:"memberProfileCtrl"
                })



                // .state("profile",{
                //     controller:"modalCtrl",
                //     templateUrl:"views/dashboard/modal.html",
                //     url:"/dashboard/profile",
                //     resolve:{
                //         user:function(isAuthenticated){
                //             return isAuthenticated.getUser();
                //         }
                //     }
                // })
                // .state("superAdmin",{
                //     controller:"superAdminCtrl",
                //     templateUrl:"views/superAdmin/superAdmin.html",
                //     url:"/superAdmin",
                //     resolve:{
                //         user:function(isAuthenticated){
                //             return isAuthenticated.getUser();
                //         }
                //     }
                // })
                
            
});


app.directive("fileread", [
    function() {
      return {
        scope: {
          fileread: "="
        },
        link: function(scope, element, attributes) {
          element.bind("change", function(changeEvent) {
            var reader = new FileReader();
            reader.onload = function(loadEvent) {
              scope.$apply(function() {
                scope.fileread = loadEvent.target.result;
              });
            }
            reader.readAsDataURL(changeEvent.target.files[0]);
          });
        }
      }
    }
  ]);




