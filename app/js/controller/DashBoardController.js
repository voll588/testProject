/**
 * Created by lost on 2016/3/5.
 */
App.controller("DashBoardController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    $scope.isLoading = true;
  var uCookie = $cookieStore.get('loginUser');

    $http({
        method: 'POST',
        url: $scope.serviceUrl + '/landingInfo',
        params: { adminId: uCookie.adminId }
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
                alert(e);
            });
}]);