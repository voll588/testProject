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
        $state.go('app.feeEdit',{feeId:feeId});
    };
    
    $scope.del= function (fee) {
        $scope.isLoading = true;
        $http({
            method: 'POST',
            url: $rootScope.serviceUrl+'/feeMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                psEntity: fee,
                opType: 'del'
            }
        })
            .success(
                function(response) {
                    if (response && response.code == 0) {
                        $scope.isLoading = false;
                        $scope.getFeeList();
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

    $scope.showState=function(psState){
        if(psState){
            return '正常';
        }else
        {
            return '失效';
        }
    };

    $scope.showFeeType=function(psType){
        if(psType === 'main'){
            return '基本费用';
        }else
        {
            return '兴趣班费用';
        }
    };

    $scope.getFeeList();


}
]);