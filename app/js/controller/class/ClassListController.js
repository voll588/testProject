/**
 * Created by lost on 2016/3/14.
 */

App.controller("ClassListController",['$rootScope','$scope','$filter','$http','$cookieStore','Notify','$state',function($rootScope,$scope,$filter,$http,$cookieStore,Notify,$state){

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/classList';

    $scope.classlist={};

    //获取老师列表
    $scope.initTeachers=function(){
        $scope.isLoading = true;
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
                        $scope.searchCla();
                        $scope.isLoading = false;
                    }
                    $scope.isLoading = false;
                })
            .error(
                function(e){
                    alert("无法获取老师信息.");
                    $scope.isLoading = false;
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
        alert('毕业');
        /*
        $http({
            method: 'POST',
            url: $rootScope.serviceUrl + '/classMge',
            params: {
                adminId: $scope.loginUser.adminId,
                classEntity: cla,
                opType: 'complete'
            }
        })
            .success(
                function (respon) {
                    if (respon.code == 0) {
                        $scope.initList();
                    }
                })
            .error(
                function (e) {
                    alert(e);
                });
                */
    };

    //删除
    $scope.removePerson=function(cla) {
        $scope.isLoading = true;
        cla.classState = 0;

        $http({
            method: 'POST',
            url: $rootScope.serviceUrl+'/classMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                classEntity: cla,
                opType: 'update'
            }
        })
            .success(
                function (response) {
                    if(response&& response.code==0){

                    }
                    else if(response && response.code == 1){
                        alert(response.errorMessage);
                    }
                    $scope.initTeachers();
                    $scope.isLoading = false;
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

    $scope.searchContent='';
    //查询班级
    $scope.searchCla=function(){
        var params = '';

        if($scope.searchContent){
            params = {
                adminId: $rootScope.loginUser.adminId,
                stuId:$scope.searchContent,
                cursor:($scope.pageIndex-1) * $scope.pageCount,
                offset:$scope.pageCount
            };
        }
        else{
            params = {adminId: $rootScope.loginUser.adminId,
                cursor:($scope.pageIndex-1) * $scope.pageCount,
                offset: $scope.pageCount
            };
        }

        $scope.isLoading = true;

        $scope.getDate(params,$scope.serviceUrl,function(response){
            $scope.classlist = response.list;
            $scope.dataCount = response.count;
            $scope.pageCalc();
            $scope.isLoading = false;
        },function(e){
            alert('数据获取失败.');
            $scope.isLoading = false;
        });
    };



    //分页查询
    $scope.dataCount = 0;//数据总数
    $scope.pageCount = 10;//每页显示10条数据
    $scope.pageIndex = 1; //当前页数
    $scope.pageLastIndex = 1;//总页数
    $scope.pageStartNum = 1;//当前页开始序号
    $scope.pageFirstDisable = true;//首页
    $scope.pagePrevDisable = true;//上一页
    $scope.pageNextDisable = true;//下一页
    $scope.pageLastDisable = true;//尾页

    $scope.pageCalc= function () {

        $scope.pageStartNum = ($scope.pageIndex-1) * $scope.pageCount + 1;

        $scope.pageLastIndex = Math.ceil($scope.dataCount/$scope.pageCount);

        if($scope.dataCount < $scope.pageCount)
        {
            $scope.pageFirstDisable = true;//首页
            $scope.pagePrevDisable = true;//上一页
            $scope.pageNextDisable = true;//下一页
            $scope.pageLastDisable = true;//尾页
        }

        if($scope.dataCount - ($scope.pageIndex * $scope.pageCount)>0)
        {
            $scope.pageNextDisable = false;//下一页
            $scope.pageLastDisable = false;//尾页
        }
        else
        {
            $scope.pageNextDisable = true;//下一页
            $scope.pageLastDisable = true;//尾页
        }
        if((($scope.pageIndex-1) * $scope.pageCount + 1) > $scope.pageCount)
        {
            $scope.pageFirstDisable = false;//首页
            $scope.pagePrevDisable = false;//上一页
        }
        else
        {
            $scope.pageFirstDisable = true;//首页
            $scope.pagePrevDisable = true;//上一页
        }

        if($scope.pageIndex == 1)
        {
            $scope.pageFirstDisable = true;//首页
            $scope.pagePrevDisable = true;//上一页
        }

    };

    //首页
    $scope.firstPage = function(){
        $scope.pageIndex = 1; //当前页数
        $scope.pageStartNum = 1;//当前页开始序号

        $scope.initTeachers();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = $scope.pageLastIndex;
        $scope.initTeachers();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.initTeachers();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.initTeachers();
    };
    //每页显示数量改变
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.initTeachers();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.initTeachers();
    };

    //分页获取数据
    $scope.getDate=function(params,url,successFun,errorFun){
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: url,
            params:params
        })
            .success(
                function (response) {
                    if (response && response.code == 0 && successFun) {
                        successFun(response);
                    }
                })
            .error(
                function (e) {
                    errorFun(e);
                });
    };



    $scope.initTeachers();
}]);