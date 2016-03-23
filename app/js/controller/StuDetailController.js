/**
 * Created by lost on 2016/3/10.
 */
App.controller("StuDetailController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){

    $rootScope.checkUser();

    $rootScope.isLoading = true;
    $scope.opType = '';
    $scope.stuId = $stateParams.stuId;
    $scope.optType=$stateParams.opType;

    $scope.isAdd = false;


    if(!$scope.optType || ( $scope.optType=='Edit'&&!$scope.stuId )){
        alert('参数错误.');
    }
    else{
        if($scope.optType =='Add'){
            $scope.isAdd = true;
        }
    }

    //
    $scope.getStuDetail=function(){
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

                        //学生状态
                        $scope.state=[];
                        $scope.stateList=[{name:'已注销',value:0},{name:'正常',value:1},{name:'休学',value:2},{name:'毕业',value:3}];
                        //学生状态
                        $scope.state.selected = $filter('filter')($scope.stateList,{value:$scope.stu.stuState})[0];
                        //班级选择
                        $scope.class.selected = $filter('filter')($scope.classList,{classId:$scope.stu.classId})[0];
                        $rootScope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    /*
                     $scope.stu={
                     stuId:'NJ2016010001',
                     stuName:'张三',
                     stuGender:1,
                     classId:1,
                     className:'大一班',
                     teacherId:2,
                     teacherName:'王老师',
                     stuParent:'隔壁老王',
                     stuState:0,
                     phone:13891888076,
                     cTime:'2016-01-01',
                     endTime:'2019-01-01'
                     }
                     */
                    $scope.isLoading =false;
                });
    };


    //返回
    $scope.goBack=function(){
        $state.go('app.studentList');
    };

    //保存
    $scope.saveStu=function(){
        if($scope.addForm.$valid){
            $scope.isLoading = true;

            $scope.stu.classId = $scope.class.selected.classId;
            if(!$scope.isAdd) {
                $scope.stu.stuState = $scope.state.selected.value;
            }

            $http({
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl+'/studentMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    studentEntity: $scope.stu,
                    opType: $scope.isAdd ? 'add':'update'
                }
            })
                .success(
                    function (response) {
                        if (response && response.code == 0) {
                            $scope.goBack();
                        }
                    })
                .error(
                    function (e) {
                        alert('操作失败..');
                        $scope.isLoading = false;
                    });

        }
        else{
            $scope.addForm.stuName.$dirty=true;
            $scope.addForm.phone.$dirty=true;
        }
    };

    //班级
    /*
     var tempClassTemp=[
     {classId: 1,className: '大一班',teacherId: 1,classNum: 20,classState: 1,classTime: '2016-01-01'},
     {classId: 2,className: '大二班',teacherId: 1,classNum: 20,classState: 1,classTime: '2016-01-01'},
     {classId: 3,className: '大三班',teacherId: 1,classNum: 20,classState: 1,classTime: '2016-01-01'},
     {classId: 4,className: '大四班',teacherId: 1,classNum: 20,classState: 1,classTime: '2016-01-01'},
     {classId: 5,className: '大五班',teacherId: 1,classNum: 20,classState: 1,classTime: '2016-01-01'},
     {classId: 6,className: '大六班',teacherId: 1,classNum: 20,classState: 1,classTime: '2016-01-01'},
     {classId: 7,className: '大七班',teacherId: 1,classNum: 20,classState: 1,classTime: '2016-01-01'}
     ];
     $scope.classList=tempClassTemp;
     */

    //班级
    $scope.classList=[];
    $scope.getClassList=function(){
        $scope.isLoading = true;
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/classList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.classList = response.list;

                        //加载学生信息
                        if(!$scope.isAdd){
                            $scope.getStuDetail();
                        }

                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('班级信息获取失败.');
                });
    };


    $scope.stu = {};
    $scope.class = {};
    //加载班级
    $scope.getClassList();




}
]);
