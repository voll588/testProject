/**
 * Created by lost on 2016/3/29.
 */
App.controller("FoodController",['$rootScope','$scope','$http','$cookieStore','$state',function($rootScope,$scope,$http,$cookieStore,$state) {

    $rootScope.checkUser();

    $scope.food={};

    $scope.getFoodWeek = function() {
        $scope.isLoading = true;
        $http({
            url: $rootScope.serviceUrl + '/foodWeek',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.food = response.foodList[0];
                        $scope.isLoading = false;
                    }
                }
            )
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                }
            )

    };



    $scope.updateFood = function(){

    };


    $scope.getFoodWeek();




}]);