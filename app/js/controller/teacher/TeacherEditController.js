/**
 * Created by lost on 2016/3/16.
 */
App.controller('TeacherEditController',['$rootScope','$scope','$stateParams','$http','$state','FileUploader',function($rootScope,$scope,$stateParams,$http,$state,FileUploader){

    $scope.checkUser();

    $scope.teacherName=$stateParams.teacherName;

    $scope.teacher={};

    $scope.editPic = false;
    $scope.editVideo = false;

    $scope.editTeacherPic=function(){
        $scope.editPic = !$scope.editPic;
    };

    $scope.editTeacherVideo=function(){
        $scope.editVideo = !$scope.editVideo;
    };

    //根据Name 获取 Teacher
    $scope.getTeacherByTeacherName=function(){

        if(!$scope.teacherName){
            alert('参数错误.');
            return;
        }
        $scope.isLoading = true;

        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $scope.serviceUrl + '/teacherList',
            params: {
                adminId: $rootScope.loginUser.adminId,
                teacherName:$scope.teacherName
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.teacher = response.list[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.saveTeh=function(){
        if($scope.addForm.$valid){
            $scope.isLoading =true;

            $http({
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl+'/teacherMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    teacherEntity: $scope.teacher,
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

    $scope.goBack=function(){
        $state.go('app.teacherList');
    };

    //图片文件上传
    var uploaderPic = $scope.uploaderPic = new FileUploader({
        url: $rootScope.serviceUrl+'/upload?type=TT',
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
        $scope.teacher.teacherPic = response.picId;
    };



    //视频上传
    var uploaderVideo = $scope.uploaderVideo = new FileUploader({
        url: $rootScope.serviceUrl+'/upload?type=TV',
        queueLimit: 1,   //文件个数
        removeAfterUpload: true
    });

    $scope.isVideoTypeError =false;
    uploaderVideo.filters.push({
        name: 'videoFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            if('|mp4|'.indexOf(type) !== -1){
                $scope.isVideoTypeError =false;
                return true;
            }
            else{
                $scope.isVideoTypeError =true;
                return false;
            }
        }
    });

    $scope.isVideoSizeError=false;
    uploaderVideo.filters.push({
        name: 'sizeFilter',
        fn: function (item /*{File|FileLikeObject}*/ , options) {
            if(item.size<=0){
                $scope.isVideoSizeError=true;
                return false;
            }else if(item.size>10*1024*1024){/*最大限制5M*/
                $scope.isVideoSizeError=true;
                return false;
            }
            $scope.isVideoSizeError=false;
            return true;
        }
    });

    $scope.clearVideoItems = function(){  //重新选择文件时，清空队列，达到覆盖文件的效果
        uploaderVideo.clearQueue();
    };

    uploaderVideo.onWhenAddingFileFailed = function(item , filter, options) {//{File|FileLikeObject}
        uploaderVideo.clearQueue();
        console.info('onWhenAddingFileFailed', item, filter, options);
    };

    uploaderVideo.onSuccessItem = function(fileItem, response, status, headers) {
        //console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.teacher.teacherVideo = response.picId;
    };





    //图片上传 begin
    $scope.reset = function() {
        $scope.myImage        = '';
        $scope.myCroppedImage = '';
        $scope.imgcropType    = "square";
    };

    $scope.reset();

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
            });
        };
        if(file)
            reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    //图片上传 end




    $scope.getTeacherByTeacherName();
}]);