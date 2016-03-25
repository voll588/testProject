/**
 * Created by lost on 2016/3/26.
 */
App.controller("InterestAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','ngDialog',function($rootScope,$scope,$filter,$http,$cookieStore,$state,ngDialog) {

    $scope.checkUser();

    $scope.interest={};

    $scope.goBack=function(){
        $state.go('app.interestList');
    }
}
]);