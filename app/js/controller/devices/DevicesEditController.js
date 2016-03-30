/**
 * Created by lost on 2016/3/30.
 */
App.controller("DevicesEditController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','FileUploader','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,FileUploader,$stateParams) {

    $rootScope.checkUser();

    $scope.dId = $stateParams.dId;

    $scope.video = {};

    //返回
    $scope.goBack= function () {
        return $state.go('app.devicesList');
    };

    $scope.editPic = false;
    //修改直播图
    $scope.editVideoPic=function(){
        $scope.editPic = !$scope.editPic;
    };

    $scope.videoType={};
    $scope.videoTypeList=[{id:0,name:'基础设备'},{id:1,name:'自定义设备'}];


    $scope.getDeviceById= function(){
        if($scope.dId){
            $scope.isLoading = true;
            $http({
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl+'/videoList',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    videoId: $scope.dId
                }
            })
                .success(
                    function (response) {
                        if (response && response.code == 0) {
                            $scope.video = response.list[0];
                            $scope.videoType.selected=$filter('filter')($scope.videoTypeList,{id:$scope.video.videoType})[0];
                            $scope.isLoading = false;
                        }
                    })
                .error(
                    function (e) {
                        alert('数据获取失败..');
                        $scope.isLoading = false;
                    });
        }
        else{
            alert('参数错误!');
        }
    };


    //保存
    $scope.saveVideo=function(){
        if($scope.addForm.$valid){
            $scope.isLoading =true;
            $scope.video.videoType = $scope.videoType.selected.id;
            $http({
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl+'/videoMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    videoEntity: $scope.video,
                    opType:  'update'
                }
            })
                .success(
                    function (response) {
                        if (response && response.code == 0) {
                            $scope.goBack();
                        }
                    })
                .error(
                    function (e) {
                        alert('操作失败..');
                        $scope.isLoading = false;
                    });
        }
    };





    $scope.getDeviceById();













    //文件上传
    var uploaderPic = $scope.uploaderPic = new FileUploader({
        url: $rootScope.serviceUrl+'/upload?type=TVP',
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
        $scope.video.videoPic = response.picId;
    };

}
]);