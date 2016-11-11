'use strict';
let app = angular.module('app', []);
app.controller('pageController', ($scope) => {
  let details = {};
  $scope.documents = $scope.fileNames = [];
  const read = new Index();

  $scope.fileUpload = () => {
    const fileDetails = document.getElementById('file').files[0];
    const check = fileDetails.name.toLowerCase().match(/\.json$/);
    if (fileDetails === undefined || !check) {
      $scope.msg = '';
      $scope.message = 'Invalid Selection';
    }

    else {
      $scope.message = '';
      const newFile = new FileReader();
      newFile.readAsText(fileDetails);
      newFile.onload = (file) => {
        if (isJson(file.target.result)) {
          const jsonFile = JSON.parse(file.target.result);
          details = {
            name: fileDetails.name,
            docs: jsonFile
          };

          if (!$scope.fileNames.includes(details.name)) {
            $scope.documents.push(details);
            $scope.fileNames.push(details.name);
          }

        }

        $scope.$apply();
      };

      $scope.name = fileDetails.name;
      $scope.msg = 'Upload Successful';
    }

  };

  $scope.index = (fileIndex) => {
    $scope.docs = $scope.documents[fileIndex].docs;
    if ($scope.docs.length < 1) {
      $scope.docArray = [];
      $scope.message = 'Your File is empty';
    }

    else {
      $scope.message = '';
      $scope.docArray = read.createIndex($scope.docs);
    }

    $scope.msg = '';
  };

  $scope.search = () => {
    const terms = document.getElementById('terms').value;
    $scope.docArray = read.searchIndex(terms, $scope.docArray);
    $scope.status = true;
  };

});

/**
 * Checks if contents of the file is in JSON format
 */
const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
