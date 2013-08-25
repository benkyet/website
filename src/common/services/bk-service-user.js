angular.module('bk-service-user', [])

.factory('User', function($http, Session, $rootScope, $state) {

    return {
        signup: function(data) {
            return $http.post('/1.0/user', data)
                .then(function(result) {
                    return result.data;
                });
        },
        login: function(user, pass) {
            return $http.post('/1.0/login', {username: user, pass: pass})
                .then(function(result) {
                    return result.data;
                });
        },
        autologin: function(redirect) {
            return $http.get('/1.0/autologin', {headers: {token: Session.getToken()}})
                .then(function(result) {return result.data})
                .then(
                    function(data) {
                        $http.defaults.headers.common['token'] = Session.getToken();
                        $rootScope.state = 'loggedIn';
                        $rootScope.auth = data.user;
                    },
                    function(err) {
                        $state.transitionTo(redirect);
                    }
                )
        }

    };
});