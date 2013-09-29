angular.module('da-admin', [
        'ui.state'
])

.config(function config( $stateProvider ) {
    $stateProvider.state('admin', {
        url: '/admin',
        views: {
            main: {
                templateUrl: 'admin/admin.tpl.html',
                controller: 'AdminCtrl'
            }
        }
    });
})

.controller('AdminCtrl', function AdminCtrl($scope, myService) {
        $scope.name = 'James';
        $scope.name = 'James';

        $scope.content = myService.action();
});