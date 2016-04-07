/**
 * Created by lost on 2016/3/22.
 */
App.controller("AdminAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){

    $rootScope.checkUser();

    $scope.admin={};

    //角色
    $scope.role=[];
    $scope.roleList=[{"name":"园长","value":2},{"name":"老师","value":3},{"name":"财务","value":4}];
    $scope.role.selected = $filter('filter')($scope.roleList,$scope.admin.adminRoleId,'value')[0];







    $scope.saveAdmin=function(){
        if($scope.addFrom.$valid){
            $scope.isLoading = true;
            $scope.admin.adminRoleId = $scope.role.selected.value;

            $http({
                headers: {token: $rootScope.loginUser.token},
                method: 'POST',
                url: $scope.serviceUrl+'/adminMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    adminRoleId: $rootScope.loginUser.adminRoleId,
                    adminEntity: $scope.admin,
                    opType: 'add'
                }
            })
                .success(
                    function(response) {
                        if (response&&response.code == 0) {
                            $scope.isLoading = false;
                            $scope.goBack();
                        }
                        else if(response&& response.code!=0) {
                            alert($rootScope.getErMsge(response.code));
                            $scope.isLoading = false;
                            $state.go("login");
                        }
                        $scope.isLoading = false;
                    })
                .error(
                    function(e){
                        alert(e);
                        $scope.isLoading = false;
                    });


        }
        else{
            $scope.addFrom.adminUserName.$dirty=true;
            $scope.addFrom.adminName.$dirty=true;
            $scope.addFrom.adminPassword.$dirty=true;
        }

    };



    $scope.goBack=function(){
      $state.go('app.adminList')
    };
}
]);