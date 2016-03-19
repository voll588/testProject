/**
 * Created by lost on 2016/3/10.
 */
App.controller("StuDetailController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){


    $rootScope.isLoading = true;

    $rootScope.checkUser();

    $scope.stuId = $stateParams.stuId;

    $scope.stu={};

    $scope.getStuDetail=function(){

        if(!$scope.stuId){
            alert('参数错误.');
        }
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $scope.serviceUrl+'/studentList',
            params: {
                adminId: $rootScope.loginUser.adminId,
                stuId:$scope.stuId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.stu = response.list[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                });
    };

    //暂停
    $scope.pause=function(){
        alert('暂停');
    };

    //返回
    $scope.goBack=function(){
        $state.go('app.studentList');
    };

    //降级
    $scope.reduce=function(stu){
        alert('降级');
    };

    $scope.cancel=function(){
      alert('取消');
    };


    $scope.getStuDetail();

    $scope.today = function() {
        $scope.dt = new Date().toDateString();
    };

    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };





}
]);
