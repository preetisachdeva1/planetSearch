//Inilialize the factory for get the result of search of planet api
angular
    .module('app')
	.factory('getPlanetService', getPlanetService);
    
    function getPlanetService($resource){
        var factoryData = $resource(APP.endpoints.fetchPlanet, {}, {query :{method : "GET", isArray :false}});
        return factoryData;
    };