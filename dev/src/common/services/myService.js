angular.module('da-service', [])

.factory('myService', function() {
        return {
            action: function() {
                return 'James';
            }
        }
    })