angular.module('bk-page-item', [
    'ui.state'
])

.config(function config($stateProvider) {
        $stateProvider.state('item', {
            url: '/item/:ref',
            views: {
                main: {
                    templateUrl: 'item/item.tpl.html',
                    controller: 'ItemCtrl'
                }
            },
            resolve: {
                rItem: ['$stateParams', 'Item', function ($stateParams, Item) {
                    console.log($stateParams)

                    return Item.getItem($stateParams.ref)
                        .then(function(res) {
                            console.log(res)
                            return res.item;
                        }, function(err) {
                            console.log(err)
                        });
                }]
            }
        })
    })

.controller('ItemCtrl', function ItemCtrl($scope, rItem, $http, $window) {
        console.log(rItem)
        $scope.item = rItem;


        $scope.sendMessage = function() {
            var outbound = {
                seller_id: rItem.seller_id,
                message: $scope.message
            };
            $http.post('/1.0/message', outbound)
                .success(function(err, res){
                    console.log(res === 200)
                    if(res === 200) {
                        $scope.success = true;
                    }
                })
                .error(function(err, res) {console.log(err, res)});
        };

        $scope.canSave = function() {
            return $scope.replyForm.$dirty && $scope.replyForm.$valid;
        }

        $scope.backButton = function() {
            return $window.history.back()
        }



    })