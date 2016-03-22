/**
 * Created by lost on 2016/3/14.
 */

App.controller("ClassListController",['$rootScope','$scope','$filter','$http','$cookieStore','Notify','$state',function($rootScope,$scope,$filter,$http,$cookieStore,Notify,$state){

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/classList';

    $scope.classlist={};

    /*
    $scope.classlist=[
    {
        classId: 1,
        className: '大一班',
        teacherId: 1,
        classNum: 20,
        classState: 1,
        classTime: '2016-01-01'
    },
    {
        classId: 2,
        className: '大二班',
        teacherId: 1,
        classNum: 20,
        classState: 1,
        classTime: '2016-01-01'
    },
    {
        classId: 3,
        className: '大三班',
        teacherId: 1,
        classNum: 20,
        classState: 1,
        classTime: '2016-01-01'
    },
    {
        classId: 4,
        className: '大四班',
        teacherId: 1,
        classNum: 20,
        classState: 1,
        classTime: '2016-01-01'
    },
    {
        classId: 5,
        className: '大五班',
        teacherId: 1,
        classNum: 20,
        classState: 1,
        classTime: '2016-01-01'
    },
    {
        classId: 6,
        className: '大六班',
        teacherId: 1,
        classNum: 20,
        classState: 1,
        classTime: '2016-01-01'
    },
    {
        classId: 7,
        className: '大七班',
        teacherId: 1,
        classNum: 20,
        classState: 1,
        classTime: '2016-01-01'
    }
];
*/




    $scope.isLoading = false;

    $scope.initList=function() {
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
                        $scope.classlist = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert(e);
                });
    };




    //获取老师列表
    $scope.initTeachers=function(){
        $http({
            method: 'POST',
            url: $rootScope.serviceUrl + '/teacherList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.teacherSelecter=response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function(e){
                    alert("无法获取老师信息.");
                });
    };


    $scope.teacherSelected='';

    $scope.classSatesSelecter=[{id:1,"name":"正常"},{id:0,"name":"删除"}];
    $scope.classStatesSelected='';


    $scope.isLoading = false;


    //filter 格式化老师名称

    $scope.showTeacherName= function(cla){
        var selected = $filter('filter')($scope.teacherSelecter,{teacherId:cla.teacherId});
        return selected.length ? selected[0].teacherName:'';

    };

    //filter 格式化状态

    $scope.showStateName= function(cla){
        var selected = $filter('filter')($scope.classSatesSelecter,cla.classState,'id');
        return selected.length ? selected[0].name:'';
    };


    //升级
    $scope.upgradeClass=function(cla){
        alert("升级");
    };

    //毕业
    $scope.completeClass=function(cla){
        alert("毕业");
    };

    //删除
    $scope.removePerson=function(cla) {
        alert("删除");
        $scope.isLoading = true;

        $http({
            method: 'POST',
            url: $scope.serviceUrl + '/adminMge',
            params: {
                adminId: $scope.loginUser.adminId,
                adminRoleId: $scope.loginUser.adminRoleId,
                adminEntity: cla,
                opType: 'del'
            }
        })
            .success(
                function (respon) {
                    if (respon.code == 0) {
                        //$scope.loadUserList();
                    }
                })
            .error(
                function (e) {
                    alert(e);
                });
    };



    //新增
    $scope.addClass=function(){
        $state.go('app.classAdd');
    };

    $scope.editCal=function(calName){
        $state.go('app.classEdit',{claName:calName});
    };


    $scope.initTeachers();
    $scope.initList();
}]);