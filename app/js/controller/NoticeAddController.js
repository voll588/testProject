/**
 * Created by lost on 2016/3/16.
 */
App.controller("NoticeAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    $rootScope.checkUser();

    $scope.notice={
        noticeName:	$rootScope.loginUser.nickName
    };

    $scope.serviceUrl = $rootScope.serviceUrl + '/noticeMge';


    $scope.sendNotice=function(){
        if($scope.noticeForm.$valid){
            alert(1);
        }
        else{
            alert(0);
            return;
        }
        //发送通知
        $scope.isLoading =true;
        $http({
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $scope.loginUser.adminId,
                adminRoleId: $scope.loginUser.adminRoleId,
                opType:'Send',
                noticeEntity:$scope.notice
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
                });
    };

    $scope.saveNotice=function(){

    };


    $scope.goBack=function(){

    };
}]);