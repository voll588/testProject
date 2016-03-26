/**
 * Created by lost on 2016/3/22.
 */
App.controller("ClassAddController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){

    $rootScope.checkUser();

    $scope.class={};

    //老师
    $scope.teacher={};
    $scope.teacherList=[];



    $scope.initTeacherList=function(){

        $http({
            method: 'POST',
            url: $scope.serviceUrl+'/teacherList',
            params: {
                adminId: $rootScope.loginUser.adminId
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.teacherList=response.list;
                        $scope.teacher.selected = $filter('filter')($scope.teacherList,$scope.class.teacherId,'value')[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function(e){
                    alert(e);
                    $scope.isLoading =false;
                });
    };




    $scope.saveClass=function(){
        if($scope.addFrom.$valid && $scope.teacher.selected){
            $scope.isLoading = true;
            $scope.class.teacherId = $scope.teacher.selected.teacherId;

            $http({
                method: 'POST',
                url: $scope.serviceUrl+'/classMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    classEntity: $scope.class,
                    opType: 'add'
                }
            })
                .success(
                    function(response) {
                        if (response && response.code == 0) {
                            $scope.goBack();
                        }
                        else{
                            alert(code);
                        }
                        $scope.isLoading = false;
                    })
                .error(
                    function(e){
                        alert('添加失敗.');
                        $scope.isLoading = false;
                    });


        }
        else{
            $scope.addFrom.className.$dirty=true;
            $scope.addFrom.classNum.$dirty=true;
        }

    };



    $scope.goBack=function(){
        $state.go('app.classList')
    };

    $scope.initTeacherList();
}
]);