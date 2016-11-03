'use strict';
let app = angular.module('app',[]);
app.controller('pageController', ($scope) => {
    let details = {};
    $scope.documents = [];
    let read = new Index();
    $scope.fileUpload = () => {
        let fileDetails = document.getElementById('file').files[0];
        if(fileDetails===undefined || !fileDetails.name.toLowerCase().match(/\.json$/)){
            $scope.message = 'Invalid Selection';
        }
        else {
            $scope.message = '';
            let fileObj = new FileReader();
            fileObj.readAsText(fileDetails);
            fileObj.onload = (file) => {
                if(isJson(file.target.result)){
                    let jsonFile = JSON.parse(file.target.result);
                    details = {
                        name:fileDetails.name,
                        docs:jsonFile
                    };
                $scope.documents.push(details);
            }
            $scope.$apply();
          };
             $scope.name = fileDetails.name;
        }
        
    };
    $scope.index = (fileIndex) => {
        $scope.docs = $scope.documents[fileIndex].docs;
        $scope.docArray = read.createIndex($scope.docs);
        console.log($scope.docArray);
        $scope.data = $scope.docs.length;
    };
    $scope.search = () => {
        const terms = document.getElementById('terms').value;
        $scope.docArray = read.searchIndex(terms,$scope.docArray);
    };
    
});

/**
 * Checks if contents of the file is in JSON format
 */
let isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};