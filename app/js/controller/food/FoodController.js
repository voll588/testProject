/**
 * Created by lost on 2016/3/29.
 */
App.controller("FoodController",['$rootScope','$scope','$http','$cookieStore','$state',function($rootScope,$scope,$http,$cookieStore,$state) {

    $rootScope.checkUser();

    $scope.food={};

    $scope.getFoodWeek = function() {
        $scope.isLoading = true;
        $http({
            headers: {token: $rootScope.loginUser.token},
            url: $rootScope.serviceUrl + '/foodWeek',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.food = response.list;
                        getFoodList($scope.food);
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
        $scope.isLoading = true;
        saveFoods();
        $http({
            headers: {token: $rootScope.loginUser.token},
            url: $rootScope.serviceUrl + '/foodWeek',
            params: {
                adminId: $rootScope.loginUser.adminId,
                foodEntity:$scope.food
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.isLoading = false;
                    }
                }
            )
            .error(
                function (e) {
                    alert('数据更新失败.');
                    $scope.isLoading = false;
                }
            )
    };

    $scope.foodMonB='';    $scope.foodMonL='';    $scope.foodMonD='';
    $scope.foodTueB='';    $scope.foodTueL='';    $scope.foodTueD='';
    $scope.foodWedB='';    $scope.foodWedL='';    $scope.foodWedD='';
    $scope.foodThuB='';    $scope.foodThuL='';    $scope.foodThuD='';
    $scope.foodFriB='';    $scope.foodFriL='';    $scope.foodFriD='';

    $scope.foodList=[];

    function getFoodList(responseFood){
        if(responseFood){
            var monFoods = responseFood.foodMon.split("@");
            createFoods(0,"周一套餐",monFoods);

            var tueFoods = responseFood.foodTue.split("@");
            createFoods(1,"周二套餐",tueFoods);

            var wedFoods = responseFood.foodWed.split("@");
            createFoods(2,"周三套餐",wedFoods);

            var thuFoods = responseFood.foodThu.split("@");
            createFoods(3,"周四套餐",thuFoods);

            var friFoods = responseFood.foodFri.split("@");
            createFoods(4,"周五套餐",friFoods);
        }
    }

    function createFoods(index,day,foods){
        if(index > -1 && foods && foods.length > 0) {
            $scope.foodList[index]= {
                                        Day:day,
                                        foods:
                                            {
                                                foodB:foods[0],
                                                foodL:foods[1],
                                                foodD:foods[2]
                                            }
                                    };
        }
    }

    function saveFoods() {
        $scope.food.foodMon = $scope.foodList[0].foods.foodB + "@" + $scope.foodList[0].foods.foodL + "@" + $scope.foodList[0].foods.foodD;
        $scope.food.foodTue = $scope.foodList[1].foods.foodB + "@" + $scope.foodList[1].foods.foodL + "@" + $scope.foodList[1].foods.foodD;
        $scope.food.foodWed = $scope.foodList[2].foods.foodB + "@" + $scope.foodList[2].foods.foodL + "@" + $scope.foodList[2].foods.foodD;
        $scope.food.foodThu = $scope.foodList[3].foods.foodB + "@" + $scope.foodList[3].foods.foodL + "@" + $scope.foodList[3].foods.foodD;
        $scope.food.foodFri = $scope.foodList[4].foods.foodB + "@" + $scope.foodList[4].foods.foodL + "@" + $scope.foodList[4].foods.foodD;
    }

    $scope.getFoodWeek();

}]);