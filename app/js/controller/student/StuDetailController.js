/**
 * Created by lost on 2016/3/10.
 */
App.controller("StuDetailController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){

    $rootScope.checkUser();

    $scope.opType = '';
    $scope.stuId = $stateParams.stuId;
    $scope.optType=$stateParams.opType;

    $scope.isAdd = false;

    //学生类型
    $scope.stuType={};
    $scope.stuTypeList=[{typeId:'01',typeName:'普通'},{typeId:'02',typeName:'业主'}];

    if(!$scope.optType || ( $scope.optType=='Edit'&&!$scope.stuId )){
        alert('参数错误.');
    }
    else{
        if($scope.optType =='Add'){
            $scope.isAdd = true;
            $scope.stuType.selected = {typeId:'01',typeName:'普通'};
        }
    }

    //
    $scope.getStuDetail=function(){
        $rootScope.isLoading = true;
        $http({
            headers: {token: $rootScope.loginUser.token},
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
                        $scope.class.selected = $filter('filter')($scope.classList,{className:$scope.stu.className})[0];
                        //学生类型
                        $scope.stuType.selected = $filter('filter')($scope.stuTypeList,{typeId:$scope.stu.stuType})[0];
                        $rootScope.isLoading = false;
                    }
                    else if (response && response.code != 0) {
                        alert($rootScope.getErMsge(response.code));
                        $scope.isLoading = false;
                        $state.go("login");
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
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

            $scope.stu.stuType = $scope.stuType.selected.typeId;

            $http({
                headers: {token: $rootScope.loginUser.token},
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
                            $scope.isLoading = false;
                            $scope.goBack();
                        }
                        else if (response && response.code != 0) {
                            alert($rootScope.getErMsge(response.code));
                            $scope.isLoading = false;
                            $state.go("login");
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
    $scope.classList=[];
    $scope.getClassList=function(){
        $scope.isLoading = true;
        $http({
            headers: {token: $rootScope.loginUser.token},
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
                    else if (response && response.code != 0) {
                        alert($rootScope.getErMsge(response.code));
                        $scope.isLoading = false;
                        $state.go("login");
                    }
                })
            .error(
                function (e) {
                    alert('班级信息获取失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.stu = {};
    $scope.class = {};
    //加载班级
    $scope.getClassList();




}
]);
