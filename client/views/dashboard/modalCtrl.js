app.controller('modalCtrl',function($scope,$uibModalInstance){

    // $scope.username=user.username;
    
    var $ctrl=this;
   
    $ctrl.ok=function(){
        $uibModalInstance.close();
    };

    $ctrl.cancel=function(){
        $uibModalInstance.dismiss('cancel');
    }

})