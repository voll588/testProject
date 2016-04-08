/**
 * Created by lost on 2016/3/5.
 */

/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
    ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar','$cookieStore','$http','ngDialog',
        function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar,$cookieStore,$http,ngDialog) {
            "use strict";

            // Setup the layout mode
            $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

            // Loading bar transition
            // -----------------------------------
            var thBar;
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if($('.wrapper > section').length) // check if bar container exists
                    thBar = $timeout(function() {
                        cfpLoadingBar.start();
                    }, 0); // sets a latency Threshold
            });
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                event.targetScope.$watch("$viewContentLoaded", function () {
                    $timeout.cancel(thBar);
                    cfpLoadingBar.complete();
                });
            });


            // Hook not found
            $rootScope.$on('$stateNotFound',
                function(event, unfoundState, fromState, fromParams) {
                    console.log(unfoundState.to); // "lazy.state"
                    console.log(unfoundState.toParams); // {a:1, b:2}
                    console.log(unfoundState.options); // {inherit:false} + default options
                });
            // Hook error
            $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error){
                    console.log(error);
                });
            // Hook success
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                    // display new view from top
                    $window.scrollTo(0, 0);
                    // Save the route title
                    $rootScope.currTitle = $state.current.title;
                });

            $rootScope.currTitle = $state.current.title;
            $rootScope.pageTitle = function() {
                var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
                document.title = title;
                return title;
            };

            // iPad may presents ghost click issues
            // if( ! browser.ipad )
            // FastClick.attach(document.body);

            // Close submenu when sidebar change from collapsed to normal
            $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
                if( newValue === false )
                    $rootScope.$broadcast('closeSidebarMenu');
            });

            // Restore layout settings
            if( angular.isDefined($localStorage.layout) )
                $scope.app.layout = $localStorage.layout;
            else
                $localStorage.layout = $scope.app.layout;

            $rootScope.$watch("app.layout", function () {
                $localStorage.layout = $scope.app.layout;
            }, true);


            // Allows to use branding color with interpolation
            // {{ colorByName('primary') }}
            $scope.colorByName = colors.byName;

            // Internationalization
            // ----------------------

            $scope.language = {
                // Handles language dropdown
                listIsOpen: false,
                // list of available languages
                available: {
                    'en':       'English',
                    'zh-cn':       '简体中文'
                },
                // display always the current ui language
                init: function () {
                    var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                    var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
                    $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
                },
                set: function (localeId, ev) {
                    // Set the new idiom
                    $translate.use(localeId);
                    // save a reference for the current language
                    $scope.language.selected = $scope.language.available[localeId];
                    // finally toggle dropdown
                    $scope.language.listIsOpen = ! $scope.language.listIsOpen;
                }
            };

            $scope.language.init();

            // Restore application classes state
            toggle.restoreState( $(document.body) );

            // cancel click event easily
            $rootScope.cancel = function($event) {
                $event.stopPropagation();
            };


            $scope.quit=function(){
                ngDialog.openConfirm({
                    template: "<p>确定退出后台管理系统?</p><div><button type='button' class='btn btn-default btn-confirm' ng-click='closeThisDialog(0)'>取消</button><button type='button' class='btn btn-primary' ng-click='confirm(1)'>确定</button></div>",
                    plain: true,
                    className: 'ngdialog-theme-default'
                }).then(function (value) {
                    $http({
                        headers: {token: $rootScope.loginUser.token},
                        method: 'POST',
                        url: $rootScope.serviceUrl+'/logout',
                        params: {
                            adminId: $rootScope.loginUser.adminId
                        }
                    })
                        .success(
                            function (response) {
                                if (response && response.code == 2) {
                                }
                            })
                        .error(
                            function (e) {
                                alert(e);
                            });

                    $cookieStore.remove('loginUser');
                    $cookieStore.remove('menuRole');
                    $state.go('login');
                });

            };

        }]);