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


    



/*
     Initialize the routing in config function
 */

angular
    .module('app')
    .config(config);

function config($routeProvider,$locationProvider) {
   $routeProvider
        .when('/', {
            templateUrl: 'app/components/home/homeView.html',
            controller: 'homeController',
            controllerAs: 'login'
        })
        .when('/planet', {
            templateUrl: 'app/components/planetdetail/planetView.html',
            controller: 'planetDetailController',
            controllerAs: 'planetdetail'
        })
       .otherwise({redirectTo: '/'});
   $locationProvider.html5Mode(false);
}
//Create the controller for home page
angular
    .module('app')
    .controller('homeController', homeController);

// homeController function for home page functionality
function homeController(getUserService,$timeout,$location){
    var login = this;
    login.user = {};
    login.loginFormSubmitted = false;
    login.loginSubmit = loginSubmitForm;
    login.userPassWrong = false;
    login.msgShow = '';
    
    // submit login form
    function loginSubmitForm() {
        login.loginFormSubmitted = true;
        login.loginStart = false;
        if (login.user.uname === undefined || login.user.uname === '') {
            focus('uname');
            return false;
        } else if (login.user.password === undefined || login.user.password === '') {
            focus('password');
            return false;
        }
        var opts1 = {};
        login.loginStart = true;
        opts1.uname = login.user.uname;
        opts1.password = login.user.password;
        // call the api for logged in user
        getUserService.get({
            name: opts1.uname
        }, function(data) {
             if (data.count == 1) {
                 if(data.results[0].birth_year == login.user.password){
                     login.loginStart = false;
                     localStorage.setItem("loggedInUser", JSON.stringify(data.results));
                     $location.path("/planet");
                 }else if( data.results[0].birth_year != login.user.password){
                    login.loginStart = false;
                    login.userPassWrong = true;
                    login.msgShow = 'Password is wrong';
                    $timeout(function() {
                        login.msgShow = '';
                    }, 3000);
                }
             }  else if (data.count == 0 ) {
                login.loginStart = false;
                 login.userPassWrong = true;
                 login.msgShow = 'User not found';
                 $timeout(function() {
                    login.msgShow = '';
                }, 3000);
             } else {
                login.loginStart = true;
            }
        }, function(error){
            console.log("there is error in api");
        });
    };
};
//Inilialize the factory for get the result of search user api
angular
    .module('app')
	.factory('getUserService', getUserService);
    
    function getUserService($resource){
        var factoryData = $resource(APP.endpoints.fetchUser, {}, {query :{method : "GET", isArray :false}});
        return factoryData;
    };
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



//Create the controller for search directive
angular
    .module('app')
    .controller('searchController', searchController);

function searchController(getPlanetService){
    var search = this;
    search.listOfPlanet = [];
    search.searchPlanets = searchPlanet;
    search.showLoader = false;
    search.planetNoFound = false;
    search.page = 1; 
    search.totalSizeImg = 0;  
    search.allResImg = 1;
    search.checkInKeyword = 0;
    search.loadMore = loadMore;
    search.keywordChange;
    search.addStyle = addStyle;
    
    function searchPlanet(){

        var limit_start = search.listOfPlanet.length;
        search.planetNoFound = false;
        
        // Blank the array and variables when user type different names
        if((search.checkInKeyword == 1) && (search.keywordChange != search.keyword)){
             console.log("okok"); 
             search.page = 1;
             search.totalSizeImg = 0;
             search.allResImg = 1;
             search.listOfPlanet = [];
        }
        // call api if search keyword is not blank or undefined
        if(search.keyword !== '' && search.keyword != undefined) {
            if ((( search.totalSizeImg > limit_start) || search.totalSizeImg == 0 ) && search.allResImg == 1) {
                 search.showLoader = true;
                 search.allResImg = 0;
                 // call the api getPlanetService
                getPlanetService.get({  
                    name: search.keyword,
                    page : search.page
                }, function(data) {
                    search.allResImg = 1;
                    search.checkInKeyword = 1;
                    search.totalSizeImg = data.count; // get the total planet value
                    search.showLoader = false;
                    search.keywordChange = search.keyword;
                    data.results.forEach(function(entry) {
                        addStyle(entry);
                    });
                    search.listOfPlanet = search.listOfPlanet.concat(data.results); //concat the total results of planet
                    search.page++;
                    if(data.count == 0) search.planetNoFound = true; // show message if matched planet is not found
                }, function(error){
                    search.listOfPlanet =[];
                });
           }
        }
    }
    // Add the font size according to population
    function addStyle(entry){
        if(entry.population < 100000 || entry.population == 'unknown'){
            entry.fontSize = 0;
        } else if(entry.population < 10000000){
            entry.fontSize = 1;
        } else if(entry.population < 1000000000){
            entry.fontSize = 2;
        }else if(entry.population < 100000000000){
            entry.fontSize = 3;
        }else if(entry.population < 10000000000000){
            entry.fontSize = 4;
        }else {
            entry.fontSize = 5;
        }
    }
    // Call on scrolling down
    function loadMore(){
        if(search.keyword !== '' && search.keyword !== undefined){
            searchPlanet();
        }
   }
}    


/*
    Creaate the directive for search planet
*/
angular
    .module('app')
	.directive('searchPlanet', searchPlanetModule);

function searchPlanetModule(){
	var directive = {
        templateUrl: 'app/shared/search/searchView.html',
        restrict: 'E',
		controller : searchController,
        controllerAs: 'search'
    };
    return directive;
}

//Inilialize the factory for get the result of search of planet api
angular
    .module('app')
	.factory('getPlanetService', getPlanetService);
    
    function getPlanetService($resource){
        var factoryData = $resource(APP.endpoints.fetchPlanet, {}, {query :{method : "GET", isArray :false}});
        return factoryData;
    };