/**
 * Created by lost on 2016/3/16.
 */
App.controller("NoticeListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){


    $scope.noticeList='';

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/noticeList';

    //发送通知
    $scope.sendNotice=function(notice){

        //发送通知
        $scope.isLoading =true;
        $http({
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $rootScope.loginUser.adminId,
                adminRoleId: $rootScope.loginUser.adminRoleId,
                opType:'Send',
                noticeEntity:notice
            }
        })
            .success(
                function (response) {
                    if (response.code == 0) {
                        Notify.alert(
                            '<em class="fa fa-check"></em>通知发送成功!',
                            {status: 'info', pos:'bottom-center'}
                        );
                    }
                    $scope.isLoading =false;
                })
            .error(
                function (e) {
                    alert(e);
                    $scope.isLoading =false;
                });
    };


    $scope.addNotice=function(){
        return $state.go('app.noticeAdd');
    };

    $scope.delNotice=function(notice){

    };

    $scope.initList=function(){

        //获取数据
        $scope.isLoading =true;


        var params =
        {
            adminId: $rootScope.loginUser.adminId,
            cursor:($scope.pageIndex-1) * $scope.pageCount,
            offset: $scope.pageCount
        };
        $scope.getDate(params,$scope.serviceUrl,function(response){
            $scope.noticeList = response.list;
            $scope.dataCount = response.count;
            $scope.pageCalc();
            $scope.isLoading = false;
        },function(e){
            alert('数据获取失败.');
            $scope.isLoading = false;
        });

    };

    $scope.noticeTypeList=[{typeId:0,typeName:'系统消息'},{typeId:1,typeName:'校园消息'},{typeId:2,typeName:'班级消息'}];

    $scope.showTypeName=function(noticeType){
        var nType = $filter('filter')($scope.noticeTypeList,{typeId:noticeType})[0];
        return nType.typeName;
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

        $scope.initList();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = $scope.pageLastIndex;
        $scope.initList();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.initList();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.initList();
    };
    //每页显示数量改变
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.initList();
    };
    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.initList();
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

    $scope.initList();
}]);