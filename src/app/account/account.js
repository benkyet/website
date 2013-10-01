angular.module('bk-page-account', [
    'ui.state'
])
    /*
To define a route, we use the .config method, just like normal,
but instead of setting our routes on $routeProvider, we set our
states on $stateProvider
 */
.config(function config( $stateProvider ) {
    $stateProvider
        .state('wizard', {
            abstract: true,
            url: '/wizard',
            views: {
                main: {
                    template: '<div><div ui-view></div></div>',
                    controller: 'WizardCtrl'
                }
            }
        })
        .state('wizard.step1', {
            url: '/step1',
            templateUrl: 'account/wizard/step_1.tpl.html',
            resolve: {
                rUser: ['User', function(User) {
                    return User.autologin('login');
                }]
            }
        })
        .state('wizard.step2', {
            url: '/step2',
            templateUrl: 'account/wizard/step_2.tpl.html',
            resolve: {
                rUser: ['User', function(User) {
                    return User.autologin('login');
                }]
            }
        })
        .state('wizard.step3', {
            url: '/step3',
            templateUrl: 'account/wizard/step_3.tpl.html'
        })
        .state('account', {
            url: '/account',
            views: {
                main: {
                    templateUrl: 'account/account.tpl.html',
                    controller: 'AccountCtrl'
                }
            },
            resolve: {
                rUser: ['User', function(User) {
                    return User.autologin('login');
                }],
                rGroups: ['List', function(List) {
                    return List.getGroups()
                        .then(
                            function(res) {
                                return res.groups;
                            },
                            function(err) {
                                console.log(err);
                            }
                        )
                }]
            }
        })
})

.controller('WizardCtrl', function Wizard($scope, $state) {
        $scope.unic = 'James'

        $scope.user = {}

            FB.getLoginStatus(function (response) {
                console.log(response.authResponse.accessToken);
                console.log(response.authResponse)
                var token = response.authResponse.accessToken;
                FB.api('/me?fields=education&access_token=' + token, function(res) {
                    console.log(res)
                    var len = res.education.length;
                    console.log(len)
                    var val = res.education[len - 1].school.name.toString();
                    console.log(val)
                    $scope.criteria = val
                })
                FB.api('/me/friends?fields=education,name,picture&access_token=' + token, function(res2) {
                    console.log(res2);
                    $scope.$apply($scope.friends = res2.data);

                })
            });


        $scope.requestFriends = function() {
            FB.ui({
                method: 'apprequests',
                message: 'My Great Request',
                title: 'Hello there',
                to: invites
            }, function() {
                console.log(arguments);
                $scope.$apply($state.transitionTo('account'));
            });
        }



        var invites = [];

        $scope.addFriendRequest = function(id) {

            var invite_state = invites.filter(function(elt) {
                if(elt === id) {
                    return elt;
                }
            });

            if(invite_state[0]) {
                var idx = invites.indexOf(id);
                console.log(idx)
                invites.splice(idx, 1);
            } else {
                invites.push(id);
            }

            if(invites.length >= 1) {
                $scope.valid_invite = true;
            } else {
                $scope.valid_invite = false;
            }

        }




    })

.controller('FriendCtrl', function Friend( $scope ) {

    })

.controller('AccountCtrl', function Account($scope, $state, List, rGroups, Session, User, Item, rUser, $rootScope, $timeout) {

        //This line is necessary because I noticed a weird behaviour.
        //The user info is published on the rootScope in the autologin method of the User service.
        //On the account page, we get the user info on the scope. But it didn't work every time.
        //Seems like sometimes, the view a local scope would loaded before the rootscope had time
        //to transfer its data to the local scope
        $scope.current = rUser;

        $scope.goToWizard = function() {
            $state.transitionTo('wizard.step1')
        }

        $scope.updateUser = function() {
            $scope.isProgressing = true;
            delete $scope.current._id;

            User.update($scope.current)
                .then(function(res) {
                    console.log(res)
                    if(res.status === 200) {
                        $scope.current.pass = '';
                        $scope.current.confirm = '';
                        $scope.isProgressing = false;
                        $scope.isUpdatingAccount = false;
                    }
                })
        };


        $scope.groups = rGroups;

        User.items().then(
            function(res) {
                $scope.items = res.items
            },
            function(err) {
            }
        );

        $scope.updateItem = function(item, idx) {
            console.log(item)
            var item_to_update = JSON.parse(JSON.stringify(item));
            delete item_to_update.seller_id;
            delete item_to_update.pictures;
            delete item_to_update.ref;

            Item.updateItem(item_to_update).then(
                function(res) {
                    //console.log(res);
                    console.log(idx)
                    console.log('isEditing' + idx)
                    $scope.isEditing0 = false;
                }
            )

        }

        $scope.removeItem = function(ref, idx) {
            Item.removeItem(ref).then(
                function(res) {
                    if(res.status === 204) {

                        User.items().then(
                            function(res) {
                                $scope.items = res.items
                            },
                            function(err) {
                            }
                        );

                    }
                }
            )
        }

        $scope.canSave = function(form_name) {
            return $scope[form_name].$dirty && $scope[form_name].$valid;
        }

        $scope.sendItem = function() {
                $scope.isProgressing = true;

//            var data = {
//                name: $scope.item.name,
//                price: $scope.item.price,
//                location: $scope.item.location,
//                description: $scope.item.description,
//                pictures: $scope.pictures
//            }

            var str = JSON.stringify($scope.pictures);

            var form = new FormData();
            form.append('name', $scope.item.name)
            form.append('price', $scope.item.price)
            form.append('location', $scope.item.location)
            form.append('description', $scope.item.description)
            form.append('group', $scope.item.group)
            form.append('pictures', str)


//            $http.post('/1.0/item', data)
//                .success(function(d) {console.log(d)})
//                .error(function(e) {console.log(e)})

            var qs = document.querySelector.bind(document);

            var xhr = new XMLHttpRequest()
            xhr.open('POST', '/1.0/item');

            xhr.setRequestHeader("token", Session.getToken());

//            xhr.upload.onprogress = function(e) {
////                qs('#progress').value = e.loaded;
////                qs('#progress').max = e.total;
//            }

            xhr.onload = function() {
                console.log('uploaded');

                $scope.$apply(function() {
                    User.items().then(
                        function(res) {
                            $scope.isProgressing = false;
                            $scope.items = res.items;
                            $rootScope.itemUploaded = true;
                            $timeout(function() {
                                $rootScope.itemUploaded = false;
                            }, 5000);
                        },
                        function(err) {
                        }
                    );

                    $scope.$apply($scope.isAddingItem = false);
                })
                ;
            }

            xhr.send(form);


        }

    })
.controller('s-ItemCtrl', function($scope, Item) {
        $scope.updateItem = function(item) {
            console.log(item)
            var item_to_update = JSON.parse(JSON.stringify(item));
            delete item_to_update.seller_id;
            delete item_to_update.pictures;
            delete item_to_update.ref;

            Item.updateItem(item_to_update).then(
                function(res) {
                    $scope.isEditing = false;
                }
            )

        }


    })