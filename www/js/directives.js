/**
 * Created by rajaka1 on 9/27/2015.
 */

angular.module('starter.directives', ['ionic.utils'])
    .directive('myDateTimePicker', function ($ionicPopup) {
        return {
            restrict: 'E',
            template: '<input class="my-date-time-picker" type="text" readonly="readonly" ng-model="formatted_datetime" ng-click="popup()" placeholder="{{placeholder}}">',
            scope: {
                'title': '@',
                'dateModel': '=ngModel',
                'placeholder': '@'
            },
            controller : function($scope, $filter, $ionicPopup) {
                $scope.tmp = {};
                $scope.tmp.newDate = $scope.dateModel || Date.now();

                $scope.onTimeSet = function(newDate, oldDate) {
                    console.log('Selected Date from Old date', oldDate, ' to ', newDate);
                };

                $scope.popup = function() {
                    $ionicPopup.show({
                        template: '<div class="my-date-time-picker"><datetimepicker data-ng-model="tmp.newDate" data-on-time-set="onTimeSet"></datetimepicker></div>',
                        title: $scope.title,
                        scope: $scope,
                        buttons: [
                            {text: 'Cancel'},
                            {
                                text: '<b>Choose</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                    //$scope.$apply(function() { //error: apply already in progress
                                    $scope.dateModel = $scope.tmp.newDate;
                                    $scope.formatted_datetime = $filter('date')($scope.tmp.newDate, 'medium');
                                    //});
                                }
                            } //second button
                        ] //buttons array
                    }); //ionicpopup.show
                }; //scope.popup();
            }
        };
    })