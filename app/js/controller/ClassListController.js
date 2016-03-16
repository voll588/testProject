/**
 * Created by lost on 2016/3/14.
 */

App.controller("ClassListController",['$rootScope','$scope','$filter','$http','$cookieStore','Notify','$state',function($rootScope,$scope,$filter,$http,$cookieStore,Notify,$state){

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/classList';

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

    //基础数据初始化
    $scope.init=function(){
    //老师列表;
        $scope.initTeachers();
    //状态?
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
                        $scope.teacherSelecter=response.teacherList;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function(e){
                    alert("无法获取老师信息.");
                });
    };

    $scope.teacherSelecter=[{id:1,"name":"王老师"},{id:2,"name":"李老师"},{id:3,"name":"张老师"},{id:4,"name":"赵老师"}];
    $scope.teacherSelected='';

    $scope.classSatesSelecter=[{id:1,"name":"在读"},{id:2,"name":"毕业"}];
    $scope.classStatesSelected='';


    $scope.isLoading = false;

    //显示编辑状态
    $scope.showEditRow=function(e){
        e.$show();
    };
    //取消编辑状态
    $scope.cancelEditRow=function(e){
        e.$cancel();
    };

    //check checkClassName
    $scope.checkClassName=function(data){
        if(!data) {
            return "班级名称不能为空";
        }
    };

    $scope.checkClassNum=function(data){
        if(!data) {
            return "输入格式不正确";
        }
    };


    //check checkTeacher
    $scope.checkTeacher=function(data){
        if(!data){
            return "请选择老师";
        }
    };

    //check checkTeacher
    $scope.classStates=function(data){
        if(!data){
            return "请选择状态";
        }
    };

    //保存编辑
    $scope.saveEditRow=function(cla) {

        $scope.isLoading = true;

        $http({
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $rootScope.loginUser.adminId,
                adminRoleId: $rootScope.loginUser.adminRoleId,
                adminEntity: cla,
                opType: 'update'
            }
        })
            .success(
                function (respon) {
                    if (respon.code == 0) {
                        Notify.alert(
                            '<em class="fa fa-check"></em>班级信息更新成功!',
                            {status: 'info', pos:'bottom-center'}
                        );
                        //$scope.loadUserList();
                    }
                })
            .error(
                function (e) {
                    alert(e);
                });
    };




    //新增
    $scope.newClass={className:'',classNum:'',teacherId:-1};

    $scope.addClass = function(){

        if($scope.newClassForm.$valid){

            $scope.isLoading = true;

            $scope.newClass.teacherId =  $scope.teacherSelecter.id;

            $http({
                method: 'POST',
                url: $scope.serviceUrl,
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    adminRoleId: $rootScope.loginUser.adminRoleId,
                    adminEntity: $scope.newClass,
                    opType: 'add'
                }
            })
                .success(
                    function(respon) {
                        if (respon&&respon.code == 0) {
                            Notify.alert(
                                '<em class="fa fa-check"></em>班级添加成功!',
                                {status: 'info', pos:'bottom-center'}
                            );
                            $scope.newClass = '';
                            $scope.teacherSelected = '';

                            $scope.newClassForm.className.$dirty=false;
                            $scope.newClassForm.classNum.$dirty=false;
                            $scope.newClassForm.inputeTeacher.$dirty=false;

                            $scope.loadUserList();
                        }
                        else{
                            alert(code);
                        }
                    })
                .error(
                    function(e){
                        alert(e);
                    });
        }else{
            $scope.newClassForm.className.$dirty=true;
            $scope.newClassForm.classNum.$dirty=true;
            $scope.newClassForm.inputeTeacher.$dirty=true;
        }
    };







    //filter 格式化角色

    $scope.showTeacherName= function(cla){
        if(cla.teacherId)
        {
            var selected = $filter('filter')($scope.teacherSelecter,cla.teacherId,'id');
            return selected.length ? selected[0].name:'';
        }
    };

    //filter 格式化角色

    $scope.showStateName= function(cla){
        if(cla.classState)
        {
            var selected = $filter('filter')($scope.classSatesSelecter,cla.classState,'id');
            return selected.length ? selected[0].name:'';
        }
    };

    //加载全部user
    $scope.loadUserList=function(){
        $http({
            method: 'POST',
            url: $scope.serviceUrl+'/adminList',
            params: {
                adminId: $scope.loginUser.adminId
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.adminList=response.adminList;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function(e){
                    alert(e);
                    //$scope.newClass='';
                    //$scope.roleSelected='';
                });
    };

    $scope.loadUserList();


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
}]);