(function (document) {
    'use strict;'
    // has the details include the answer the history and the operators
    var input = {
        "ans": false,
        "history": {"element": document.querySelector('.history'),
        "list":[]},
        "operators": {
            "43": "add",
            "45": "sub",
            "42": "multi",
            "47": "divide",
            "46": "dot"
        },
        "inputText": document.querySelector('.calculator__input'),
        "operatorButtons": function (exp) {
            return document.querySelector('button[data-calc=' + exp + ']');
        },
        "dot": true
    };
    //Holds all the functions for the calculator including key presses and button presses
    document.cleanCalculator = {
        "buttonNumberPresses": function (num) {
            if (input.ans) {
                input.inputText.value = num;
                input.ans = false;

            } else {
                if (input.inputText.value === "") {
                    input.inputText.value = num;
                } else {
                    input.inputText.value += num;
                }
            }
        },
        "buttonOperatorPresses": function (exp) {
            var op = input.operatorButtons(exp);
            var idx = input.inputText.value.length - 1;
            input.ans = false;
            console.log(input.dot);
            if (input.dot && exp === "dot" && !isNaN(input.inputText.value[idx])) {
                input.inputText.value += '.';
                input.dot = false;
            }
            if (exp !== "dot") {
                if (isNaN(input.inputText.value[idx])) {
                    input.inputText.value = input.inputText.value.split('').splice(0, idx).join('');
                    input.inputText.value += op.textContent;
                    input.dot = true;
                } else {
                    input.inputText.value += op.textContent;
                    input.dot = true;
                }
            }
        },
        "evaluateAnswer": function (str) {
            str = str.split(/([*-+\/])/g);
            return str.indexOf("*") > 0 ? Number(str[0]) * Number(str[2]) : str.indexOf("/") > 0 ? Number(str[0]) / Number(str[2]) : str.indexOf("+") > 0 ? Number(str[0]) + Number(str[2]) : str.indexOf("-") > 0 ? Number(str[0]) - Number(str[2]) : null;
        },
        "calculate": function (str) {
            var regexMulti = /^(\d+\.\d+[*\/]\d+\.\d+)|(\d+[*\/]\d+\.\d+)|(\d+\.\d+[*\/]\d+)|(\d+[*\/]\d+)/; //this regex works for multiple and divide including decimals
            var regexPlus = /^(\d+\.\d+[+-]\d+\.\d+)|(\d+[+-]\d+\.\d+)|(\d+\.\d+[+-]\d+)|(\d+[+-]\d+)/; // << works for plus and minus including decimals
            if (regexMulti.test(str)) {
                var exp = regexMulti.exec(str).filter(function (a) { return a !== undefined ? a : '' }).pop();
                var ans = this.evaluateAnswer(exp);
                str = str.replace(exp, ans);
                this.calculate(str);
            } else if (regexPlus.test(str)) {
                var exp = regexPlus.exec(str).filter(function (a) { return a !== undefined ? a : '' }).pop();
                var ans = this.evaluateAnswer(exp);
                str = str.replace(exp, ans);
                this.calculate(str);
            } else {
                input.ans = str;
                input.history.list.push({ "expression": input.inputText.value, "answer": str });
                input.inputText.value = str;
                this.populateHistory();
                input.dot = true;
            }
        },
        "enterButton": function () {
            var idx = input.inputText.value.length - 1;
            var inputText = input.inputText.value;
            if (isNaN(input.inputText.value[idx])) {
                inputText = inputText.split('').splice(0, idx).join('');
                this.calculate(inputText);
            } else {
                this.calculate(inputText);
            }
        },
        "clear":function(){
            input.inputText.value ="";
        },
        "populateHistory":function(){
            if(input.history.list.length){
                var elem = document.createElement("li");
                var idx = input.history.list.length-1;
                input.history.element.classList.remove('hidden');
                elem.className = "history__details";
                elem.setAttribute('onclick','cleanCalculator.addHistoryAnswer('+input.history.list[idx].answer+')');
                elem.innerHTML = "Ans: "+ input.history.list[idx].expression +" = " + input.history.list[idx].answer;
                input.history.element.appendChild(elem);
            }else{
                input.history.element.classList.add('hidden');
            }
        },
        "clearHistory": function(){
            input.history.list = [];
            input.history.element.innerHTML ='';
            this.populateHistory();
        },
        "addHistoryAnswer":function(ans){
input.inputText.value = ans;
        }
    }
    input.inputText.addEventListener('keypress', function (event) {
        var e = event.keyCode;
        var str = event.key;
        if (e >= 48 && e < 58) {
            document.cleanCalculator.buttonNumberPresses(str);
        } else if ((e >= 42 && e < 48) || e === 46) {
            document.cleanCalculator.buttonOperatorPresses(input.operators[e.toString()]);
        }
        if (e === 13) {
            document.cleanCalculator.enterButton();
        }
    })
})(document);