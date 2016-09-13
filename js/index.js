(function(window){
  var ans = false;
  var ansArr = [];
  var history = [];
  var exp={
    43:"add",
    45:"sub",
    42:"multi",
    47:"divide"
  }
  window.btnNumPress = function(num){
num = num.toString();
var inputDetails = document.querySelector(".inputDetails");
//check if there is an answer in the input field
if(ans){
  inputDetails.value = ans.toString();
  ans = false;
  inputDetails.value = num;
}else{
  if(inputDetails === ""){
    inputDetails.value = num;
  }else{
inputDetails.value += num;
}
}
}
window.btnExpPress = function(exp){
  var txt = document.querySelector("button[data-calc="+exp+"]");
var inputDetails = document.querySelector(".inputDetails");
var lastIdx = inputDetails.value.length -1;
ans = false;
  if(isNaN(inputDetails.value[lastIdx])){
      inputDetails.value = inputDetails.value.split('').slice(0,lastIdx).join('');
  inputDetails.value += txt.textContent;
}else{
  inputDetails.value += txt.textContent;
}
}

window.btnClear = function(){
  var inputDetails = document.querySelector(".inputDetails");
  inputDetails.value ="";
  ans=false;
}
window.calculate = function(data){
  return (new Function('return ' + data)());
}
window.enterButton = function(){
  var inputDetails = document.querySelector(".inputDetails");
  var lastIdx = inputDetails.value.length -1;
  ans = calculate(inputDetails.value);
  history.push({"expression":inputDetails.value,"answer":ans});
  inputDetails.value = ans;
}
window.addEventListener('keypress',function(event){
  var e = event.keyCode;
  var str = event.key;
  if(e >= 48 && e < 58){
  window.btnNumPress(str);
} else if(e >= 42 && e < 48){
  window.btnExpPress(exp[e]);
}
if(e === 13){
  window.enterButton("enter");  
 }
})
})(window);

