(function(window, document) {
    // body
    'use strict;'

    document.varDetails = {
        "ans": false,
        "history": [],
        "operators":{
            "43":"add",
            "45":"sub",
            "42":"multi",
            "47":"divide"
        },
        "inputText": document.querySelector('.inputDetails')
    }
})(window, document);