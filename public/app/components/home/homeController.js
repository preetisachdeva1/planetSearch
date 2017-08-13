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