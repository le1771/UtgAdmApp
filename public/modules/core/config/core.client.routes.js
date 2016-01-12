'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$ocLazyLoadProvider', '$urlRouterProvider',
	function($stateProvider, $ocLazyLoadProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
        
        $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
        });

		// Home state routing
		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
        .state('metrics', {
			url: '/metrics',
			templateUrl: 'modules/core/views/metrics.client.view.html'
		})
        .state('utilization', {
			url: '/utilization',
			templateUrl: 'modules/core/views/utilization.client.view.html',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'chart',
                            files: ['public/lib/Chart.js/Chart.js', 'public/lib/Chart.js/Chart.min.js']
                        },
                        ]);
                }
            }
		})
        .state('projectDashboard', {
			url: '/Project Dashboard',
			templateUrl: 'modules/core/views/projectDashboard.client.view.html'
		})
        .state('mysqltest', {
			url: '/mysqltest',
			templateUrl: 'modules/core/views/mysqltest.client.view.html'
		});
	}
]);