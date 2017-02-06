'use strict';

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', createGalleryController],
  controllerAs: 'createGalleryCtrl'
};

function createGalleryController($log, galleryService) {

  $log.debug('createGalleryController');

  this.gallery = {};

  this.createGallery = function(){
    galleryService.createGallery(this.gallery)
    .then( () => {
      this.gallery.name = null;
      this.gallery.desc = null;
    });

    location.reload();
  };
}
