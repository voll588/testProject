/**
 * Created by lost on 2016/3/16.
 */
App.controller('TeacherEditController',['$rootScope','$scope','$stateParams','$http','$state',function($rootScope,$scope,$stateParams,$http,$state){

    $scope.checkUser();

    $scope.teacherName=$stateParams.teacherName;

    $scope.teacher={};


    //根据Name 获取 Teacher
    $scope.getTeacherByTeacherName=function(){

        if(!$scope.teacherName){
            alert('参数错误.');
            return;
        }
        $scope.isLoading = true;

        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $scope.serviceUrl + '/teacherList',
            params: {
                adminId: $rootScope.loginUser.adminId,
                teacherName:$scope.teacherName
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.teacher = response.list[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                    $scope.isLoading = false;
                });
    };

    $scope.saveTeh=function(){
        if($scope.addForm.$valid){
            $scope.isLoading =true;

            $http({
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl+'/teacherMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    teacherEntity: $scope.teacher,
                    opType:  'update'
                }
            })
                .success(
                    function (response) {
                        if (response && response.code == 0) {
                            $scope.goBack();
                        }
                    })
                .error(
                    function (e) {
                        alert('操作失败..');
                        $scope.isLoading = false;
                    });
        }
    };

    $scope.goBack=function(){
        $state.go('app.teacherList');
    };


    //图片上传 begin
    $scope.reset = function() {
        $scope.myImage        = '';
        $scope.myCroppedImage = '';
        $scope.imgcropType    = "square";
    };

    $scope.reset();

    var handleFileSelect=function(evt) {
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
            });
        };
        if(file)
            reader.readAsDataURL(file);
    };

    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
    //图片上传 end




    $scope.getTeacherByTeacherName();
}]);