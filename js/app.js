let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/users.js')(app);
require('./controllers/mapController.js')(app);

//services
require('./services/users.js')(app);
require('./services/mapServices.js')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/registration', {
      controller: 'UserController',
      templateUrl: 'templates/registration.html',
    })
    .when('/login', {
      controller: 'UserController',
      templateUrl: 'templates/logIn.html',
    })
    .when('/mosey',{
      controller: 'mapController',
      templateUrl: 'templates/map.html'
    })
    .when('/reviews',{
      controller: 'ReviewsController',
      templateUrl: 'templates/reviews.html'
    })
    .when('/chat',{
      controller: 'BasicController',
      templateUrl: 'templates/chat.html'
    })
    .when('/', {
      redirectTo: '/mosey',
    })
}])
