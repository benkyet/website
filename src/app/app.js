/**
 * Bootstrapping file for the angular app. Always remember that the
 * execution context of this file is in the browser, thus we need to call the templates-main module
 * that contains all the templates we need
 */
angular.module( 'main', [
        'ngCookies',
        'templates-app',
        'templates-common',
        'bk-page-signup',
        'ui.router',
        'bk-service-user',
        'bk-page-login',
        'bk-page-home',
        'bk-page-account',
        'bk-directive-fileupload',
        'bk-service-list',
        'bk-page-item',
        'bk-service-item',
        'bk-service-session'
    ])

    .config( function myAppConfig ( $stateProvider, $urlRouterProvider, $locationProvider ) {
        $urlRouterProvider.otherwise( '/' );

        $locationProvider.html5Mode(true);

//        $httpProvider.interceptors.push(function() {
//            return {
//                'request': function(config) {
//                    if(config.url === 'signup/signup.tpl.html') {
//                        return config;
//                    }
//                    config.url = '1.0' + config.url;
//                    return config;
//                }
//            };
//        });


    })

    .run( function run ( $rootScope, User ) {

        /*
        We should only show some menu items if the user
        is logged in (authenticated)
         */
        $rootScope.isAuthenticated = function() {
            if($rootScope.state === 'loggedIn') {
                return true;
            } else {
                return false;
            }
        }

        $rootScope.state = 'loggedOut';



        $rootScope.editEmail = function() {
            $rootScope.isUpdatingAccount = true;
        }

    })

    .controller( 'AppCtrl', function AppCtrl ( $scope, $location, User, $rootScope ) {

        $scope.toggleMenu = function() {
            document.getElementById('js-button-toggle').click();
        };

        /*
         Gets called when user clicks on log out button
         */
        $rootScope.logoutUser = function() {
            User.logout();
            document.getElementById('js-button-toggle').click();
        };


    })
;