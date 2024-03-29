// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'starter.controllers', 'starter.services', 'starter.factories', 'starter.directives', 'angularUUID2'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom');

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('app.home', {
                url: '/home',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/home.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('app.patientinfo', {
                cache: false,
                url: '/patientinfo/:patientId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/patient-detail.html',
                        controller: 'PatientCtrl'
                    }
                }
            })

            .state('app.appointmentInfo', {
                cache: false,
                url: '/appointment/:appointmentId',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/appointment-details.html',
                        controller: 'AppointmentDetailsCtrl'
                    }
                }
            })

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'AuthCtrl'
            })

            .state('register', {
                url: '/signup',
                templateUrl: 'templates/signup.html'
            })

            .state('logout', {
                url: '/logout',
                cache: false,
                templateUrl: 'templates/logout.html',
                controller: 'AuthCtrl'
            })

            .state('about', {
                url: '/about',
                templateUrl: 'templates/aboutus.html'
            })

            .state('contact', {
                url: '/contact',
                templateUrl: 'templates/contact.html'
            })


        // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/login');


    })



