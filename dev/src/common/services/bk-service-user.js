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
        autologin: function(redirect, bool_should_redirect_if_logged_in) {

            if(!arguments[1]) {
                bool_should_redirect_if_logged_in = false;
            }

            if(!bool_should_redirect_if_logged_in) {
                return $http.get('/1.0/autologin', {headers: {token: Session.getToken()}})
                    .then(function(result) {return result.data})
                    .then(
                    function(data) {
                        $http.defaults.headers.common['token'] = Session.getToken();
                        $rootScope.state = 'loggedIn';
                        $rootScope.current = data.user;

                        return data.user;


                    },
                    function(err) {
                        if(!arguments.length) {

                        } else {
                            $state.transitionTo(redirect);
                        }
                    }
                )
            } else {
                return $http.get('/1.0/autologin', {headers: {token: Session.getToken()}})
                    .then(function(result) {return result.data})
                    .then(
                    function(data) {
                        $http.defaults.headers.common['token'] = Session.getToken();
                        $rootScope.state = 'loggedIn';
                        $rootScope.current = data.user;

                        $state.transitionTo(redirect);

                        return data.user;


                    },
                    function(err) {

                        if(!arguments.length) {

                        } else {
                        }
                    }
                )
            }
        },
        logout: function() {
            $rootScope.user = {};
            return $http.delete('/1.0/logout', {headers: {token: Session.getToken()}})
                .then(function(result) {return result.data})
                .then(
                    function(data) {
                        $rootScope.state = 'loggedOut';
                        $state.transitionTo('home', {g: null});
                    }
                )
        },
        update: function(user) {
            return $http.put('/1.0/user', user)
                .then(function(result) {
                    return result.data;
                });
        },
        items: function() {
            return $http.get('/1.0/user/items', {headers: {token: Session.getToken()}})
                .then(function(result) {
                    return result.data
                })
        }

    };
});