/**
 * Created by lost on 2016/3/26.
 */
App.controller("FeeListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state) {

    $rootScope.checkUser();

    $scope.feeList=[];


    $scope.addFee=function(){
        return $state.go('app.feeAdd');
    };

    $scope.editFee=function(feeId){
        $state.go('app.feeEdit',{feeId:feeId});
    };
    
    $scope.del= function (fee) {
        $scope.isLoading = true;
        $http({
            method: 'POST',
            url: $rootScope.serviceUrl+'/feeMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                psEntity: fee,
                opType: 'del'
            }
        })
            .success(
                function(response) {
                    if (response && response.code == 0) {
                        $scope.isLoading = false;
                        $scope.getFeeList();
                    }
                    else{
                        alert(code);
                    }
                    $scope.isLoading = false;
                })
            .error(
                function(e){
                    alert('操作失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.getFeeList=function(){
        $scope.isLoading = true;

        var params =
        {
            adminId: $rootScope.loginUser.adminId,
            cursor:($scope.pageIndex-1) * $scope.pageCount,
            offset: $scope.pageCount
        };
        $scope.getDate(params,$rootScope.serviceUrl+'/feeList',function(response){
            $scope.feeList = response.list;
            $scope.dataCount = response.count;
            $scope.pageCalc();
            $scope.isLoading = false;
        },function(e){
            alert('数据获取失败.');
            $scope.isLoading = false;
        });
    };

    $scope.showState=function(psState){
        if(psState){
            return '正常';
        }else
        {
            return '失效';
        }
    };

    $scope.showFeeType=function(psType){
        if(psType === 'main'){
            return '基本费用';
        }else
        {
            return '兴趣班费用';
        }
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

        $scope.getFeeList();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = $scope.pageLastIndex;
        $scope.getFeeList();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.getFeeList();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.getFeeList();
    };
    //每页显示数量改变
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.getFeeList();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.getFeeList();
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


    $scope.getFeeList();


}
]);