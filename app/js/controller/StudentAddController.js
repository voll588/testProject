/**
 * Created by lost on 2016/3/10.
 */
App.controller("StudentAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){

    ///*  TestCode
    $scope.isLoading=false;
    //*/
    $scope.stuNum = '';


    //返回
    $scope.goBack=function(){
        $state.go('app.studentList');
    };

   //日期控件
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