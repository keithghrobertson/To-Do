$(document).ready(function(){
//list array saves all items in the user's list
var list = new Array();

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
       list.push(tempObject);

       $('.list').append('<li class="item" data-ts="'+ tempObject.ts +'">' + toAdd + '</li>');

       console.log(list);

    });//end button.click
	
	
    
     $(document).on('click','li',function(){

		//create variable from this (li)'s text value
		var toRemove = $(this).text();
		
		var timeStamp = $(this).data('ts');

		//goes through each item in the array (list)
		for(var i in list){
			//if an item in the array matches the key of todoItem and the value of toRemove, then take it out
			if((list[i].todoItem === toRemove) && (list[i].ts === timeStamp)){
				list.splice(i,1);
				break;
			}//end if
		}//end for
		console.log(list);

		$(this).remove();	
        
    });//end document.onClick
});//end document.ready