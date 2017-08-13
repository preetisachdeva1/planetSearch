//Inilialize the factory for get the result of search user api
angular
    .module('app')
	.factory('getUserService', getUserService);
    
    function getUserService($resource){
        var factoryData = $resource(APP.endpoints.fetchUser, {}, {query :{method : "GET", isArray :false}});
        return factoryData;
    };