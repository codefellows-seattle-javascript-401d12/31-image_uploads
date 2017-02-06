'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  let baseUrl = `${__API_URL__}/api/gallery`;
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${baseUrl}/${galleryData._id}/pic`;
      headers.Authorization = `Bearer ${token}`;
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file
        }
      });
    })
    .then( res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleryPic = function(galleryData, picID) {
    $log.debug('uploadGalleryPic');

    return authService.getToken()
    .then( token => {
      let url = `${baseUrl}/${galleryData._id}/pic/${picID}`;

      headers.Authorization = `Bearer ${token}`;

      return Upload.upload({
        url,
        headers,
        method: 'DELETE'
      });
    })
    .then( res => {
      $log.debug('pic deleted!');
      window.location.reload();
      return res.status;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
