angular.module('ngTokenAuthTestApp')
  .controller('SignOutController', SignOutController);

    SignOutController.$inject = ['$auth'];
     $ctrl.handleSignOutBtnClick($auth) {

      $auth.signOut()
        .then(function(resp) {
          // handle success response
          console.log("Successful Log Out")
        })
        .catch(function(resp) {
          // handle error response
          console.log("Unsuccessful log out")
        });
    };
