/**
 * Created by lost on 2016/3/16.
 */
App.controller('TeacherEditController',['$scope','$stateParams',function($scope,$stateParams){
    $scope.teacherId=$stateParams.teacherId;
}]);