/**
 * Created by lost on 2016/3/26.
 */
App.controller("DevicesController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){


    $rootScope.checkUser();

    $scope.addVideo = function(){
        $state.go('app.devicesAdd');
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
