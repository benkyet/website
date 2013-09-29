angular.module('bk-service-list', [])

.factory('List', function($http) {
        return {
            getGroupItems: function(group) {
                return $http.get('/1.0/items/?group=' + group)
                    .then(function(result) {
                        return result.data;
                    });
            },
            getGroups: function() {
                return $http.get('/1.0/groups')
                    .then(function(result) {
                        return result.data
                    });
            },
            getEvents: function(group) {
                return $http.get('/1.0/events/' + group)
                    .then(function(result) {
                        return result.data;
                    })
            }
        };
    });