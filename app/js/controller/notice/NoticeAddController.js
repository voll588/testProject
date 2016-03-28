/**
 * Created by lost on 2016/3/16.
 */
App.controller("NoticeAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','Notify',function($rootScope,$scope,$filter,$http,$cookieStore,$state,Notify){

    $rootScope.checkUser();

    $scope.notice={
        noticeName:	$rootScope.loginUser.nickName
    };

    $scope.noticeType=[];
    $scope.noticeTypeList=[{typeId:1,typeName:'校园消息'},{typeId:2,typeName:'班级消息'}];

    $scope.serviceUrl = $rootScope.serviceUrl + '/noticeMge';


    $scope.sendNotice=function(){

        if($scope.noticeForm.$valid){
            $scope.notice.noticeType = $scope.noticeType.selected.typeId;
            //发送通知
            $scope.isLoading =true;
            $http({
                method: 'POST',
                url: $rootScope.serviceUrl+'/sendMsg',
                params: {
                    adminId: $scope.loginUser.adminId,
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
                            $scope.goBack();
                        }else if(response.code == 1){
                            Notify.alert(
                                '<em class="fa fa-check"></em>'+response.errorMessage,
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
        }
        else{
            //alert(0);
        }
    };

    $scope.saveNotice=function(){

    };


    //返回
    $scope.goBack=function(){
        $state.go('app.noticeList');
    };
}]);