/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'ui.utils'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', '$cookieStore',function ($rootScope, $state, $stateParams, $window, $templateCache,$cookieStore) {
  // Set reference to access them from any scope
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$storage = $window.localStorage;



    //$rootScope.serviceUrl = "http://192.168.1.105:8080/NJService/api/admin";
    $rootScope.serviceUrl = "http://voll588.imwork.net:32635/NJService/api/admin";
    $rootScope.imaUrl="http://voll588.imwork.net:32635/NJService/";
    //$rootScope.imaUrl="http://192.168.1.105:8080/NJService/";
    // Scope Globals
    // ----------------------------------- 
    $rootScope.app = {
      name: '牛津幼儿园',
      description: '牛津幼儿园后台管理系统',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: null
      },
      useFullLayout: false,
      hiddenFooter: false,
      viewAnimation: 'ng-fadeInUp'
    };

    $rootScope.getErMsge=function(code){
        var strMsg ='';
        switch (code) {
            case "1":
                strMsg = '系统错误,请求数据信息错误,请稍后再试.';
                break;
            case "2":
                strMsg = '登录信息验证失败,请重新登录';
                break;
            case "8":
                strMsg='用户名或密码错误.';
                break;
            case "30":
                strMsg='权限验证失败,请勿尝试非法操作.';
                break;
            default:
                strMsg='未知错误.';
                break;
        }

        return strMsg;
    };

    $rootScope.checkUser=function(){

        $rootScope.loginUser = $cookieStore.get('loginUser');
        if(!$rootScope.loginUser) {
            $state.go("login");
        }
    };


}]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('/login');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('modernizr', 'icons')
    })
    .state('app.dashboard', {
        url: '/dashboard',
        title: 'Dashboard View',
        templateUrl: helper.basepath('dashboard.html'),
        resolve: helper.resolveFor('loaders.css')
    })
    .state('app.submenu', {
        url: '/submenu',
        title: 'Submenu',
        templateUrl: helper.basepath('submenu.html')
    })
	
	.state('login',{
		url:'/login',
        title:'Login',
		templateUrl:'app/login.html'
	})
    .state('app.adminList',{
        url:'/admin',
        title:"Admin",
        templateUrl:helper.basepath('admin/adminList.html'),
        resolve: helper.resolveFor('xeditable','loaders.css')
      })
      .state('app.adminAdd',{
          url:'/admin/add',
          title:"Admin",
          templateUrl:helper.basepath('admin/adminAdd.html'),
          resolve: helper.resolveFor('loaders.css','ui.select')
      })
      .state('app.studentList',{
          url:'/student',
          title:'Student',
          templateUrl:helper.basepath('student/studentList.html'),
          resolve: helper.resolveFor('ngDialog','loaders.css','ui.select')
      })
      .state('app.stuentDetail',{
          url:'/student/detail/opType/{opType}/stu/{stuId}',
          title:'student.detail',
          templateUrl:helper.basepath('student/studentDetail.html'),
          resolve: helper.resolveFor('loaders.css','ui.select')
      })
      .state('app.classList',{
          url:'/class',
          title:'class',
          templateUrl:helper.basepath('class/classList.html'),
          resolve: helper.resolveFor('loaders.css')
      })
      .state('app.classAdd',{
          url:'/class/add',
          title:'class',
          templateUrl:helper.basepath('class/classAdd.html'),
          resolve: helper.resolveFor('loaders.css','ui.select')
      })
      .state('app.classEdit',{
          url:'/class/edit/{claName}',
          title:'class',
          templateUrl:helper.basepath('class/classEdit.html'),
          resolve: helper.resolveFor('loaders.css','ui.select')
      })
      .state('app.teacherList',{
          url:'/teacher',
          title:'teacher',
          templateUrl:helper.basepath('teacher/teacherList.html'),
          resolve: helper.resolveFor('loaders.css')
      })
      .state('app.teacherEdit',{
          url:'/teacher/edit/{teacherName}/',
          title:'teacher detail',
          templateUrl:helper.basepath('teacher/teacherEdit.html'),
          resolve: helper.resolveFor('ngImgCrop', 'filestyle','loaders.css','angularFileUpload')
      })
      .state('app.teacherAdd',{
          url:'/teacher/add',
          title:'teacher add',
          templateUrl:helper.basepath('teacher/teacherAdd.html'),
          resolve: helper.resolveFor('ngImgCrop', 'filestyle','loaders.css','angularFileUpload')
      })
      .state('app.noticeList',{
          url:'/notice',
          title:'notice',
          templateUrl:helper.basepath('notice/noticeList.html'),
          resolve: helper.resolveFor('loaders.css')
      })
      .state('app.noticeAdd',{
          url:'/notice/add',
          title:'notice add',
          templateUrl:helper.basepath('notice/noticeAdd.html'),
          resolve: helper.resolveFor('ui.select','loaders.css')
      })
      .state('app.interestList',{
          url:'/interest',
          title:'interest',
          templateUrl:helper.basepath('interest/interestList.html'),
          resolve: helper.resolveFor('ngDialog','loaders.css')
      })
      .state('app.interestAdd',{
          url:'/interest/add',
          title:'interest',
          templateUrl:helper.basepath('interest/interestAdd.html'),
          resolve: helper.resolveFor('filestyle','loaders.css','angularFileUpload','ui.select')
      })
      .state('app.interestEdit',{
          url:'/interest/edit/{interestName}',
          title:'interest',
          templateUrl:helper.basepath('interest/interestEdit.html'),
          resolve: helper.resolveFor('filestyle','loaders.css','angularFileUpload','ui.select')
      })
      .state('app.devicesList',{
          url:'/devices',
          title:'devices',
          templateUrl:helper.basepath('devices/devicesList.html'),
          resolve: helper.resolveFor('loaders.css')
      })
      .state('app.devicesAdd',{
          url:'/devices/Add',
          title:'devices',
          templateUrl:helper.basepath('devices/devicesAdd.html'),
          resolve: helper.resolveFor('loaders.css','angularFileUpload','filestyle')
      })
      .state('app.feeList',{
          url:'/fee',
          title:'fee',
          templateUrl:helper.basepath('fee/feeList.html'),
          resolve: helper.resolveFor('loaders.css')
      })
      .state('app.feeAdd',{
          url:'/fee/add',
          title:'fee',
          templateUrl:helper.basepath('fee/feeAdd.html'),
          resolve: helper.resolveFor('loaders.css','angularFileUpload','filestyle')
      })
      .state('app.feeEdit',{
          url:'/fee/edit/{feeId}',
          title:'fee',
          templateUrl:helper.basepath('fee/feeEdit.html'),
          resolve: helper.resolveFor('loaders.css','angularFileUpload','filestyle')
      })
      .state('app.adviceList',{
          url:'/advice',
          title:'advice',
          templateUrl:helper.basepath('advice/adviceList.html'),
          resolve: helper.resolveFor('loaders.css')
      })

    // 
    // CUSTOM RESOLVES
    //   Add your own resolves properties
    //   following this object extend
    //   method
    // ----------------------------------- 
    // .state('app.someroute', {
    //   url: '/some_url',
    //   templateUrl: 'path_to_template.html',
    //   controller: 'someController',
    //   resolve: angular.extend(
    //     helper.resolveFor(), {
    //     // YOUR RESOLVES GO HERE
    //     }
    //   )
    // })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}])
