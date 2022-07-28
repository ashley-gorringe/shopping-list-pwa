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

//Clean List Button
$("#clean-button").click(function(event){
	event.preventDefault();
	process_cleanList();
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

//Open a List Item
$(document).on('click', '.item .content',function(event){
	event.preventDefault();
	var item_id = $(this).parent().attr('data-id');
	$('#form-item-edit-skeleton').show();
	$('#form-item-edit').hide();
	slideOverOpen('editItem');
	process_getEditItem(item_id);
});

//Submit new item
$('#form-item-new').submit(function(event){
	event.preventDefault();
	var formData = $(this).serialize();
	process_createItem(formData);
});

//Submit edit item
$('#form-item-edit').submit(function(event){
	event.preventDefault();
	var formData = $(this).serialize();
	process_editItem(formData);
});

//Delete a List Item
$("#form-item-edit-delete").click(function(event){
	var item_id = $(this).attr('data-id');
	process_deleteItem(item_id);
});

//Debug refresh
$("#refresh-button").click(function(event){
	event.preventDefault();
	$('.notice').hide();
	$('.list').hide();
	$('.list-skeleton').show();
	location.reload();
});
//Debug destroy
$("#destroy-button").click(function(event){
	event.preventDefault();
	localStorage.removeItem('token');
	location.reload();
});
