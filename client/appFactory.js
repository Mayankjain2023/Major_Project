
app.factory("isAuthenticated",function($q,$http,$location){
    return {
        getUser:function(){
            var deferred=$q.defer();
            $http({
                method:"GET",
                url:"http://localhost:5500/dashboard",
                headers:{Authorization:localStorage.getItem("token")}
            })
            .then(function mysuccess(response){
                console.log(response);
                deferred.resolve(response.data.user);
            },function myError(response){
                console.log(response);
                deferred.reject();
                $location.path("/login")
            })
            return deferred.promise;
        }
    }
});
                    
