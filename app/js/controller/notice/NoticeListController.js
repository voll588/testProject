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

    $scope.delNotice=function(notice){

    };

    $scope.initList=function(){

        //获取数据
        $scope.isLoading =true;
        $http({
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response.code == 0) {
                        $scope.noticeList = response.list;
                    }
                    $scope.isLoading =false;
                })
            .error(
                function (e) {
                    alert(e);
                    $scope.isLoading = false;
                });
    };

    $scope.noticeTypeList=[{typeId:0,typeName:'系统消息'},{typeId:1,typeName:'校园消息'},{typeId:2,typeName:'班级消息'}];

    $scope.showTypeName=function(noticeType){
        var nType = $filter('filter')($scope.noticeTypeList,{typeId:noticeType})[0];
        return nType.typeName;
    };

    $scope.initList();
}]);