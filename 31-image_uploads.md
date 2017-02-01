![cf](https://i.imgur.com/7v5ASc8.png) Lab 31 - Image Uploads
======

## To Submit this Assignment
  * work on a new branch from your previous fork
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Include
  * `.eslintrc`
  * `.babelrc`
  * `.gitignore`
  * `package.json`
    * **hint: do not forget** to add the `ng-file-upload` module
    * create an npm `build` script for running `webpack`
    * create an npm `build-watch` script for running `webpack-dev-server --inline --hot`
    * create an npm `test` script for running karma and all associated tests
    * create an npm `test-watch` script for running karma on file system changes
    * create an npm `lint` script for linting your JS with `eslint`
  * **ignore the build directory**
  * `webpack.config.js`
    * this should include all of the production environment configurations used in lecture code
  * `karma.config.js`

## Clone
  * Clone, setup, and run the `slugram-backend` application in order for your angular app to communicate with the server
  * [slugram-backend](https://github.com/slugbyte/slugram-backend)
    * **note** - this application should be running on the `staging` branch
    * **note** - **DO NOT** include this application with your assignment submission

## Description
  * Today you will add the ability to upload images in your app
  * Create a component for uploading an image to the `slugram-backend` API for a specific gallery
  * On a successful upload, the pic should be added to the galleries array of pics
  * Create a component for displaying a thumbnail for a particular pic
    * this should include a button that will trigger a **DELETE** request to the `slugram-backend` API and delete the photo from the gallery
  * Create a component for displaying the thumbnails for photos in a gallery
  * Add the ability to select a gallery and have it's pictures displayed using the thumbnail component

## POST `/api/gallery`
  * Use this route to create a gallery
  * headers required
    * `Authorization` :  `Bearer <token>`
    * `Accept` :  `application/json`
    * `Content-Type` :  `application/json`
  * body requirements
    * name: **String**
    * desc: **String**  
  * this should return a `200` response and an object with the data for the gallery that was just created

## GET `/api/gallery`
  * use this route to get an array of all of a users galleries
  * headers required
    * `Authorization` :  `Bearer <token>`
    * `Accept` :  `application/json`
  * this should return a `200` response and an array of the last 50 galleries created by the user   

## PUT `/api/gallery/<galleryID>`
  * use this route to update a gallery with new information
  * headers required
    * `Authorization` :  `Bearer <token>`
    * `Accept` :  `application/json`
    * `Content-Type` :  `application/json`
  * this should return a `200` response and an object with the data for the gallery that was just updated

## DELETE  `/api/gallery/<galleryID>`
  * use this route to delete a gallery
  * headers required
    * `Authorization` :  `Bearer <token>`
  * this should return a `204` response with no content

## POST `/api/gallery/<galleryID>/pic`
  * use this route to create a pic associated with a gallery
  * headers required
    * `Authorization` :  `Bearer <token>`
    * `Accept` :  `application/json`
  * body requirements
    * name: **String**
    * desc: **String**  
  * file: **multipart file data**
  * this should return a `200` response and an object with the data for the pic that was just created

## DELETE  `/api/gallery/<galleryID>/pic/<picID>`
  * use this route to delete a pic
  * headers required
    * `Authorization` :  `Bearer <token>`
  * this should return a `204` response and no content  
