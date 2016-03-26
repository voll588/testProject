/**
 * Created by lost on 2016/3/26.
 */
App.controller("FeeListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state) {

    $rootScope.checkUser();

    $scope.feeList=[];


    $scope.addFee=function(){
        return $state.go('app.feeAdd');
    };

    $scope.editFee=function(feeId){
        
    };
    
    $scope.del= function (feeId) {
        
    };

    $scope.getFeeList=function(){
        $scope.isLoading = true;

        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/feeList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.feeList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据加载失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.getFeeList();


}
]);