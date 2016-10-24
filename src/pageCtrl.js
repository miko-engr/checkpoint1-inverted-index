"use strict";
let app = angular.module('app',[]);
app.controller('pageController', function($scope) {
    let details = {};
    $scope.documents = [];
    let read = new Index();
    $scope.fileUpload = function() {
        let fileDetails = document.getElementById('file').files[0];
        if(fileDetails===undefined){
            console.log('No file chosen');
        }
        else{
            let fileObj = new FileReader();
            fileObj.readAsText(fileDetails);
            fileObj.onload = function(file) {
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
             read.getIndex(details);
        }
        
    };
    $scope.index = function(fileIndex) {
        $scope.docs = $scope.documents[fileIndex].docs;
        $scope.docArray = read.createIndex($scope.docs);
        console.log($scope.docArray);
        $scope.data = $scope.docs.length;
    };
    $scope.search = function() {
        let terms = document.getElementById('terms').value;
        $scope.docArray = read.searchIndex(terms,$scope.docArray);
        console.log($scope.result);
    };
    
});

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}