.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('zh-cn');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}])
;

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css'],
        'loaders.css':          ['vendor/loaders.css/loaders.css'],
        'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js']
    },
    // Angular based script (use the right module name)
    modules: [
      // { name: 'toaster', files: ['vendor/angularjs-toaster/toaster.js','vendor/angularjs-toaster/toaster.css'] }
      /*{name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                                                  'vendor/ngDialog/css/ngDialog.min.css',
                                                  'vendor/ngDialog/css/ngDialog-theme-default.min.css'] }*/
        {name: 'xeditable', files: ['vendor/angular-xeditable/dist/js/xeditable.js', 'vendor/angular-xeditable/dist/css/xeditable.css']},
        {name: 'angularFileUpload',files: ['vendor/angular-file-upload/angular-file-upload.js']},
        {name: 'ngImgCrop',files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js','vendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
        {name: 'ngDialog', files: ['vendor/ngDialog/js/ngDialog.min.js', 'vendor/ngDialog/css/ngDialog.min.css','vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
        {name: 'ui.select',files: ['vendor/angular-ui-select/dist/select.js','vendor/angular-ui-select/dist/select.css']}
    ]


  })
;


/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/
/*
App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
          .on('click', function (e) { e.stopPropagation(); })
          .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
          .on('click', function (e) { e.stopPropagation(); })
          .on('keyup', function(e) {
            if (e.keyCode == 27) // ESC
              navSearch.dismiss();
          });

      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
          .on('click', function (e) { e.stopPropagation(); })
          .on('click', navSearch.dismiss);
    }]
  };

}]);*/


/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  
  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

      // Allows to close
      if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {

        $('.wrapper').on('click.sidebar', function(e){
          // don't check if sidebar not visible
          if( ! $body.hasClass('aside-toggled')) return;

          // if not child of sidebar
          if( ! $(e.target).parents('.aside').length ) {
            $body.removeClass('aside-toggled');          
          }

        });
      }

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);
/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;
          
          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }
            
          }

      });
    }
  };
  
}]);



/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

App.directive('filestyle', function() {
    return {
        restrict: 'A',
        controller: ["$scope", "$element", function($scope, $element) {
            var options = $element.data();

            // old usage support
            options.classInput = $element.data('classinput') || options.classInput;

            $element.filestyle(options);
        }]
    };
});


/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

App.directive('paneltool', ["$compile", "$timeout", function($compile, $timeout){
    var templates = {
        /* jshint multistr: true */
        collapse:"<a href='#' panel-collapse='' tooltip='收起面板' ng-click='{{panelId}} = !{{panelId}}'> \
                <em ng-show='{{panelId}}' class='fa fa-plus'></em> \
                <em ng-show='!{{panelId}}' class='fa fa-minus'></em> \
              </a>",
        dismiss: "<a href='#' panel-dismiss='' tooltip='关闭面板'>\
               <em class='fa fa-times'></em>\
             </a>",
        refresh: "<a href='#' panel-refresh='' data-spinner='{{spinner}}' tooltip='刷新面板'>\
               <em class='fa fa-refresh'></em>\
             </a>"
    };

    function getTemplate( elem, attrs ){
        var temp = '';
        attrs = attrs || {};
        if(attrs.toolCollapse)
            temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
        if(attrs.toolDismiss)
            temp += templates.dismiss;
        if(attrs.toolRefresh)
            temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
        return temp;
    }

    return {
        restrict: 'E',
        scope: false,
        link: function (scope, element, attrs) {

            var tools = scope.panelTools || attrs;

            $timeout(function() {
                element.html(getTemplate(element, tools )).show();
                $compile(element.contents())(scope);

                element.addClass('pull-right');
            });

        }
    };
}])



/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){};

}]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';
    
    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);



