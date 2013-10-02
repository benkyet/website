angular.module('bk-page-home', [
    'ui.state'
])

.config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/?g',
            views: {
                main: {
                    templateUrl: 'home/home.tpl.html',
                    controller: 'HomeCtrl'
                }
            },
            resolve: {
                rGroups: ['List', function(List) {
                    return List.getGroups().then(
                        function(res) {
                            return res.groups;
                        }
                    )
                }],
                rList: ['List', '$stateParams', function(List, $stateParams) {
                    var group;
                    if($stateParams.g) {
                        group = $stateParams.g;
                    } else {
                        group = '';
                    }
                    return List.getGroupItems(group).then(
                        function(res) {
                            return {items: res.items, group: group};

                        },
                        function(err) {
                            console.log(err)
                        }
                    );
                }],
                rEvents: ['List', '$stateParams', function(List, $stateParams) {
                    return List.getEvents($stateParams.g).then(
                        function(res) {
                            return res.group
                        },
                        function(err) {
                            console.log(err);
                        }
                    )
                }],
                user: ['User', function(User) {
                    User.autologin();
                }]
            }
        });
    })

.controller('HomeCtrl', function HomeCtrl($scope, List, $stateParams, rList, rGroups, rEvents) {

        $scope.requestFriends = function() {
            FB.ui({
                method: 'apprequests',
                message: 'My Great Request',
                title: 'Hello there',
            }, function() {
                console.log(arguments);
            });
        }



        FB.getLoginStatus(function (response) {
            console.log(response.authResponse.accessToken);
            var token = 'CAACEdEose0cBAHLdrZCX3zC5SY2m2wfV9VKQBZCyDwIvESJPybZCL2FZC2GBhIpq7cTSE034UIJeNFZBgcnAaOCRy7rZBVnpIhhzGbtcPpu8Xze0JL0JXpZAUI7N0sTjZC154ssjXlF1ydqL2wNvV0x6LEAbdf8DxkPFSFEQ2cPd1nZCa5MxHUrA9oH0jvrdftfnef8ZC0JYSLlwZDZD';
            FB.api('/me/friends?fields=education&access_token=' + token, function(response) {
                console.log(response);
            })
        })


        $scope.items = rList.items;
        if(rList.group === '') {
            $scope.nogroup = true;
        }

        $scope.groups = rGroups;

        if(rEvents === null) {

        } else {
            $scope.group = rEvents;
            $scope.events = rEvents.events
        }


        $scope.sortField = undefined;
        $scope.reverse = false;
        $scope.sort = function (fieldName) {
            if ($scope.sortField === fieldName) {
                $scope.reverse = !$scope.reverse;
            } else {
                $scope.sortField = fieldName;
                $scope.reverse = false;
            }
        };


        $scope.isSortUp = function (fieldName) {
            return $scope.sortField === fieldName && !$scope.reverse;
        };
        $scope.isSortDown = function (fieldName) {
            return $scope.sortField === fieldName && $scope.reverse;
        };


        $scope.type = '1st';

        $scope.type = $stateParams.g;

    })