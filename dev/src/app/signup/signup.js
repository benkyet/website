angular.module('bk-page-signup', [
  'ui.router',
  'ui.state'
]).config([
  '$stateProvider',
  function config($stateProvider) {
    $stateProvider.state('signup', {
      abstract: true,
      url: '/signup',
      template: '<div><div ui-view></div></div>'
    }).state('signup.step1', {
      url: '/step1',
      templateUrl: 'signup/partials/step_1.tpl.html'
    }).state('signup.step2', {
      url: '/step2',
      templateUrl: 'signup/partials/step_2.tpl.html'
    });
  }
]).controller('SignupCtrl', [
  '$rootScope',
  'User',
  '$state',
  'Session',
  '$scope',
  function SignupCtrl($rootScope, User, $state, Session, $scope) {
    $scope.sendUser = function () {
      User.signup($scope.user).then(function (res) {
        console.log(res);
        User.login(res.user.username, $scope.user.pass).then(function (res) {
          $rootScope.current = res.user;
          Session.setToken(res.token);
          $state.transitionTo('account');
        }, function (err) {
          console.log(err);
        });
      }, function (res) {
        console.log(res);
        $scope.error = res.data.reason;
      });
    };
    $scope.canSave = function (form_name) {
      return $scope[form_name].$dirty && $scope[form_name].$valid;
    };
  }
]);