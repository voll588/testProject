/**
 * Created by lost on 2016/3/5.
 */

App.controller("AdminListController",['$rootScope','$scope','$filter','$http',function($rootScope,$scope,$filter,$http){
    //新增
    $scope.newAdmin={};

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
                    //getNewlsit
                    //$adminList.add()
                )
                .error(function(e){alert(e)});
            //alert(11111);
        }else{
            $scope.newUserForm.adminUserName.$dirty=true;
        }


    };
//修改
    $scope.modifyPerson=function(index){
        alert(index);
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


    $scope.adminList = [{
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
}]);