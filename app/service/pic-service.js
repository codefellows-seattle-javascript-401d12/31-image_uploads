'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authservice', picService];

function picService($q, $log, $http, Upload, authservice){
  $log.debug('picService');

  let service = {};

  let baseUrl = `${__API_URL__}/api/gallery`;
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('uploadGalleryPic');

    return authservice.getToken()
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

  return service;
}
