let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/reg.js')(app);
require('./controllers/mapController.js')(app);

//services
require('./services/reg.js')(app);
require('./services/mapServices.js')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/registration', {
      controller: 'RegController',
      templateUrl: 'templates/registration.html',
    })
    .when('/map',{
      controller: 'mapController',
      templateUrl: 'templates/map.html'
    })
    .when('/', {
      redirectTo: '/map',
    })
}])
