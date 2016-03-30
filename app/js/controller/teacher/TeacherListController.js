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
                        $scope.searchTec();
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
            $scope.teacherList = response.list;
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

        $scope.searchTec();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = pageLastIndex;
        $scope.searchTec();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.searchTec();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.searchTec();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.searchTec();
    };
    //每页显示数量
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.searchTec();
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





    //加载数据
    $scope.searchTec();


}
]);