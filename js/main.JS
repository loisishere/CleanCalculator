//Holds all the functions for 
(function(window, document) {
    'use strict;'
    var input = document.varDetails;
window.cleanCalculator = {
    "buttonNumberPresses" : function(num,ans){
       if(input.ans){
           return ans;
       }else{
           input.inputText.value = num; 
            console.log(num);
        }
    }
}
})(window, document);