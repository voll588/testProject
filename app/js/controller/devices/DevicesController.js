/**
 * Created by lost on 2016/3/26.
 */
App.controller("DevicesController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$route',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$route){


    $rootScope.checkUser();

    $scope.addVideo = function(){
        $state.go('app.devicesAdd');
    };

    $scope.editDevice=function(dId){
        $state.go('app.devicesEdit',{dId:dId});
    };

    $scope.delDevice=function(dev){
        $scope.isLoading =true;
        $http({
            //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/videoMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                videoEntity: dev,
                opType:  'del'
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.isLoading = false;
                        $scope.getVideoList();
                    }
                })
            .error(
                function (e) {
                    alert('操作失败..');
                    $scope.isLoading = false;
                });
    };

    $scope.imgUrl = $rootScope.imgUrl;

    $scope.videoList = [];
    $scope.getVideoList=function(){
        $scope.isLoading=true;
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/videoList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.videoList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据加载失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.getVideoList();
}]);
