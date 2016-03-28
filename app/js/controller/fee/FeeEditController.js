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

    $scope.getFeeById();



}
]);
