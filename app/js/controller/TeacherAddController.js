/**
 * Created by lost on 2016/3/16.
 */
App.controller('TeacherAddController',['$rootScope','$scope','$state','$http',function($rootScope,$scope,$state,$http){

    $scope.checkUser();

    $scope.teacher={};

    $scope.saveTeh=function(){
        if($scope.addForm.$valid){
            $scope.isLoading =true;

            $scope.teacher.teacherPic='Resource/thumb/01.jpg';
            $scope.teacher.teacherVideo='Resource/video/test1.mp4';

            $http({
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token': $rootScope.loginUser.token},
                method: 'POST',
                url: $rootScope.serviceUrl+'/teacherMge',
                params: {
                    adminId: $rootScope.loginUser.adminId,
                    teacherEntity: $scope.teacher,
                    opType:  'add'
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
}]);