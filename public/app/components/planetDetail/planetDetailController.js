//Create the controller for planet search page
angular
    .module('app')
    .controller('planetDetailController', planetDetailController);

function planetDetailController($location){
     var planetdetail = this;
     planetdetail.logout = logout;
     function logout(){
         localStorage.removeItem('loggedInUser');
        $location.path("/");
    }
}    

