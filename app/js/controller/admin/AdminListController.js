/**
 * Created by lost on 2016/3/5.
 */

App.controller("AdminListController",['$rootScope','$scope','$filter','$http','$cookieStore','Notify','$state',function($rootScope,$scope,$filter,$http,$cookieStore,Notify,$state){


    $rootScope.checkUser();

    $scope.editRowVisible = false;
    //显示编辑状态
    $scope.showEditRow=function(e){
        e.$show();
        $scope.editRowVisible = true;
    };
    //取消编辑状态
    $scope.cancelEditRow=function(e){
        e.$cancel();
        $scope.editRowVisible = false;
    };

    //check Name
    $scope.checkName=function(data){
        if(!data) {
            return "姓名不能为空";
        }
    };

    //check UserName
    $scope.checkUserName=function(data){
        if(!data) {
            return "登录账号不能为空";
        }
    };

    //check Pwd
    $scope.checkPwd=function(data){
        if(data){
            var regx =new RegExp("^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]");
            if(!regx.exec(data)) {
                return "密码格式不正确";
            }
        }
    };

    //check Role
    $scope.checkRole=function(data){
        if(!data){
            return "请选择角色";
        }
    };

    //保存编辑
    $scope.saveEditRow=function(admin) {

        $scope.editRowVisible = false;

        $scope.isLoading = true;

        $http({
            method: 'POST',
            url: $scope.serviceUrl + '/adminMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                adminRoleId: $rootScope.loginUser.adminRoleId,
                adminEntity: admin,
                opType: 'update'
            }
        })
            .success(
                function (respon) {
                    if (respon.code == 0) {
                        Notify.alert(
                            '<em class="fa fa-check"></em>更新用户成功!',
                            {status: 'info', pos:'bottom-center'}
                        );
                        $scope.loadUserList();
                    }
                })
            .error(
                function (e) {
                    alert(e);
                });
    };




    //新增
    $scope.newAdmin={adminName:'',adminUserName:'',adminPassword:'',adminRoleId:-1};

    $scope.addPerson = function(){

        if($scope.newUserForm.$valid){

            $scope.isLoading = true;

            $scope.newAdmin.adminRoleId =  $scope.roleSelected.value;

            $http({
                method: 'POST',
                url: $scope.serviceUrl+'/adminMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    adminRoleId: $rootScope.loginUser.adminRoleId,
                    adminEntity: $scope.newAdmin,
                    opType: 'add'
                }
            })
            .success(
                function(respon) {
                    if (respon&&respon.code == 0) {
                        Notify.alert(
                            '<em class="fa fa-check"></em>新增用户成功!',
                            {status: 'info', pos:'bottom-center'}
                        );
                        $scope.newAdmin = '';
                        $scope.roleSelected = '';

                        $scope.newUserForm.adminUserName.$dirty=false;
                        $scope.newUserForm.adminName.$dirty=false;
                        $scope.newUserForm.adminPwd.$dirty=false;
                        $scope.newUserForm.inputeRole.$dirty=false;

                        $scope.loadUserList();
                    }
                    else{
                        alert(code);
                    }
                })
            .error(
                function(e){
                    alert(e);
            });
        }else{
            $scope.newUserForm.adminUserName.$dirty=true;
            $scope.newUserForm.adminName.$dirty=true;
            $scope.newUserForm.adminPwd.$dirty=true;
            $scope.newUserForm.inputeRole.$dirty=true;
        }
    };

    //新增
    $scope.addAdmin=function(){
        $state.go('app.adminAdd');
    };

    //删除
    $scope.removePerson=function(admin) {

        $scope.isLoading = true;

        $http({
            method: 'POST',
            url: $scope.serviceUrl + '/adminMge',
            params: {
                adminId: $rootScope.loginUser.adminId,
                adminRoleId: $rootScope.loginUser.adminRoleId,
                adminEntity: admin,
                opType: 'del'
            }
        })
            .success(
                function (respon) {
                    if (respon.code == 0) {
                        $scope.loadUserList();
                    }
                })
            .error(
                function (e) {
                    alert('操作失败.');
                });
    };



    $scope.roleSelecter=[{"name":"超级管理员","value":1},{"name":"园长","value":2},{"name":"老师","value":3},{"name":"财务","value":4}];
    $scope.roleSelected='';

    //filter 格式化角色

    $scope.showRoleName= function(admin){
        if(admin.adminRoleId)
        {
            var selected = $filter('filter')($scope.roleSelecter,admin.adminRoleId,'value');
            return selected.length ? selected[0].name:'';
        }
    };

    //加载全部user
    $scope.loadUserList=function(){
        $scope.isLoading = true;
        $http({
            method: 'POST',
            url: $scope.serviceUrl+'/adminList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.adminList=response.adminList;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function(e){
                    alert('数据加载失败.');
                    $scope.isLoading =false;
                });
    };


    //搜索
    $scope.searchAdmin=function(){

        var params = '';

        if($scope.searchContent){
            params = {adminId: $rootScope.loginUser.adminId, className:$scope.searchContent};
        }
        else{
            params = {adminId: $rootScope.loginUser.adminId};
        }

        $scope.isLoading = true;
        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $scope.serviceUrl+'/adminList',
            params:params
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.adminList = response.list;
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.loadUserList();
}]);