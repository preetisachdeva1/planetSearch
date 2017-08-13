/*
    Initialize the app module for application
*/
angular.module('app', [
            'ngRoute',
            'ngResource',
            "infinite-scroll",
            'ngMessages'
            ]);
angular
    .module('app')
    .controller('appController', appController);

    function appController($location){  
        if (!localStorage.getItem('loggedInUser')) {
            $location.path("/");
        } else {
            $location.path("/planet");
        };
    };


    


