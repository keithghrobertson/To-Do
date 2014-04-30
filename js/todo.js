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

//click and drag to sort list items.
$('ol').sortable(); 

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
	   
	   //adding to local storage
	   //create a temp object, key and value
	   var tempObj = {listData:listArray};
	   //stringify the temp object
	   var jsonData = JSON.stringify(tempObj);
	   //set the item in localstorage as a data object
	   localStorage.setItem('listItems', jsonData);


    });//end button.click
	
	
	//actions to do when item is removed
	$(document).on('click','li',function(){

		//create variables from this (li)'s text value
		var toRemove = $(this).text();
		var timeStamp = $(this).data('ts');
		
		
		var toDelete = [];
		for(var i = 0;i<listArray.length;i++)
		{
			if((listArray[i].todoItem === toRemove) && (listArray[i].ts === timeStamp))
		  	{
				toDelete.push(i);
		  	}
		}
		
		for(var j = toDelete.length-1;j>= 0;j--)
		{
		  listArray.splice(toDelete[j],1);
		}

		
		
	
		//removing from local storage by updating the current listItems
	   //create a temp object, key and value
	   var tempObj = {listData:listArray};
	   //stringify the temp object
	   var jsonData = JSON.stringify(tempObj);
	   //set the item in localstorage as a data object
	   localStorage.setItem('listItems', jsonData);
		
		console.log(listArray);
		
		
		//remove the HTML element
		$(this).remove();	
        
    });//end document.onClick
});//end document.ready