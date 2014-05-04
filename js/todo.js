$(document).ready(function(){
if (localStorage.getItem("listItems") === null) {
	alert("No Local Storage Found");
	var listArray = new Array();

}else{
	//localStorage.clear();
	var jsonString = localStorage.getItem('listItems');
	var myObj = JSON.parse(jsonString);
	var listArray = myObj.listData;	
	
	var stringToAppend = '';
	//go through listArray, and for each item, 
	for(var i = 0;i< listArray.length;i++){
		// grab the object's data .ts and .todoitem, and append it to a list item
   		stringToAppend += '<li class="item" data-ts="'+ listArray[i].ts +'">' + listArray[i].todoItem + '<span class="delete"></span></li>';
	}
	//take the string from the for loop and add it to the list
	$('.list').append(stringToAppend);
}


//click and drag to sort list items.
//$('ol').sortable(); 

    $('#button').click(function(){
		
		//if text box is empty, show an error message and do not add item
		if($('input[name=checkListItem]').val() == ''){
			$( "span#errorMessage" ).css( "display","block");
			
		//if text box isn't empty, add the value to the array	
		}else{
			
			//hide the error message if it exists.
			$( "span#errorMessage" ).css( "display","none");
		
		   var toAdd =  $('input[name=checkListItem]').val();
		   
		   //testing removing slashes
		   toAdd = toAdd.replace(/\\/g, '&#92;');//backslash

		   
	
		   //This is the object to store, and append to our list
		   var tempObject = {
			todoItem: toAdd,
			ts: (new Date().getTime() / 1000)
		   };
	
		   //pushes each item to the array
		   listArray.push(tempObject);
	
		   $('.list').append('<li class="item" data-ts="'+ tempObject.ts +'">' + toAdd + '<span class="delete"></span></li>');
	
		   console.log(listArray);
		   
		   //adding to local storage
		   //create a temp object, key and value
		   var tempObj = {listData:listArray};
		   //stringify the temp object
		   var jsonData = JSON.stringify(tempObj);
		   //set the item in localstorage as a data object
		   localStorage.setItem('listItems', jsonData);
		   
		   //clear the textbox
		   $('input[name=checkListItem]').val('');
		
		}//end else (if text box is not empty)


    });//end button.click
	
	
	//actions to do when list item's span (delete button) is removed
	$(document).on('click','span',function(){
		
		alert($(this).parent().text());

		//create variables from this (li)'s text value
		var toRemove = $(this).parent().text();
		var timeStamp = $(this).parent().data('ts');
		
		
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
		
		//remove the HTML element
		$(this).parent().remove();
        
    });//end document.onClick
});//end document.ready