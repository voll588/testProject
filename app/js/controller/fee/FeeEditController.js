/**
 * Created by lost on 2016/3/26.
 */
App.controller("FeeEditController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','FileUploader','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,FileUploader,$stateParams) {

    $scope.checkUser();

    $scope.fee={};

    $scope.feeId = $stateParams.feeId;


    $scope.goBack = function(){
        return $state.go('app.feeList');
    };

    $scope.saveFee=function(){
        if($scope.addForm.$valid){
            $scope.isLoading = true;
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl+'/feeMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    psEntity: $scope.fee,
                    opType: 'update'
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
        }
    };

    $scope.getFeeById=function(){

        if(!$scope.feeId){
            alert('参数错误.');
            return;
        }
        $scope.isLoading = true;

        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl + '/feeList',
            params: {
                adminId: $rootScope.loginUser.adminId,
                psId:$scope.feeId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.fee = response.list[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                });

    };







    //文件上传
    var uploaderPic = $scope.uploaderPic = new FileUploader({
        url: $rootScope.serviceUrl+'/upload?type=XQ',
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
        $scope.fee.interestPic = response.picId;
    };

}
]);
