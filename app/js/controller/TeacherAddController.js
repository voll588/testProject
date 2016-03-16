/**
 * Created by lost on 2016/3/16.
 */
App.controller('TeacherAddController',['$rootScope','$scope','$stateParams',function($rootScope,$scope){

    $scope.checkUser();

    $scope.saveTeh=function(){
        alert('Save');
    };

    $scope.goBack=function(){
        alert('Go Back');
    };

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
}]);