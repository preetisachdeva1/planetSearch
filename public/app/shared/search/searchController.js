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

