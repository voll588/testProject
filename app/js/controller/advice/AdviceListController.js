/**
 * Created by lost on 2016/3/26.
 */
App.controller("AdviceListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state) {

    $rootScope.checkUser();

    $scope.adviceList=[];

    $scope.showClient=function(cType){
        if(cType === 0){
            return 'android';
        }
        else if(cType === 1){
            return 'ios'
        }
        else{
            return 'unknow';
        }

    };
    
    
    $scope.getAdviceList= function () {

        $scope.isLoading = true;
        var params =
        {
            adminId: $rootScope.loginUser.adminId,
            cursor:($scope.pageIndex-1) * $scope.pageCount,
            offset: $scope.pageCount
        };
        $scope.getDate(params,$rootScope.serviceUrl+'/adviceList',function(response){
            $scope.adviceList = response.list;
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

        $scope.getAdviceList();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = $scope.pageLastIndex;
        $scope.getAdviceList();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.getAdviceList();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.getAdviceList();
    };
    //每页显示数量改变
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.getAdviceList();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.getAdviceList();
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


    $scope.getAdviceList();
}
]);