let app = angular.module('Mosey', ['ngRoute']);

//controllers
require('./controllers/loginController.js')(app);
require('./controllers/mapController.js')(app);
require('./controllers/reviewsController.js')(app);

//services
require('./services/loginService.js')(app);
require('./services/mapServices.js')(app);
require('./services/reviewsService.js')(app);

app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/registration', {
      controller: 'loginController',
      templateUrl: 'templates/registration.html',
    })
    .when('/login', {
      controller: 'loginController',
      templateUrl: 'templates/logIn.html',
    })
    .when('/mosey',{
      controller: 'mapController',
      templateUrl: 'templates/map.html'
    })
    .when('/reviews',{
      controller: 'reviewsController',
      templateUrl: 'templates/reviews.html'
    })
    .when('/', {
      redirectTo: '/mosey',
    })
}])
