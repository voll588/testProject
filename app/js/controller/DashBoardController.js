/**
 * Created by lost on 2016/3/5.
 */
App.controller("DashBoardController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    $rootScope.checkUser();

    $scope.isLoading = true;
    $http({
        //headers: {token: $rootScope.loginUser.token},
        method: 'POST',
        url: $scope.serviceUrl + '/landingInfo',
        params: { adminId: $rootScope.loginUser.adminId }
        })
        .success(
            function (response) {
                if(response&& response.code!=0){
                    alert($rootScope.getErMsge(response.code));
                    $state.go("login");
                }
                $scope.infos = response;
                $scope.isLoading = false;
            })
        .error(
            function (e) {
                alert('数据加载失败.');
                $scope.isLoading = false;
            });
}]);