/**
 * Created by lost on 2016/3/26.
 */
App.controller("FeeAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','FileUploader',function($rootScope,$scope,$filter,$http,$cookieStore,$state,FileUploader) {

    $scope.checkUser();

    $scope.fee={};

    $scope.goBack = function(){
        return $state.go('app.feeList');
    };

    $scope.saveFee=function(){
        if($scope.addForm.$valid){
            $scope.isLoading = true;
            $scope.fee.psType = 'other';
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl+'/feeMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    psEntity: $scope.fee,
                    opType: 'add'
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

}
]);
