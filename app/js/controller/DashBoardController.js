/**
 * Created by lost on 2016/3/5.
 */
App.controller("DashBoardController",['$rootScope','$scope','$filter','$http',function($rootScope,$scope,$filter,$http){

    $scope.infos='';

    $http({
        method: 'POST',
        url: $scope.serviceUrl + '/landingInfo',
        params: { adminId: $rootScope.loginUser.adminId }
        })
        .success(
            function (response) {
                $scope.infos = response.data;
            })
        .error(
            function (e) {
                alert(e);
                //$scope.newAdmin='';
                //$scope.roleSelected='';
            });
}]);