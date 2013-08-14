app = angular.module('jsonPoster', [])

app.controller('PostFormCtrl', function ($scope, $http, $window) {

  // default save flag to true
  $scope.data = {save: true};

  $scope.post = function (data) {
    console.log("URL: #{data.url}");
    console.log("JSON Data: ");
    console.log(JSON.parse(data.jsonData));

    if (data.save === true) {
      $window.localStorage.url = data.url;
      $window.localStorage.jsonData = data.jsonData;
    }

    $http.post(data.url, data.jsonData)
    .success(function(response) {
      console.log('Successfully POSTed Data');
    })
    .error(function (error) {
      console.log(error);
    })
  };

  $scope.populateFromStored = function () {
    $scope.data.url = $window.localStorage.url
    $scope.data.jsonData = $window.localStorage.jsonData
  }

});