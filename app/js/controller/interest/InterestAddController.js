/**
 * Created by lost on 2016/3/26.
 */
App.controller("InterestAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','FileUploader',function($rootScope,$scope,$filter,$http,$cookieStore,$state,FileUploader) {

    $scope.checkUser();

    $scope.interest={};

    //老师
    $scope.teacher={};
    $scope.teacherList=[];

    $scope.initTeacherList=function(){
        $scope.isLoading =true;
        $http({
            method: 'POST',
            url: $rootScope.serviceUrl+'/teacherList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.teacherList=response.list;
                        //$scope.teacher.selected = $filter('filter')($scope.teacherList,$scope.interest.teacherId,'value')[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function(e){
                    alert('老师信息获取错误.');
                    $scope.isLoading =false;
                });
    };

    //费用
    $scope.fee={};
    $scope.feeList=[];

    $scope.initFeeList=function(){
        $scope.isLoading =true;
        $http({
            method: 'POST',
            url: $rootScope.serviceUrl+'/feeList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.feeList=response.list;
                        //$scope.teacher.selected = $filter('filter')($scope.teacherList,$scope.interest.teacherId,'value')[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function(e){
                    alert('费用获取错误.');
                    $scope.isLoading =false;
                });
    };

    $scope.goBack=function(){
        $state.go('app.interestList');
    };

    $scope.saveInterest=function(){
      if($scope.addForm.$valid){
          $scope.isLoading = true;
          $scope.interest.teacherId = $scope.teacher.selected.teacherId;
          $scope.interest.psId = $scope.fee.selected.psId;

          $http({
              method: 'POST',
              url: $rootScope.serviceUrl+'/interestMge',
              params: {
                  adminId: $rootScope.loginUser.adminId,
                  interestEntity: $scope.interest,
                  opType: 'add'
              }
          })
              .success(
                  function(response) {
                      if (response && response.code == 0) {
                          $scope.goBack();
                      }
                      else{
                          alert(code);
                      }
                      $scope.isLoading = false;
                  })
              .error(
                  function(e){
                      alert('操作失败.');
                      $scope.isLoading = false;
                  });


      }
      else{
          $scope.addForm.interestName.$dirty = true;
      }
    };


    $scope.initTeacherList();

    $scope.initFeeList();





    ////文件上传/////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //文件上传
    var uploaderPic = $scope.uploaderPic = new FileUploader({
        url: $rootScope.serviceUrl+'/upload?type=ICP',
        queueLimit: 1,   //文件个数
        removeAfterUpload: true
    });

    $scope.isPicTypeError =false;
    uploaderPic.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            if('|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1){
                $scope.isTypeError =false;
                return true;
            }
            else{
                $scope.isTypeError =true;
            }
        }
    });

    $scope.isPicSizeError=false;
    uploaderPic.filters.push({
        name: 'sizeFilter',
        fn: function (item /*{File|FileLikeObject}*/ , options) {
            if(item.size<=0){
                $scope.isPicSizeError=true;
                return false;
            }else if(item.size>5*1024*1024){/*最大限制5M*/
                $scope.isPicSizeError=true;
                return false;
            }
            return true;
        }
    });

    $scope.clearPicItems = function(){  //重新选择文件时，清空队列，达到覆盖文件的效果
        uploaderPic.clearQueue();
    };

    uploaderPic.onWhenAddingFileFailed = function(item , filter, options) {//{File|FileLikeObject}
        uploaderPic.clearQueue();
        console.info('onWhenAddingFileFailed', item, filter, options);
    };

    uploaderPic.onSuccessItem = function(fileItem, response, status, headers) {
        //console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.interest.interestPic = response.picId;
    };

}
]);