'use strict';
let app = angular.module('app', []);
app.controller('pageController', ($scope) => {
  let details = {};
  $scope.documents = [];
   $scope.fileNames = [];
  const read = new Index();
  $scope.fileUpload = () => {
    const fileDetails = document.getElementById('file').files[0];
    if (!fileDetails || !fileDetails.name.toLowerCase().match(/\.json$/)) {
      $scope.msg = '';
      $scope.message = 'Invalid Selection';
    }

    else {
      $scope.message = '';
      const newFile = new FileReader();
      newFile.readAsText(fileDetails);
      newFile.onload = (file) => {
        if (Utility.isJson(file.target.result)) {
          const jsonFile = JSON.parse(file.target.result);
          details = {
            name: fileDetails.name,
            docs: jsonFile,
          };

          if (!$scope.fileNames.includes(details.name)) {
            $scope.documents.push(details);
            $scope.fileNames.push(details.name);
            document.getElementById('file').value = '';
          }
        }

        $scope.$apply();
      };

      $scope.name = fileDetails.name;
      $scope.msg = 'Upload Successful';
    }
  };

  $scope.index = () => {
    const fileOption = document.getElementById('profession').selectedIndex;
    if (!$scope.documents.length) {
      $scope.message = 'Please upload a file';
    }
    else if ($scope.documents[fileOption].docs.length) {
      $scope.docs = $scope.documents[fileOption].docs;
      $scope.message = '';
      $scope.docArray = read.createIndex($scope.docs);
    }

    else {
      $scope.docArray = [];
      $scope.message = 'Your File is empty';
    }

    $scope.msg = '';
    $scope.searchStatus = false;
  };

  $scope.search = () => {
    const terms = document.getElementById('terms').value;
    $scope.docArray = read.searchIndex(terms, $scope.docArray);
    $scope.searchStatus = true;
  };

});
