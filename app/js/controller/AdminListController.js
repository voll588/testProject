/**
 * Created by lost on 2016/3/5.
 */

App.controller("AdminListController",['$rootScope','$scope','$filter','$http',function($rootScope,$scope,$filter,$http){

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
    $scope.saveEditRow=function(admin,index) {
        if ($scope.newUserForm.$valid) {
            $http({
                method: 'POST',
                url: $scope.serviceUrl + '/adminMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    adminEntity: {
                        adminUserName: $scope.newAdmin.adminUserName,
                        adminName: $scope.newAdmin.adminName,
                        adminPassword: $scope.newAdmin.adminPassword,
                        adminRoleId: $scope.roleSelected.value
                    },
                    opType: 'add'
                }
            })
                .success(
                    function () {
                        $scope.newAdmin = [];
                        //getNewlsit
                        $scope.newAdmin = '';
                        $scope.roleSelected = '';
                    })
                .error(
                    function (e) {
                        alert(e);
                        $scope.adminList = adminTable;
                        //$scope.newAdmin='';
                        //$scope.roleSelected='';
                    });
        }
    };




    //新增
    $scope.newAdmin='';

    $scope.addPerson = function(){
        if($scope.newUserForm.$valid){
            $http({
                method: 'POST',
                url: $scope.serviceUrl+'/adminMge',
                params: {
                        adminId:$rootScope.loginUser.adminId,
                        adminEntity:
                            {
                                adminUserName: $scope.newAdmin.adminUserName,
                                adminName: $scope.newAdmin.adminName,
                                adminPassword: $scope.newAdmin.adminPassword,
                                adminRoleId:$scope.roleSelected.value
                            },
                        opType:'add'
                        }
            })
            .success(
                function(){
                    $scope.newAdmin=[];
                    //getNewlsit
                    $scope.newAdmin='';
                    $scope.roleSelected='';
                })
            .error(
                function(e){
                    alert(e);
                    //$scope.newAdmin='';
                    //$scope.roleSelected='';
            });
        }else{
            $scope.newUserForm.adminUserName.$dirty=true;
        }
    };

    //删除
    $scope.removePerson=function(index){alert(index);};



    $scope.roleSelecter=[{"name":"超级管理员","value":1},{"name":"校长","value":2},{"name":"老师","value":3},{"name":"财务","value":4}];
    $scope.roleSelected='';

    //filter 格式化角色

    $scope.showRoleName= function(admin){
        if(admin.adminRoleId)
        {
            var selected = $filter('filter')($scope.roleSelecter,admin.adminRoleId,'value');
            return selected.length ? selected[0].name:'';
        }
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

    $scope.adminList = adminTable;
}]);