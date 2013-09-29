/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('da-users', [
        'ui.state'
    ])
/**
 * Each section or module of the site can also have its own routes.
 * AngularJS will ensure they are all available at run-time, but
 * splitting it this way makes each module more 'self-contained'.
 */
    .config(function config( $stateProvider ) {
        $stateProvider.state('users', {
            url: '/users',
            views: {
                main: {
                    templateUrl: 'admin/users.tpl.html',
                    controller: 'UsersCtrl'
                }
            }
        });
    })
/**
 * We define a controller for our route.
 * But don't forget to declare it the html
 * template too
 */
    .controller('UsersCtrl', function AboutCtrl($scope) {
        $scope.name = 'James';
        $scope.name = 'James';
    });