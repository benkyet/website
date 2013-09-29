angular.module('da-directive-hello', [])

.directive('hello', function ($templateCache) {
    return {
        restrict: 'E',
        templateUrl: 'directives/hello.tpl.html',
        link: function (scope, element, attrs) {
            scope.name = 'Oliver';
        }
    };
});