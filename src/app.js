app = angular.module('jsonPoster', [])

app.controller('PostFormCtrl', function ($scope, $http, $window) {

  $http.get('../presets.json').success(function(presets){
      $scope.presets = presets;
  });

  // default save flag to true
  $scope.data = {save: true};

  $scope.post = function (data) {

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

  $scope.$watch('preset',function(preset){
      if (preset){
          $scope.data.jsonData = JSON.stringify(preset.data);
          $scope.data.url = preset.namespace;
      }
  });

});