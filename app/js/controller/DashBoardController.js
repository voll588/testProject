/**
 * Created by lost on 2016/3/5.
 */
App.controller("DashBoardController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    ///*  TestCode

    //$cookieStore.put('loginUser', {adminId:1,adminRoleId:1,token:'a'});
    //$state.go('app.dashboard');
    //$scope.infos={};
    //return;
    //*/

    $rootScope.checkUser();

    $scope.isLoading = true;

    //$scope.loginUser = $cookieStore.get('loginUser');
    //if(!$scope.loginUser) {
    //    $state.go("Login");
    //}

    $http({
        header: {token: $rootScope.loginUser.token},
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
                alert(e);
            });
}]);