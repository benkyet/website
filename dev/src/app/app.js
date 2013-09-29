angular.module('main', [
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
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
]).run([
  '$rootScope',
  'User',
  function run($rootScope, User) {
    $rootScope.isAuthenticated = function () {
      if ($rootScope.state === 'loggedIn') {
        return true;
      } else {
        return false;
      }
    };
    $rootScope.state = 'loggedOut';
    $rootScope.logoutUser = function () {
      User.logout();
    };
  }
]).controller('AppCtrl', [
  '$scope',
  '$location',
  function AppCtrl($scope, $location) {
  }
]);
;