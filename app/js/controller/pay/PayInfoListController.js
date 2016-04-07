/**
 * Created by lost on 2016/4/5.
 */
App.controller("PayInfoListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){


    $scope.payInfoList=[];

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/payInfoList';

    $scope.exportReport = function(){
            window.open($rootScope.serviceUrl + '/reportList?adminId='+$rootScope.loginUser.adminId);
        /*$scope.isLoading = true;
        $http({
            headers: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl + '/reportList',
            params:{adminId: $rootScope.loginUser.adminId}
        })
            .success(
                function (response) {
                    $scope.isLoading = false;
                })
            .error(
                function (e) {
                    alert('导出失败.');
                    $scope.isLoading = false;
                });
*/

    };

    $scope.searchContent='';
    //查询
    $scope.searchPayInfo=function(){
        var params = '';

        if($scope.searchContent){
            params = {
                adminId: $rootScope.loginUser.adminId,
                studentId:$scope.searchContent,
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
            $scope.payInfoList =response.list;
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

        $scope.searchPayInfo();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = $scope.pageLastIndex;
        $scope.searchPayInfo();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.searchPayInfo();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.searchPayInfo();
    };
    //每页显示数量改变
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.searchPayInfo();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.searchPayInfo();
    };

    //分页获取数据
    $scope.getDate=function(params,url,successFun,errorFun){
        $http({
            headers: {token: $rootScope.loginUser.token},
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

    $scope.searchPayInfo();
}]);