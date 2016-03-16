/**
 * Created by lost on 2016/3/15.
 */
App.controller("TeacherListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/teacherList';

    ///*  TestCode
    $scope.isLoading=false;

    var teachers=[
        {
        teacherId:1,
        teacherName:'赵老师',
        teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
        teacherPic:'app/img/user/01.jpg',
        teacherPhone:'13809871028',
        teacherVideo:''},
        {
            teacherId:2,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/02.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:3,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/03.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:4,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/04.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:51,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/05.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:6,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/06.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:7,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/07.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:8,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/08.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:9,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/09.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''},
        {
            teacherId:10,
            teacherName:'赵老师',
            teacherInfo:'全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。全国十佳老师，优秀教育工作者。',
            teacherPic:'app/img/user/10.jpg',
            teacherPhone:'13809871028',
            teacherVideo:''}
    ];

    $scope.teacherList=teachers;
    //*/


    $scope.showTehDetail=function(teacherId){
        return $state.go('app.teacherEdit',{teacherId:teacherId});
    };


    $scope.delTeacher=function(){
      alert('删除');
    };












}
]);