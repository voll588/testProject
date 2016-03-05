/**
 * Created by lost on 2016/3/5.
 */
/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginFormController', ['$rootScope','$scope', '$http', '$state', '$cookieStore',function($rootScope,$scope, $http, $state, $cookieStore) {

    // bind here all data from the form
    $scope.account = {};
    // place the message if something goes wrong
    $scope.authMsg = '';

    $scope.login = function() {
        $scope.authMsg = '';

        if($scope.loginForm.$valid) {
            $http({
                method: 'POST',
                url: $scope.serviceUrl+'/login',
                params: {userName: $scope.account.username, password: $scope.account.password}
            })
                .then(function(response) {
                    // assumes if ok, response is an object with some data, if not, a string with error
                    // customize according to your api
                    if ( response && response.status == 200 &&  response.data.code==0 ) {
                        $rootScope.loginUser.adminId =  response.data.adminId;
                        $rootScope.loginUser.nickName = response.data.nickName;
                        $rootScope.loginUser.roleId = response.data.roleId;
                        $rootScope.loginUser.roleList=response.data.roleList;

                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getHours()+8);
                        $cookieStore.put('loginCookie',$scope.loginUser.adminId,{'expires': expireDate});
                        $state.go('app.dashboard');
                    }else{
                        $scope.authMsg = '用户名或密码不正确,请重新登录.';
                    }
                }, function(x) {
                    $scope.authMsg = '服务请求失败,请稍后再试.';
                    $state.go('app.dashboard');
                });
        }
        else {
            // set as dirty if the user click directly to login so we show the validation messages
            $scope.loginForm.account_username.$dirty = true;
            $scope.loginForm.account_password.$dirty = true;
        }
    };

}]);
