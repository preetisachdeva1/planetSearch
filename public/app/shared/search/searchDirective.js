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
