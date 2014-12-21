var currentSection = "";
var lastSection = "";
	
angular.module('Movie', [
	'ui.router',
	'Movie.home',
	'Movie.gallery',
	'Movie.synopsis',
	'Movie.cast',
	'Movie.trailer',
	'Movie.directives.nav',
	'Movie.directives.thumbnail',
	'Movie.services.preload',
	'Movie.services.movie',
  'Movie.animations'
])
.constant('ENDPOINT_URI', 'app/data/movie.json')
.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

	$stateProvider
		.state('Movie', {
      		abstract: true,
			url: ''
		});

	$urlRouterProvider.otherwise("/");

	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads
		'self',
		// Allow loading from youtube
		'https://www.youtube.com/**'
	]);

})
.run(function($rootScope, $timeout) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      // State handling for animations

      // Set Default from state to "home"
      fromState = (fromState.name) ? fromState : {name: "home"};

      var tState = toState.name.split('.'),
          fState = fromState.name.split('.'),
          lastIndex = tState.length - 1,
          fLastIndex = fState.length - 1;

      var tostate = tState[lastIndex];
      var fromstate = fState[fLastIndex];

      $rootScope.animation = "from-" + fromstate + "-to-" + tostate;
    });
});