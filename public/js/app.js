(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(app){
  app.controller('RegController', ['$scope', '$http', '$location', 'RegService', function($scope, $http, $location, RegService){

    console.log('hihihihi registration controller');

  }])
}

},{}],2:[function(require,module,exports){
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

},{"./controllers/reg.js":1,"./services/reg.js":3}],3:[function(require,module,exports){
module.exports = function(app){
  app.factory('RegService', function($http){
    
  })
}

},{}]},{},[2])