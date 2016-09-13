(function(window){
  var ans = false;
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
if(ans){
inputDetails.innerHTML = num;
ans=false;
}else{
  inputDetails.innerHTML += num;
}
console.log(document.querySelector(".inputDetails"));
}
window.btnExpPress = function(exp){
  var txt = document.querySelector("button[data-calc="+exp+"]");
var inputDetails = document.querySelector(".inputDetails");
var lastIdx = inputDetails.innerHTML.length -1;
console.log(ans);
if(inputDetails.innerHTML !==""){
 // ans=false;
  if(Number(inputDetails.innerHTML[lastIdx])){
inputDetails.innerHTML += txt.innerHTML;
}else{
  inputDetails.innerHTML = inputDetails.innerHTML.split('').slice(0,lastIdx).join('');
  inputDetails.innerHTML += txt.innerHTML;
}
}
}
window.btnClear = function(){
  var inputDetails = document.querySelector(".inputDetails");
  inputDetails.innerHTML ="";
  ans=false;
}
window.calculate = function(data){
  return (new Function('return ' + data)());
}
window.enterButton = function(ent){
  var inputDetails = document.querySelector(".inputDetails");
  var lastIdx = inputDetails.innerHTML.length -1;
  var total;
  
  total = calculate(inputDetails.innerHTML);
  history.push({"expression":inputDetails.innerHTML,"answer":total});
  inputDetails.textContent =  total;
  ans = true;
}
// window.addEventListener('keypress',function(event){
//   var e = event.keyCode;
//   var str = event.key;
  
//   if(e >= 48 && e < 58){
//   window.btnNumPress(str);
// } else if(e >= 42 && e < 48){
//   window.btnExpPress(exp[e]);
// }
// if(e === 13){
//   var inputDetails = document.querySelector(".inputDetails");
//    total = calculate(inputDetails.innerHTML);
//    inputDetails.textContent =  total;
//    ans = true;
//   //enterButton(str.toLowerCase());
  
 //}
//})
})(window);

