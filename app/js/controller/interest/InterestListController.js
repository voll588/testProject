/**
 * Created by lost on 2016/3/25.
 */
App.controller("InterestListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','ngDialog',function($rootScope,$scope,$filter,$http,$cookieStore,$state,ngDialog){

    $scope.interestList={};

    $rootScope.checkUser();

    $scope.serviceUrl=$rootScope.serviceUrl+'/interestList';

    //兴趣班信息Lis查询
    $scope.initList=function() {
        $scope.isLoading = true;
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.interestList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                });
    };


    //添加
    $scope.addInterest=function(){
        return $state.go('app.interestAdd');
    };

    $scope.delInterest=function(int){
        $scope.isLoading = true;
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/interestMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                interestEntity:int,
                opType:'del'
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.isLoading = false;
                        $scope.initList();
                    }
                })
            .error(
                function (e) {
                    alert('操作失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.searchContent='';
    //查询
    $scope.searchInt=function(){
        var params = '';

        if($scope.searchContent){
            params = {adminId: $rootScope.loginUser.adminId, interestName:$scope.searchContent};
        }
        else{
            params = {adminId: $rootScope.loginUser.adminId};
        }

        $scope.isLoading = true;
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $scope.serviceUrl,
            params:params
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.interestList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                });
    };


    //编辑
    $scope.editInterest=function(interestName){
      return $state.go('app.interestEdit',{interestName:interestName});
    };


    $scope.feeList =[];
    //获取费用 列表
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
                    alert('费用信息加载失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.getFeeList();
    $scope.initList();


}
]);
