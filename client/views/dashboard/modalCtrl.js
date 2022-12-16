app.controller('modalCtrl',function($scope,$uibModalInstance){

    // $scope.username=user.username;
    
    var $ctrl=this;
    
    $scope.showUserPermissions=false;
    $scope.showPermissions=function(){
        $scope.showUserPermissions=!$scope.showUserPermissions;
    }
    $ctrl.ok=function(){
        $uibModalInstance.close();
    };

    $ctrl.cancel=function(){
        $uibModalInstance.dismiss('cancel');
    }

})