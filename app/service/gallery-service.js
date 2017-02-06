'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

let baseUrl = `${__API_URL__}/api/gallery`;
let config = {
  headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

function galleryService($q, $log, $http, authService){
  $log.debug('galleryService()');


  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then( token => {
      let url = baseUrl;
      config.headers.Authorization = `Bearer ${token}`;
      return $http.post(url, gallery, config);
    })
    .then( res => {
      $log.log('gallery created!');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function(){
    $log.debug('galleryService.fetchGallery()');

    return authService.getToken()
    .then( token => {
      let url = baseUrl;

      config.headers.Authorization = `Bearer ${token}`;

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('gallery fetched!');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(galleryID, galleryData){
    $log.debug('galleryService.updateGallery');


    return authService.getToken()
    .then( token => {
      let url = `${baseUrl}/${galleryID}`;

      config.headers.Authorization = `Bearer ${token}`;

      return $http.put(url, galleryData, config);
    })
    .then( res => {
      console.log('response ==== ', res);
      service.galleries.filter(function(ele){
        return ele._id === galleryID;
      })[0] = res.data;

      return res.data;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID){
    return authService.getToken()
    .then( token => {
      let url = `${baseUrl}/${galleryID}`;

      config.headers.Authorization = `Bearer ${token}`;

      return $http.delete(url, config);
    })
    .then( res => {
      return res.body;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
