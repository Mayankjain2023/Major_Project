var URL="http://localhost:5500";

app.controller("memberProfileCtrl",function($scope,$state,$stateParams,$http){

    // $scope.uploadFile = function(files) {
    //     var fd = new FormData();
    //     //Take the first selected file
    //     fd.append("file", files[0]);
    
    //     // $http.post(uploadUrl, fd, {
    //     //     withCredentials: true,
    //     //     headers: {'Content-Type': undefined },
    //     //     transformRequest: angular.identity
    //     // }).success().error();

    //     $http({
    //         method:"POST",
    //         url:URL+"/profileImage",
    //         headers:{ 'Content-Type':'multipart/form-data'}
    //     })
        // .then(function mysuccess(response){
        //     console.log(response);
        // },function myError(response){
        //     console.log(response);
            
    //     });
    
    // };
    // $scope.username="Vaibhav"
    $scope.uploadme;

    // function dataURItoBlob(dataURI) {
    //     var binary = atob(dataURI.split(',')[1]);
    //     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    //     var array = [];
    //     for (var i = 0; i < binary.length; i++) {
    //       array.push(binary.charCodeAt(i));
    //     }
    //     return new Blob([new Uint8Array(array)], {
    //       type: mimeString
    //     });
    //   }

    $scope.uploadImage = function() {
        var fd = new FormData();
        // var imgBlob = dataURItoBlob($scope.uploadme);
        // console.log(imgBlob);
        console.log($scope.uploadme);
        fd.append('file',$scope.uploadme);
        console.log(fd);
        $http({
            method:"POST",
            url:URL+'/profileImage',
            // transformRequest: angular.identity,
            headers:{ 'Content-Type':undefined},
            data:{"fd":fd}
        }).then(function mysuccess(response){
            console.log(response);
        },function myError(response){
            console.log(response)
        })
        // .post(
        //     'imageURL',
        //     fd, {
        //       transformRequest: angular.identity,
        //       headers: {
        //         'Content-Type': undefined
        //       }
        //     }
        //   )
          
      }


      
  
    });







//     $scope.showMemberProfile=function(){
//         $http({
//             method:"GET",
//             url:URL+"/memberProfile/"+profileID,
//             headers:{
//                 'Content-Type':'application/json'
//             }
//         }).then( function mysuccess(response){
//             $scope.member=response.data.docs;
//             console.log(member);
//         },function(myError){
//             console.log(myError);
//         })
//     }


// })