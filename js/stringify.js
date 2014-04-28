// how to make an array become stringified to be accepted into localstorage
var array = [];
var tempObj = {myArray:array};
var jsonData = JSON.stringify(tempObj);
localStorage.setItem('myShit', jsonData);



//getting it out:
var jsonString = localStorage.getItem('myShit');
var myObj = JSON.parse(jsonString);

var array = myObj.myArray;