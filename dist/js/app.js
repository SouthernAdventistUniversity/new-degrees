(function() {
    'use strict';

    var translations = { 
        'en' : {
            'APPLY' : 'APPLY',
            'VISIT' : 'VISIT',
            'DEGREES' : 'DEGREES',
            'MENU' : 'MENU',
            'ACADEMICS' : 'ACADEMICS',
            'ADMISSIONS' : 'ADMISSIONS',
            'CAMPUS_LIFE' : 'CAMPUS LIFE',
            'ABOUT_SOUTHERN' : 'ABOUT SOUTHERN',
            'GIVE_NOW' : 'GIVE NOW',
            'Future Students' : 'Future Students',
            'Undergraduate Students' : 'Undergraduate Students',
            'Graduate Students' : 'Graduate Students',
            'Parents and Families' :  'Parents & Families',
            'Alumni and Friends' : 'Alumni & Friends',
            'Faculty and Staff' : 'Faculty & Staff',
            'Current Students' : 'Current Students',
            'MyAccess' : 'MyAccess',
        },        
        'es' : {
            'APPLY'                  : 'APLICA',
            'VISIT'                  : 'VISITA',
            'DEGREES'                : 'ESTUDIA',
            'MENU'                   : 'MENU',
            'ACADEMICS'              : 'ACADÉMICOS',
            'ADMISSIONS'             : 'ADMISIONES',
            'CAMPUS LIFE'            : 'VIDA EN EL CAMPUS',
            'ABOUT SOUTHERN'         : 'CONÓCENOS',
            'GIVE NOW'               : 'DAR AHORA',
            'Future Students'        : 'Futuros Estudiantes',
            'Undergraduate Students' : 'Estudiantes de Universitario',
            'Graduate Students'      : 'Estudiantes de Posgrado',
            'Parents and Families'   : 'Padres y Familia',
            'Alumni and Friends'     : 'Amigos y Estudiantes Graduados',
            'Faculty and Staff'      : 'Empleados',
            'Current Students'       : 'Estudiantes Actuales',
            'MyAccess'               : 'MyAccess'
        },
        
        'zh' : {
            'APPLY'                  : '申请',
            'VISIT'                  : '游览',
            'DEGREES'                : '课程',
            'MENU'                   : '画面'        
        },
        
        'ko' : {
            'APPLY'                  : '입학신청',
            'VISIT'                  : '방문',
            'DEGREES'                : '과정',
            'MENU'                   : '메뉴',
            'ACADEMICS'              : '교육',
            'ADMISSIONS'             : '입학안내',
            'CAMPUS LIFE'            : '대학생활',
            'ABOUT SOUTHERN'         : '대학소개',
            'GIVE NOW'               : '기부',
            'Future Students'        : '신입생',
            'Undergraduate Students' : '대학 입학',
            'Graduate Students'      : '대학원 입학',
            'Parents and Families'   : '학부모',
            'Alumni and Friends'     : '졸업생',
            'Faculty and Staff'      : '학부',
            'Current Students'       : '학생',
            'MyAccess'               : 'MyAccess'
        }      
    };
 
      
    var SAUMenuApp = angular.module('southernHeader', [
        'pascalprecht.translate'
    ]);

    SAUMenuApp.config(['$translateProvider', function ($translateProvider) {
        // add translation table
        $translateProvider          
          .translations('en', translations.en)
          .translations('es', translations.es)
          .translations('zh', translations.zh)
          .translations('ko', translations.ko)
          .registerAvailableLanguageKeys(['en', 'es', 'zh', 'ko'], {
            'en_*': 'en',
            'es_*': 'es',
            'zh_*': 'zh',
            'ko_*': 'ko'
          })
          .determinePreferredLanguage()
          .fallbackLanguage('en')
          .useSanitizeValueStrategy('escapeParameters');
      }]);

    angular
        .module('southernHeader')
        .directive('southernmainmenu', directive);

    /* @ngInject */
    function directive($sce, $anchorScroll, $timeout) {
        $anchorScroll.yOffset = 30;

        var directive = {
            restrict: 'E',
            scope: {
                scroll: '=?scrollPosition',
                headerHeight: '=?',
            },
            templateUrl: $sce.trustAsResourceUrl(templateUrl()),
            controller: controller,
            link: linkFunc
        };

        return directive;

        function templateUrl() {
            var url = 'https://d3faecii9yynmo.cloudfront.net/main-menu/dist/html/menu.html';                      

            return url;
        }

        function controller($scope) {
            $scope.isMenuOpen = !1;
            $scope.headerHeight = 126;
            $scope.searchActive = false;

            $scope.toggleMenu = function() {
                $scope.isMenuOpen = !$scope.isMenuOpen;
            };

            $scope.$watch('$viewContentLoaded', function() {
                $scope.headerHeight = $scope.initHeaderHeight = menuPosition($scope);

                if ($scope.headerHeight < 1) {
                    $scope.headerHeight = 126;
                }

                console.log('[SouthernApp] View Loaded');

                var gseCallback = function() {
                    console.log('[SouthernApp] GSE - Callback');
                    var input = document.getElementById('gsc-i-id1');
                    if (input) {
                        input.setAttribute('placeholder', 'Search');
                    }

                    var button = document.querySelector('td.gsc-search-button');
                    if (button) {
                        button.addEventListener('mousedown', function() {     
                            if (!$scope.searchActive) {
                                $scope.searchActive = true;                   
                                $timeout(function() {
                                    document.querySelector('td.gsc-input input').focus();
                                });

                            } else if ($scope.searchActive === true && input.value === '') {
                                $scope.searchActive = false;
                            } else {
                                button.querySelector('input').click();
                            }
                            $scope.$apply();
                        });
                    }
                    console.log('[SouthernApp] GSE - Done');
                };

                var s_cx = '004766769700957756237:fowol8rwkue';
                var s_cse = document.createElement('script');
                s_cse.type = 'text/javascript';
                s_cse.async = true;
                s_cse.src = 'https://www.google.com/cse/cse.js?cx=' + s_cx;
                window.__gcse = {
                    'callback': gseCallback
                }

                var s_s = document.getElementsByTagName('script')[0];
                s_s.parentNode.insertBefore(s_cse, s_s);
            });
        }

        function linkFunc(scope, el, attr, ctrl) {
            scope.currentScroll = 0;
            scope.goingUp = false;
            scope.goneUp = false;
            scope.newPos = 0;
            scope.positionedU = false;
            scope.positionedD = false;
            scope.topStyle = {};

            var scrollHandler = function() {
                scope.scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                scope.goingUp = (scope.scroll > scope.currentScroll || scope.scroll === 0) ? false : true;
                scope.currentScroll = scope.scroll;

                if (scope.goingUp) {
                    // Scrolling Up
                    if (scope.positionedD) {
                        scope.positionedD = false;
                    }

                    if (!scope.positionedU) {
                        scope.newPos = scope.scroll - scope.initHeaderHeight;
                        scope.positionedU = true;
                    }

                    if (scope.scroll <= scope.newPos) {
                        scope.goneUp = true;
                    }

                } else {
                    //Scrolling Down
                    if (scope.positionedU) {
                        scope.positionedU = false;
                    }

                    if (scope.goneUp && !scope.positionedD) {
                        scope.newPos = scope.scroll;
                        scope.positionedD = true;
                    }

                    if (scope.scroll > scope.newPos + scope.initHeaderHeight) {
                        scope.goneUp = false;
                    }
                }

                //scope.topStyle = { 'top': (((scope.goingUp && !scope.goneUp) || (!scope.goingUp && scope.goneUp)) ? scope.newPos + "px" : 'null') };
            }
            window.addEventListener('scroll', scope.$apply.bind(scope, scrollHandler));
            scrollHandler();

            var resizeHandler = function() {
                scope.headerHeight = scope.initHeaderHeight = menuPosition();
            }
            window.addEventListener('resize', scope.$apply.bind(scope, resizeHandler));
        }

        function menuPosition(scope) {
            var menuHeight = document.getElementsByClassName('sau-nav-menu')[0].offsetTop + document.getElementsByClassName('sau-nav-menu')[0].offsetHeight;
            var diff = document.getElementById('sau-header-container').offsetHeight - menuHeight;
            var ret = document.getElementsByClassName('sau-nav-menu')[0].offsetTop - diff;

            return ret;
        }
    }
})();