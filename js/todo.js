$(document).ready(function(){
if (localStorage.getItem("listItems") === null) {
	alert("No Local Storage Found");
	var listArray = new Array();

}else{
	var jsonString = localStorage.getItem('listItems');
	var myObj = JSON.parse(jsonString);
	var listArray = myObj.listData;	
	
	var stringToAppend = '';
	//go through listArray, and for each item, 
	for(var i = 0;i< listArray.length;i++){
		// grab the object's data .ts and .todoitem, and append it to a list item
   		stringToAppend += '<li class="item" data-ts="'+ listArray[i].ts +'">' + listArray[i].todoItem + '</li>';
	}
	//take the string from the for loop and add it to the list
	$('.list').append(stringToAppend);
	
}

//list array saves all items in the user's list

    $('#button').click(function(){
       var toAdd =  $('input[name=checkListItem]').val();

       //makes the items sortable (click and drag to sort)
       $('ol').sortable(); 

       //This is the object to store, and append to our list
       var tempObject = {
        todoItem: toAdd,
        ts: (new Date().getTime() / 1000)
       };

       //pushes each item to the array
       listArray.push(tempObject);

       $('.list').append('<li class="item" data-ts="'+ tempObject.ts +'">' + toAdd + '</li>');

       console.log(listArray);
	   
	   var tempObj = {listData:listArray};
	   var jsonData = JSON.stringify(tempObj);
	   localStorage.setItem('listItems', jsonData);


    });//end button.click
	
	
    //actions to do when item is removed
     $(document).on('click','li',function(){

		//create variable from this (li)'s text value
		var toRemove = $(this).text();
		
		var timeStamp = $(this).data('ts');

		//goes through each item in the array (list)
		for(var i in listArray){
			//if an item in the array matches the key of todoItem and the value of toRemove, then take it out
			if((listArray[i].todoItem === toRemove) && (listArray[i].ts === timeStamp)){
				listArray.splice(i,1);
				break;
			}//end if
		}//end for
		console.log(listArray);

		$(this).remove();	
        
    });//end document.onClick
});//end document.ready