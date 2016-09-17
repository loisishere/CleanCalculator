//Holds all the functions for 
(function(window, document) {
    'use strict;'
    var input = document.varDetails;
window.cleanCalculator = {
    "buttonNumberPresses" : function(num){
       if(input.ans){
           input.inputText.value = input.ans;
       }else{
           input.inputText.value = num; 
            console.log(num);
        }
    }
}
})(window, document);