module.exports = function(app) {
    app.factory('loginService', function($http) {

        let firstname = "";
        let lastname = "";
        let email = "";
        let username = "";
        let password = "";
        let isLocal = true;


        let usersArray = [];
        var currentUser;

        // logout route in the works
        var logout = function() {
            $http.post('/logout').then(function(data) {
                console.log(data);
            })
        }

        return {

            // logout: logout; **not yet working

            getUser: function() {
                $http({
                    method: 'GET',
                    url: '/users',
                }).then(function(response) {
                    console.log('getting the user', response.data);
                    let userList = response.data
                    angular.copy(userList, usersArray)
                })
                return usersArray;
            },
            registerUser: function(firstname, lastname, email, username, password, isLocal) {
                return $http({
                    method: 'POST',
                    url: '/register',
                    data: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        username: username,
                        password: password,
                        isLocal: isLocal,
                    }
                });
            },
            loginUser: function(username, password) {
                return $http({
                    method: 'POST',
                    url: '/login',
                    data: {
                        username: username,
                        password: password,
                    }
                }).then(function(response) {
                    if (response.config.data.username === username) {
                        currentUser = response.config.data.username;
                    }
                    return currentUser
                })
            },

            getUsername: function() {
                return currentUser
            },


        }
    })
}
