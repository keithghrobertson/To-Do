$(document).ready(function(){
var list = new Array();
    
	$('#button').click(function(){
       var toAdd =  $('input[name=checkListItem]').val();
       
	   $('.list').append('<li class="item">' + toAdd + '</li>');
	   
	   $('ol').sortable(); 
	   
	   //pushes each item to the array
	   list.push(toAdd);
	   
	   console.log(list);
	   
    });//end button.cick
    
    $(document).on('click','li',function(){
		console.log($('li').val());
        //for(var i in list){
    	//	if(list[i]==toRemove){
        //		ary.splice(i,1);
        //		break;
        //	}//end if
	//	}//end for
		$(this).remove();
		console.log(list);
		
		
		
		 

			
        
    });//end document.on
});