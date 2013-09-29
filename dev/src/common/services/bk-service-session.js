angular.module('bk-service-session', ['ngCookies'])

.factory('Session', function($cookieStore) {
        return {
            setToken: function (token) {
                $cookieStore.put('token', token);
            },
            getToken: function() {
                return $cookieStore.get('token');
            },
            clearCredentials: function() {
                $cookieStore.put('id', '');
                $cookieStore.put('token', '');
            }
        }
    })