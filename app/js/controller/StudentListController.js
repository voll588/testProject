/**
 * Created by lost on 2016/3/10.
 */
App.controller("StudentListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','ngDialog',function($rootScope,$scope,$filter,$http,$cookieStore,$state,ngDialog){

    $scope.studentList={};
            /* TestCode

    var students = [
        {
            stuId:'NJ2016010001',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010002',
            stuName:'张三',
            stuGender:0,
            classId:2,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010003',
            stuName:'张三',
            stuGender:1,
            classId:2,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:2,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010004',
            stuName:'张三',
            stuGender:1,
            classId:3,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:3,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010005',
            stuName:'张三',
            stuGender:1,
            classId:4,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010006',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:2,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010007',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010008',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:3,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010009',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010010',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:2,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010011',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:2,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010012',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010013',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010014',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010015',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:2,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010016',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010017',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010018',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:0,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:1,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        },
        {
            stuId:'NJ2016010019',
            stuName:'张三',
            stuGender:1,
            classId:1,
            className:'大一班',
            stuIsPay:1,
            stuMasterId:2,
            teacherName:'王老师',
            stuParent:'隔壁老王',
            stuState:0,
            phone:13891888076,
            cTime:'2016-01-01',
            endTime:'2019-01-01'
        }
    ];
    $scope.studentList = students;
    //return;
            */

    $rootScope.checkUser();

    $scope.serviceUrl=$rootScope.serviceUrl+'/studentList';

    //学生信息Lis查询
    $scope.initList=function() {
        $scope.isLoading = true;
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
                    $scope.isLoading = false;
                });
    };


    //班级
    $scope.allClass =[];
    $scope.classList=function(){
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
                        $scope.allClass = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('班级信息获取失败.');
                });
    };


    //学生状态
    $scope.stateList=[{name:'已注销',value:0},{name:'正常',value:1},{name:'休学',value:2},{name:'毕业',value:3}];
    $scope.showState=function(state){
        var selectState = $filter('filter')($scope.stateList,state,'value');
        return selectState.length ? selectState[0].name : 'Empty';
    };





    $scope.showStuDetail=function(stuNum){
        return $state.go('app.stuentDetail',{stuId:stuNum,opType:'Edit'});
    };

    //注销
    $scope.cancel=function(stu){
        if(!stu){
            alert('数据错误');
            return;
        }

        $http({
            //headers: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/studentMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                studentEntity:stu,
                opType:'del'
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.initList();
                    }
                })
            .error(
                function (e) {
                    alert('操作失败..');
                });
    };

    //休学
    $scope.pause=function(stu){
        //alert('休学');
        if(!stu){
            alert('数据错误');
            return;
        }

        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/studentMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                studentEntity:stu,
                opType:'stop'
            }
        })
            .success(
                function (code) {
                    if (code && code == 0) {
                        $scope.initList();
                    }
                })
            .error(
                function (e) {
                    alert('操作失败..');
                });
    };

    //恢复
    $scope.recover=function(){
        alert('恢复');
    };

    //降级
    $scope.reduce=function(stu,allClass){
        if(!allClass){
            alert('班级信息错误.');
            return;
        }

        ngDialog.open({
            template:'studentReduce',
            controller:['$rootScope','$scope','$http','$filter',function($rootScope,$scope,$http,$filter){
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
                $scope.classList = allClass;
                $scope.class = [];
                $scope.class.selected = $filter('filter')($scope.classList,stu.classId,'classId')[0];

                $scope.saveReduce=function(){
                    stu.classId = $scope.class.selected.classId;
                    alert(stu.className);
                };
            }]
        });
    };

    //添加学生
    $scope.addStud=function(){
        return $state.go('app.stuentDetail',{opType:'Add'});
    };

    $scope.searchContent='';
    //查询
    $scope.searchStu=function(){
        //alert($scope.searchContent);
        //return;
        var params = '';

        if($scope.searchContent){
            params = {adminId: $rootScope.loginUser.adminId, stuId:$scope.searchContent};
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
                        $scope.studentList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                });
    };

    //查看家长
    $scope.parents= function (stuId) {
        ngDialog.open({
            template:'studentParents',
            controller:['$rootScope','$scope','$http',function($rootScope,$scope,$http){
                var parents=[
                    {
                        parentId:1,
                        parentName:'王爸爸',
                        parentRelation:'爸爸',
                        parentPhone:'13813813838'
                    },
                    {
                        parentId:1,
                        parentName:'王妈妈',
                        parentRelation:'妈妈',
                        parentPhone:'13813813838'
                    },
                    {
                        parentId:1,
                        parentName:'王爷爷',
                        parentRelation:'爷爷',
                        parentPhone:'13813813838'
                    },
                    {
                        parentId:1,
                        parentName:'王奶奶',
                        parentRelation:'奶奶',
                        parentPhone:'13813813838'
                    }
                ];
                $scope.parentsList=parents;
            }]
        });
    };

    //添加家长
    $scope.parentsAdd= function (stuId) {
        ngDialog.open({
            template:'studentParents',
            controller:['$rootScope','$scope','$http',function($rootScope,$scope,$http){
                var parents=[
                    {
                        parentId:1,
                        parentName:'王爸爸',
                        parentRelation:'爸爸',
                        parentPhone:'13813813838'
                    },
                    {
                        parentId:1,
                        parentName:'王妈妈',
                        parentRelation:'妈妈',
                        parentPhone:'13813813838'
                    },
                    {
                        parentId:1,
                        parentName:'王爷爷',
                        parentRelation:'爷爷',
                        parentPhone:'13813813838'
                    },
                    {
                        parentId:1,
                        parentName:'王奶奶',
                        parentRelation:'奶奶',
                        parentPhone:'13813813838'
                    }
                ];
                $scope.parentsList=parents;
            }]
        });
    };


    //生成邀请码
    $scope.inviteCode= function (stuId) {
        ngDialog.open({
            template:'studentInviteCode',
            controller:['$rootScope','$scope','$http',function($rootScope,$scope,$http){
                if(!stuId){
                    $scope.stuInviteCode = '参数错误!';
                }
                $http({
                    header: {token: $rootScope.loginUser.token},
                    method: 'POST',
                    url: $rootScope.serviceUrl+'/inkey',
                    params: {
                        adminId: $rootScope.loginUser.adminId,
                        studentId:stuId
                    }
                })
                    .success(
                        function (response) {
                            if (response && response.code == 0) {
                                $scope.stuInviteCode = response.inkey;
                            }
                        })
                    .error(
                        function (e) {
                            $scope.stuInviteCode='邀请码生成失败.';
                        });


            }]
            //className:'ngdialog-theme-default'
        });

    };







    $scope.initList();
    $scope.classList();










}
]);
