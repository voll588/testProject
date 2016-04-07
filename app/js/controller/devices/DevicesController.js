/**
 * Created by lost on 2016/3/26.
 */
App.controller("DevicesController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$route','ngDialog',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$route,ngDialog){


    $rootScope.checkUser();

    $scope.addVideo = function(){
        $state.go('app.devicesAdd');
    };

    $scope.editDevice=function(dId){
        $state.go('app.devicesEdit',{dId:dId});
    };

    $scope.delDevice=function(dev){

        ngDialog.openConfirm({
            template: "<p>确定要删除所选设备?</p><div><button type='button' class='btn btn-default btn-confirm' ng-click='closeThisDialog(0)'>取消</button><button type='button' class='btn btn-primary' ng-click='confirm(1)'>确定</button></div>",
            plain: true,
            className: 'ngdialog-theme-default'
        }).then(function (value) {
            $scope.isLoading = true;
            $http({
                headers: {token: $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl + '/videoMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    videoEntity: dev,
                    opType: 'del'
                }
            })
                .success(
                    function (response) {
                        if (response && response.code == 0) {
                            $scope.isLoading = false;
                            $scope.getVideoList();
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
        });
    };

    $scope.imgUrl = $rootScope.imgUrl;

    $scope.videoList = [];
    $scope.getVideoList=function() {
        $scope.isLoading = true;
        var params =
        {
            adminId: $rootScope.loginUser.adminId,
            cursor: ($scope.pageIndex - 1) * $scope.pageCount,
            offset: $scope.pageCount
        };
        $scope.getDate(params, $rootScope.serviceUrl + '/videoList', function (response) {
            if (response && response.code == 0) {
                $scope.videoList = response.list;
                $scope.dataCount = response.count;
                $scope.pageCalc();
                $scope.isLoading = false;
            }
            else if (response && response.code != 0) {
                alert($rootScope.getErMsge(response.code));
                $scope.isLoading = false;
                $state.go("login");
            }
        }, function (e) {
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

        $scope.getVideoList();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = $scope.pageLastIndex;
        $scope.getVideoList();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.getVideoList();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.getVideoList();
    };
    //每页显示数量改变
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.getVideoList();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.getVideoList();
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
                    if (successFun) {
                        successFun(response);
                    }
                })
            .error(
                function (e) {
                    errorFun(e);
                });
    };

    $scope.getVideoList();
}]);
