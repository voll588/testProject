/**
 * Created by lost on 2016/3/16.
 */
App.controller("NoticeListController",['$rootScope','$scope','$filter','$http','$cookieStore','$state',function($rootScope,$scope,$filter,$http,$cookieStore,$state){

    $scope.isLoading =false;
    $scope.loginUser='';
    $scope.noticeList='';


    var testList=[
        {
            noticeId:1,
            noticeName:'王叔叔',
            noticeSub:'我是蒋介石的儿子',
            noticeText:'你好，我是蒋介石的私生子，我在台湾有154亿被冻结了，而我现在困在湖南，又回不去，我现在急需7000流动资金，就能解冻我在台湾的资产，只要朋友你今天帮了我，我在台湾有军事部队，再给你12亿新台币，给你一个师长的位置坐，这是我参谋长的银行卡号：5321 6431 343311 441.',
            noticeTime:	'2016-03-15 08:00:30',
            noticeType:	'推送'
        },
        {
            noticeId:2,
            noticeName:'李伯伯',
            noticeSub:'我是希特勒',
            noticeText:'我是希特勒，其实我并没有死，我现在只需2000元人民币就能解冻我1000亿欧元的账号，你微信转账给我，明天我直接带部队攻过来，让你统领三军，微信号就是我手机.',
            noticeTime:	'2016-03-15 08:01:30',
            noticeType:	'更新'
        },
        {
            noticeId:3,
            noticeName:'张大爷',
            noticeSub:'我是孙悟空',
            noticeText:'你好，我是孙悟空我的金箍棒在地球丢了 你只需要向我账户汇款10000元人民币 让我打广告找回来 事成之后我教你72变.',
            noticeTime:	'2016-03-15 08:01:30',
            noticeType:	'广告'
        }
    ];

    $rootScope.checkUser();

    $scope.serviceUrl = $rootScope.serviceUrl + '/noticeList';

    $scope.sendNotice=function(notice){
        //发送通知
        $scope.isLoading =true;
        $http({
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $rootScope.loginUser.adminId,
                adminRoleId: $rootScope.loginUser.adminRoleId,
                opType:'Send',
                noticeEntity:notice
            }
        })
            .success(
                function (response) {
                    if (response.code == 0) {
                        Notify.alert(
                            '<em class="fa fa-check"></em>通知发送成功!',
                            {status: 'info', pos:'bottom-center'}
                        );
                    }
                    $scope.isLoading =false;
                })
            .error(
                function (e) {
                    alert(e);
                });
    };

    $scope.delNotice=function(notice){

    };

    $scope.init=function(){

        //获取数据
        $scope.isLoading =true;
        $http({
            method: 'POST',
            url: $scope.serviceUrl,
            params: {
                adminId: $rootScope.loginUser.adminId,
                adminRoleId: $rootScope.loginUser.adminRoleId
            }
        })
            .success(
                function (response) {
                    if (response.code == 0) {
                        $scope.noticeList = response.list;
                    }
                    $scope.isLoading =false;
                })
            .error(
                function (e) {
                    alert(e);
                });
    };
    $scope.noticeList = testList;
}]);