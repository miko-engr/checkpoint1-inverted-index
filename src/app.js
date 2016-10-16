"use strict";
$('document').ready(function () {
    var wick;
    var details = {};
    var read = new Index();
    $('#fileUpload').on('click', function () {
        var fileDetails = document.getElementById('file').files[0];
        let file = new FileReader();
        file.readAsText(fileDetails);
        file.onload = function(files){
            if(isJson(files.target.result)){
                wick = JSON.parse(files.target.result);
                details = {
                    name:fileDetails.name,
                    docs:wick
                };
                $('#name').append('<li class="mdl-menu__item" id='+fileDetails.name+'>'+fileDetails.name+'</li>');
            }
            else{
                console.log('Aww, Snap!!');
            }
        };
        // console.log(details);
         
         $('#name').on('click','li', function(){
        if(this.id === fileDetails.name){
            var docArray = read.createIndex(details);
        }
    });  
    });
    $('#index').on('click', function(){
        var numberofDocs = read.getIndex(details);
        $('#list').attr('data-badge',numberofDocs);
        var docArray = read.createIndex(details);
        var display = new showOccurrences(docArray);
        console.log(Object.keys(display));
        var key = Object.keys(display);
        $(Object.keys(display)).each(function(keys){
            var value = key[keys];
            $('#table').append("<tbody><tr><td>"+value+"</td><td>Love</td></tr></tbody>");
        });
        });
     
});

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}