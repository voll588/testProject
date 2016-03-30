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
    $scope.loadUserList=function() {
        $scope.isLoading = true;

        $scope.getDate(
            {
                adminId: $rootScope.loginUser.adminId,
                cursor: ($scope.pageIndex - 1) * $scope.pageCount,
                offset: $scope.pageCount
            },
            $scope.serviceUrl + '/adminList',
            function (response) {
                if (response && response.code == 0) {
                    $scope.adminList = response.adminList;
                    $scope.dataCount = response.count;
                    $scope.pageCalc();
                    $scope.isLoading = false;
                }
            }, function (e) {
                alert('数据加载失败.');
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

        $scope.loadUserList();
    };
    //尾页
    $scope.lastPage = function(){
        $scope.pageIndex = Math.ceil($scope.dataCount/$scope.pageCount);
        $scope.loadUserList();
    };
    //下一页
    $scope.nextPage = function(){
        $scope.pageIndex += 1; //当前页数

        $scope.loadUserList();
    };
    //上一页
    $scope.prevPage = function() {
        if ($scope.pageIndex > 1)
            $scope.pageIndex -= 1; //当前页数

        $scope.loadUserList();
    };

    //跳页
    $scope.pageIndexChange = function(){
        if($scope.pageIndex<1 || $scope.pageIndex > $scope.pageLastIndex)
        {
            return;
        }
        $scope.loadUserList();
    };
    //每页显示数量
    $scope.pageCountNumChange = function(){
        $scope.pageIndex = 1;
        $scope.pageStartNum = 1;
        $scope.loadUserList();
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



    $scope.loadUserList();
}]);