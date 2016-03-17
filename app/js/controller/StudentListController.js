/**
 * Created by lost on 2016/3/10.
 */
App.controller("StudentListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    $scope.studentList={};
            /*  TestCode
    $scope.isLoading=false;
    var students = [
        {
            stuId:'NJ2016010001',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010002',
            stuName:'张三',
            stuGender:0,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010003',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010004',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010005',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010006',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010007',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010008',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010009',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010010',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010011',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010012',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010013',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010014',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010015',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010016',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010017',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010018',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010019',
            stuName:'张三',
            stuGender:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuStatus:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        }
    ];
    $scope.studentList = students;

            */


    $scope.isLoading = true;
    $rootScope.checkUser();

    $scope.serviceUrl=$rootScope.serviceUrl+'/studentList';

    //学生信息Lis查询
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
                        $scope.studentList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert(e);
                });
    };

    //班级
    $scope.classSatesSelecter =[];
    $scope.initClassList=function(){
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
                        $scope.classSatesSelecter = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('班级信息获取失败.');
                });
    };

    $scope.initList();


    $scope.showStuDetail=function(stuNum){
        return $state.go('app.stuentDetail',{stuId:stuNum});
    }

    //注销
    $scope.cancel=function(stu){
      alert('注销');
    };

    //暂停
    $scope.pause=function(stu){
        alert('暂停');
    };

    //
    $scope.reduce=function(stu){
        alert('降级');
    };

    //删除
    $scope.del=function(stu){
        alert('删除');
    };













}
]);
