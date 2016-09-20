(function(document) {
    'use strict';
    /* Input variable holds key information for the calculator like the answer, the history and the expressions for the 
    key and button presses*/
    var input = {
        "ans": false,
        "history": {
            "element": document.querySelector('.history'),
            "list": []
        },
        "operators": {
            "43": "add",
            "45": "sub",
            "42": "multi",
            "47": "divide",
            "46": "dot"
        },
        "inputText": document.querySelector('.calculator__input'),
        "operatorButtons": function(exp) {
            return document.querySelector('button[data-expr=' + exp + ']');
        },
        "dot": true
    };
    /*Button variables for eventlisteners*/
    var btnExps = Array.from(input.inputText.parentNode.querySelectorAll('[data-expr]'));
    var btnNum = Array.from(input.inputText.parentNode.querySelectorAll('[data-calc]'));
    var enterBtn = input.inputText.parentNode.querySelector('[data-calcEnter]');
    var clearBtn = input.inputText.parentNode.querySelector('[data-clear]');
    var clearHistoryBtn = input.inputText.parentNode.parentNode.querySelector('[data-clearHistory]');

    //The Clean calculator logic
    document.CleanCalculator = {
            //Button function for the numbers
            "btnNumP": function(num) {
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
            //Button function for the operators
            "btnOptP": function(exp) {
                var op = input.operatorButtons(exp);
                var idx = input.inputText.value.length - 1;
                input.ans = false;
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
            //evaluates the string express i.e. '3+4' will return 7
            "evaluateAnswer": function(str) {
                str = str.split(/([*-+\/])/g);
                return str.indexOf("*") > 0 ? Number(str[0]) * Number(str[2]) : str.indexOf("/") > 0 ? Number(str[0]) / Number(str[2]) : str.indexOf("+") > 0 ? Number(str[0]) + Number(str[2]) : str.indexOf("-") > 0 ? Number(str[0]) - Number(str[2]) : null;
            },
            //Function will calculate the string value from the text input. It is a recursive function
            "calculate": function(str) {
                var regexMulti = /^(\d+\.\d+[*\/]\d+\.\d+)|(\d+[*\/]\d+\.\d+)|(\d+\.\d+[*\/]\d+)|(\d+[*\/]\d+)/; //this regex works for multiple and divide including decimals
                var regexPlus = /^(\d+\.\d+[+-]\d+\.\d+)|(\d+[+-]\d+\.\d+)|(\d+\.\d+[+-]\d+)|(\d+[+-]\d+)/; // << works for plus and minus including decimals
                if (regexMulti.test(str)) {
                    var exp = regexMulti.exec(str).filter(function(a) { return a !== undefined ? a : '' }).pop();
                    var ans = this.evaluateAnswer(exp);
                    str = str.replace(exp, ans);
                    this.calculate(str);
                } else if (regexPlus.test(str)) {
                    var exp = regexPlus.exec(str).filter(function(a) { return a !== undefined ? a : '' }).pop();
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
            //Enter button will call the calculate function (which calls the Evaluate function) and updates the text input
            "enterButton": function() {
                var idx = input.inputText.value.length - 1;
                var inputText = input.inputText.value;
                if (isNaN(input.inputText.value[idx])) {
                    inputText = inputText.split('').splice(0, idx).join('');
                    this.calculate(inputText);
                } else {
                    this.calculate(inputText);
                }
            },
            //clears the text input
            "clear": function() {
                input.inputText.value = "";
            },
            //adds the expression and answer to an object. If the history is greater then 1 it will show otherwise it will hide.
            //Also adds a function to each item in the array.
            "populateHistory": function() {
                if (input.history.list.length) {
                    var elem = document.createElement("li");
                    var idx = input.history.list.length - 1;
                    input.history.element.classList.remove('hidden');
                    elem.className = "history__details";
                    elem.setAttribute('onclick', 'document.CleanCalculator.addHistoryAnswer(' + input.history.list[idx].answer + ')');
                    elem.innerHTML = "Ans: " + input.history.list[idx].expression + " = " + input.history.list[idx].answer;
                    input.history.element.appendChild(elem);
                } else {
                    input.history.element.classList.add('hidden');
                }
            },
            //Deletes the history array
            "clearHistory": function() {
                input.history.list = [];
                input.history.element.innerHTML = '';
                this.populateHistory();
            },
            //The function will add the answer to the text input so that it can be calculated
            "addHistoryAnswer": function(ans) {
                input.inputText.value = ans;
            }
        }
        //event listener for input focus and keypad presses
    input.inputText.addEventListener('keypress', function(event) {
            var e = event.keyCode;
            var str = event.key;
            if (e >= 48 && e < 58) {
                document.CleanCalculator.btnNumP(str);
            } else if ((e >= 42 && e < 48) || e === 46) {
                document.CleanCalculator.btnOptP(input.operators[e.toString()]);
            }
            if (e === 13) {
                document.CleanCalculator.enterButton();
            }
        })
        // changes the focus of the window to the text input
    window.addEventListener('keydown', function(event) {
            input.inputText.focus();
        })
        //All the button event listeners
    btnExps.forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.CleanCalculator.btnOptP(btn.dataset.expr);
        })
    });
    btnNum.forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.CleanCalculator.btnNumP(btn.dataset.calc);
        })
    });
    clearBtn.addEventListener('click', function() {
        document.CleanCalculator.clear();
    });
    enterBtn.addEventListener('click', function() {
        document.CleanCalculator.enterButton();
    });
    clearHistoryBtn.addEventListener('click', function() {
        document.CleanCalculator.clearHistory();
    });
})(document);