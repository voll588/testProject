/**
 * Created by lost on 2016/3/25.
 */
App.controller("InterestListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','ngDialog',function($rootScope,$scope,$filter,$http,$cookieStore,$state,ngDialog){

    $scope.interestList={};

    $rootScope.checkUser();

    $scope.serviceUrl=$rootScope.serviceUrl+'/interestList';

    //添加
    $scope.addInterest=function(){
        return $state.go('app.interestAdd');
    };

    $scope.delInterest=function(int){

        ngDialog.openConfirm({
            template: "<p>确定要删除所选兴趣班?</p><div><button type='button' class='btn btn-default btn-confirm' ng-click='closeThisDialog(0)'>取消</button><button type='button' class='btn btn-primary' ng-click='confirm(1)'>确定</button></div>",
            plain: true,
            className: 'ngdialog-theme-default'
        }).then(function (value) {
            $scope.isLoading = true;
            $http({
                headers: {token: $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl + '/interestMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    interestEntity: int,
                    opType: 'del'
                }
            })
                .success(
                    function (response) {
                        if (response && response.code == 0) {
                            $scope.isLoading = false;
                            $scope.searchInt();
                        }
                        else if (response && response.code != 0) {
                            alert($rootScope.getErMsge(response.code));
                            $scope.isLoading = false;
                            $state.go("login");
                        }
                        $scope.isLoading = false;
                    })
                .error(
                    function (e) {
                        alert('操作失败.');
                        $scope.isLoading = false;
                    });
        });
    };

    $scope.searchContent='';
    //查询
    $scope.searchInt=function() {
        var params = '';

        if ($scope.searchContent) {
            params = {
                adminId: $rootScope.loginUser.adminId,
                stuId: $scope.searchContent,
                cursor: ($scope.pageIndex - 1) * $scope.pageCount,
                offset: $scope.pageCount
            };
        }
        else {
            params = {
                adminId: $rootScope.loginUser.adminId,
                cursor: ($scope.pageIndex - 1) * $scope.pageCount,
                offset: $scope.pageCount
            };
        }

        $scope.isLoading = true;

        $scope.getDate(params, $scope.serviceUrl, function (response) {
            if (response && response.code == 0) {
                $scope.interestList = response.list;
                $scope.dataCount = response.count;
                $scope.pageCalc();
                $scope.isLoading = false;
            }
            else if (response && response.code != 0) {
                alert($rootScope.getErMsge(response.code));
                $scope.isLoading = false;
                $state.go("login");
            }
            $scope.isLoading = false;
        }, function (e) {
            alert('数据获取失败.');
            $scope.isLoading = false;
        });
    };


    //编辑
    $scope.editInterest=function(interestName){
      return $state.go('app.interestEdit',{interestName:interestName});
    };


    $scope.feeList =[];
    //获取费用 列表
    $scope.getFeeList=function(){
        $scope.isLoading = true;

        $http({
            headers: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $rootScope.serviceUrl+'/feeList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.feeList = response.list;
                        $scope.isLoading = false;
                    }
                    else if (response && response.code != 0) {
                        alert($rootScope.getErMsge(response.code));
                        $scope.isLoading = false;
                        $state.go("login");
                    }
                    $scope.isLoading = false;
                })
            .error(
                function (e) {
                    alert('费用信息加载失败.');
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

        $scope.searchInt();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = $scope.pageLastIndex;
        $scope.searchInt();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.searchInt();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.searchInt();
    };

    //每页显示数量
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.searchInt();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.searchInt();
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

    $scope.getFeeList();
    $scope.searchInt();


}
]);
