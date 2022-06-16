//Close Slideover
$("#close-slide-button").click(function(event){
	event.preventDefault();
	slideOverClose();
});

//Create new List Button
$("#create-list-button").click(function(event){
	event.preventDefault();
	process_createList();
});

//Join list with code
$('#form-join').submit(function(event){
	event.preventDefault();
	var formData = $(this).serialize();
	process_joinList(formData);
});

//Share List Button
$("#share-button").click(function(event){
	event.preventDefault();
	process_shareList();
});

//Add Item Button
$("#add-item-button").click(function(event){
	event.preventDefault();
	slideOverOpen('addItem');
});

//Menu Button
$("#menu-button").click(function(event){
	event.preventDefault();
	slideOverOpen('menu');
});

//Check a List Item
$(document).on('click', '.item .check',function(event){
	var item_id = $(this).parent().attr('data-id');
	if($(this).parent('.item').hasClass('checked')){
		$(this).parent('.item').removeClass('checked');
		process_unCheckItem(item_id);
	}else{
		$(this).parent('.item').addClass('checked');
		process_checkItem(item_id);
	}
});

//Submit new item
$('#form-item-edit').submit(function(event){
	event.preventDefault();
	var formData = $(this).serialize();
	process_createItem(formData);
});

//Debug refresh
$("#refresh-button").click(function(event){
	event.preventDefault();
	location.reload();
});
//Debug destroy
$("#destroy-button").click(function(event){
	event.preventDefault();
	localStorage.removeItem('token');
	location.reload();
});
