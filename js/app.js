let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/reg.js')(app);

//services
require('./services/reg.js')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/registration', {
      controller: 'RegController',
      templateUrl: 'templates/registration.html',
    })
    .when('/', {
      redirectTo: '/registration',
    })
}])
