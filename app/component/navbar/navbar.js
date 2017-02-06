'use atrict';

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', navbarController],
  controllerAs: 'navbarCtrl'
};

function navbarController($log, $location, $rootScope, authService) {
  $log.debug('navbarController');

  this.checkPath = function(){
    let path = $location.path();
    if (path == '/join'){
      this.hideButtons = true;
    }

    if( path !== '/join'){
      this.hideButtons = false;
      authService.getToken()
      .catch( () => {
        $location.url('/join#login');
      });
    }
  };
  this.checkPath();
  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.logout = function(){
    $log.log('navbarCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };
}
