/**
 * Created by lost on 2016/3/15.
 */
App.controller("TeacherListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/teacherList';

    $scope.teacherList={};

    $scope.initList=function() {
        $scope.isLoading=true;
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
                        $scope.teacherList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据加载失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.showTehDetail=function(tName){
        return $state.go('app.teacherEdit',{teacherName:tName});
    };

    $scope.delTeacher=function(teacher){
        $scope.isLoading = true;
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/teacherMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                teacherEntity:teacher,
                opType : 'del'

            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.teacherList = response.list;
                        $scope.initList();
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert(e);
                    $scope.isLoading = false;
                });
    };

    $scope.addStud=function(){
        $state.go('app.teacherAdd');
    };

    //搜索
    $scope.searchTec=function(){
        var params = '';

        if($scope.searchContent){
            params = {adminId: $rootScope.loginUser.adminId, teacherName:$scope.searchContent};
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
                        $scope.teacherList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                });
    };

    //加载数据
    $scope.initList();


}
]);