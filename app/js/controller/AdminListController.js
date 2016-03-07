/**
 * Created by lost on 2016/3/5.
 */

App.controller("AdminListController",['$rootScope','$scope','$filter','$http','$cookieStore',function($rootScope,$scope,$filter,$http,$cookieStore){

    $scope.loginUser = $cookieStore.get('loginUser');

    if(!$scope.loginUser) {
        $state.go("login");
    }
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


    //保存编辑
    $scope.saveEditRow=function(admin) {

        $scope.editRowVisible = false;

        $http({
            method: 'POST',
            url: $scope.serviceUrl + '/adminMge',
            params: {
                adminId: $scope.loginUser.adminId,
                adminRoleId: $scope.loginUser.adminRoleId,
                adminEntity: admin,
                opType: 'update'
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
                    alert(e);
                });
    };




    //新增
    $scope.newAdmin={adminName:'',adminUserName:'',adminPassword:'',adminRoleId:-1};

    $scope.addPerson = function(){

        if($scope.newUserForm.$valid){

            $scope.newAdmin.adminRoleId =  $scope.roleSelected.value;

            $http({
                method: 'POST',
                url: $scope.serviceUrl+'/adminMge',
                params: {
                    adminId: $scope.loginUser.adminId,
                    adminRoleId: $scope.loginUser.adminRoleId,
                    adminEntity: $scope.newAdmin,
                    opType: 'add'
                }
            })
            .success(
                function(respon) {
                    if (respon&&respon.code == 0) {
                        $scope.newAdmin = '';
                        $scope.roleSelected = '';
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
        }
    };

    //删除
    $scope.removePerson=function(admin) {
        $http({
            method: 'POST',
            url: $scope.serviceUrl + '/adminMge',
            params: {
                adminId: $scope.loginUser.adminId,
                adminRoleId: $scope.loginUser.adminRoleId,
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
                    alert(e);
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
        $http({
            method: 'POST',
            url: $scope.serviceUrl+'/adminList',
            params: {
                adminId: $scope.loginUser.adminId
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.adminList=response.adminList;
                    }
                })
            .error(
                function(e){
                    alert(e);
                    //$scope.newAdmin='';
                    //$scope.roleSelected='';
                });
    };


    var adminTable = [{
        "adminId": 860,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":4,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }, {
        "adminId": 861,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":3,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }, {
        "adminId": 862,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":2,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }, {
        "adminId": 863,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":4,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }, {
        "adminId": 864,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":1,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }, {
        "adminId": 865,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":1,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }, {
        "adminId": 866,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":2,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }, {
        "adminId": 867,
        "adminUserName": "Superman",
        "adminName": "Yoda",
        "adminRoleId":3,
        "adminRoulName":"aaa",
        "cTime":"2016-1-1"
    }
    ];

    //$scope.adminList = adminTable;

    $scope.loadUserList();
}]);