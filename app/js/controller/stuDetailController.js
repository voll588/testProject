/**
 * Created by lost on 2016/3/10.
 */
App.controller("StuDetailController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){

    ///*  TestCode
    $scope.isLoading=false;

    //*/
    $scope.stuNum = $stateParams.stuId;

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