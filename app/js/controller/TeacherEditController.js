/**
 * Created by lost on 2016/3/16.
 */
App.controller('TeacherEditController',['$rootScope','$scope','$stateParams',function($rootScope,$scope,$stateParams){

    $rootScope.checkUser();

    $scope.teacherId=$stateParams.teacherId;

    //服务地址
    $scope.serviceUrl = $rootScope.serviceUrl + '/teacherList';

    $scope.editTeacher={};

    //根据ID 获取 Teacher
    $scope.getTeacherByTeacherId=function(){

        if(!$scope.teacherId){
            alert('参数错误.');
            return;
        }

        $http({
            header: {token: $rootScope.loginUser.token},
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $rootScope.loginUser.adminId,
                stuId:$scope.stuId
            }
        })
            .success(
                function (response) {
                    if (response && response.code == 0) {
                        $scope.stu = response.list[0];
                        $scope.isLoading = false;
                    }
                })
            .error(
                function (e) {
                    alert('数据获取失败.');
                });
    };


    $scope.saveTeacher=function(){
      alert('保存');
    };

    $scope.goback=function(){
        alert('返回');
    };


    //图片上传-------------
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

    //图片上传-------------
}]);