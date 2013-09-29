angular.module('bk-page-login', [
        'ui.state'
    ])

    .config(function config( $stateProvider ) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                main: {
                    templateUrl: 'login/login.tpl.html',
                    controller: 'LoginCtrl'
                }
            },
            resolve: {
                rUser: ['User', function(User) {
                    return User.autologin('account', true);
                }]
            }
        });
    })

    .controller('LoginCtrl', function LoginCtrl($scope, User, $state, $http, $rootScope, Session) {

        $scope.loginFB = function() {
            $http.get('/1.0/auth/facebook').then(function() {})
        }

        $scope.loginUser = function() {
            User.login($scope.user.username, $scope.user.pass)
                .then(function(res) {

                    $rootScope.state = 'loggedIn';

                    Session.setToken(res.token);

                    $http.defaults.headers.common['token'] = Session.getToken();

                    $rootScope.current = res.user;
                    $state.transitionTo('home');
                }, function(res) {
                    $scope.error = res.data.reason;
                })
        }



    });