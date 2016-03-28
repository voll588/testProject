/**
 * Created by lost on 2016/3/16.
 */
App.controller('TeacherAddController',['$rootScope','$scope','$state','$http','FileUploader',function($rootScope,$scope,$state,$http,FileUploader){

    $scope.checkUser();

    $scope.teacher={};

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
                    opType:  'add'
                }
            })
                .success(
                    function (response) {
                        if (response && response.code == 0) {
                            $scope.isLoading =false;
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



    //文件上传
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



    /*
    uploader.onWhenAddingFileFailed = function(item , filter, options) {//{File|FileLikeObject}
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
    */
}]);