/**
 * Created by lost on 2016/3/5.
 */
/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginFormController', ['$rootScope','$scope', '$http', '$state', '$cookieStore','$cookies',function($rootScope,$scope, $http, $state, $cookieStore,$cookies) {

    //$rootScope.loginUser=[];
    ///*  TestCode

    //$cookieStore.put('loginUser', {adminId:1,adminRoleId:1,nickName:'Admin',token:'a'});
    //$state.go('app.dashboard');
    //return;
    //*/

    // bind here all data from the form
    $scope.account = {};
    // place the message if something goes wrong
    $scope.authMsg = '';

    $scope.login = function() {
        $scope.authMsg = '';

        if($scope.loginForm.$valid) {
            $http({
                method: 'POST',
                url: $scope.serviceUrl + '/login',
                params: {userName: $scope.account.username, password: $scope.account.password}
                })
                .success(function (response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if (response && response.code == 0) {
                        //$rootScope.loginUser.adminId = response.adminId;
                        //$rootScope.loginUser.nickName = response.nickName;
                        //$rootScope.loginUser.roleId = response.roleId;
                        //$rootScope.loginUser.roleList = response.roleList;
                        //$rootScope.loginUser.token = response.token;

                        //var expireDate = new Date();
                        //expireDate.setDate(expireDate.getHours()+8);
                        //$cookieStore.put('loginCookie',$scope.loginUser,{'expires': expireDate});
                        $cookieStore.put('loginUser', {adminId:response.adminId,nickName:response.nickName,adminRoleId:response.roleId,token:response.token});
                        $state.go('app.dashboard');
                    }
                    else {
                        $scope.authMsg = $rootScope.getErMsge(response.code);
                    }
                })
                .error(function (x) {
                    $scope.authMsg = '服务请求失败,请稍后再试.';
                    //$cookieStore.put('loginUser',{name:'a',id:2});
                    //var tsc =  $cookieStore.get('loginUser');
                });
        }
        else {
            // set as dirty if the user click directly to login so we show the validation messages
            $scope.loginForm.account_username.$dirty = true;
            $scope.loginForm.account_password.$dirty = true;
        }
    };

}]);
