/**
 * Created by lost on 2016/3/26.
 */
App.controller("AdviceListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state) {

    $rootScope.checkUser();

    $scope.adviceList=[];

    $scope.showClient=function(cType){
        if(cType === 0){
            return 'android';
        }
        else if(cType === 1){
            return 'ios'
        }
        else{
            return 'unknow';
        }

    };
    
    
    $scope.getAdviceList= function () {

        $scope.isLoading = true;
        $http({
            method: 'POST',
            url: $rootScope.serviceUrl+'/adviceList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response.code == 0) {
                        $scope.adviceList = response.list;
                    }
                    $scope.isLoading =false;
                })
            .error(
                function (e) {
                    alert(e);
                    $scope.isLoading = false;
                });
    }


    $scope.getAdviceList();
}
]);