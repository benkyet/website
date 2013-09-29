angular.module('bk-service-item', [])

.factory('Item', function($http) {
        return {
            getItem: function(ref) {
                return $http.get('/1.0/item/' + ref)
                    .then(function(result) {
                        return result.data;
                    })
            },
            updateItem: function(item) {
                return $http.put('/1.0/item', item)
                    .then(function(result) {
                        return result.data;
                    })
            },
            removeItem: function(ref) {
                return $http.delete('/1.0/item/' + ref)
                    .then(function(result) {
                        return result.data;
                    })
            }
        }
    })