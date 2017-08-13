var APP = APP || {};
// Define the ap urls

APP.endpoints = {
    fetchUser :  "http://swapi.co/api/people/?search=:name",
    fetchPlanet : "http://swapi.co/api/planets/?search=:name&page=:page"
}
