/**
 * Created by lost on 2016/3/23.
 */
/**
 * Created by lost on 2016/3/22.
 */
App.controller("ClassEditController",['$rootScope','$scope','$filter','$http','$cookieStore','$state','$stateParams',function($rootScope,$scope,$filter,$http,$cookieStore,$state,$stateParams){

    $rootScope.checkUser();

    $scope.className=$stateParams.claName;

    $scope.class={};

    //老师
    $scope.teacher={};
    $scope.teacherList=[];

    //状态
    $scope.state={};
    $scope.stateList=[{id:1,name:'正常'},{id:0,name:'删除'}];
    $scope.state.selected = $filter('filter')($scope.stateList,$scope.class.classState,'id')[0];




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

    $scope.getClassDetail= function () {
        if(!$scope.className){
            alert('参数错误.');
            return;
        }

        $http({
            method: 'POST',
            url: $scope.serviceUrl+'/classList',
            params: {
                adminId: $rootScope.loginUser.adminId,
                className:$scope.className
            }
        })
            .success(
                function(response){
                    if(response && response.code==0){
                        $scope.class=response.list[0];
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
                    opType: 'update'
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
    $scope.getClassDetail();
}
]);