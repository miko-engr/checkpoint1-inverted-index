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

          if(!$scope.fileNames.includes(details.name)){
            $scope.documents.push(details);
            $scope.fileNames.push(details.name);
          }

        }

        $scope.$apply();
      };

      $scope.name = fileDetails.name;
    }

  };

  $scope.index = (fileIndex) => {
    $scope.docs = $scope.documents[fileIndex].docs;
    $scope.docArray = read.createIndex($scope.docs);
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
