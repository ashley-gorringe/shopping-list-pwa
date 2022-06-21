var apiUrl = 'https://shoppinglist-api.splycd.co.uk';
//var apiUrl = 'http://shoppinglistapi:8888';

function process_createList(){
	$.ajax({
        type: "GET",
        url: apiUrl+'/list/new',
        dataType: 'json',
        success: function(response){
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				console.log(response.token);
				localStorage.setItem('token', response.token);
				location.reload();
            }
        }
    });
}

function process_joinList(formData){
	$.ajax({
        type: "GET",
        url: apiUrl+'/list/join?'+formData,
        dataType: 'json',
        success: function(response){
            console.log(response);
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				console.log(response.token);
				localStorage.setItem('token', response.token);
				location.reload();
            }
        }
    });
}

function process_refreshList(){
	//console.log('Start List Refresh');
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/list/get?token='+token,
        dataType: 'json',
        success: function(response){
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				var itemsMarkup = '';

				//console.log(response.items);
				var items = response.items;
				$.each(items,function(key,item){
					if(item['checked'] == 1){
						var checked = ' checked';
					}else{
						var checked = '';
					}

					if(item['description']){
						var description = '<span class="item-description">'+item['description']+'</span>';
					}else{
						var description = '';
					}

					itemsMarkup += `
					<div class="item`+checked+`" data-id="`+item['id']+`">
						<button class="check"></button>
						<button class="content">
							<span class="item-name">`+item['name']+`</span>
							`+description+`
						</button>
					</div>
					`;
				});

				if(items.length < 1){
					$('.notice').show();
				}
				$('.list').html(itemsMarkup);
				$('.list').show();
				$('.list-skeleton').hide();
				//console.log('End List Refresh');
            }
        }
    });
}

function process_shareList(){
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/list/share?token='+token,
        dataType: 'json',
        success: function(response){
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				var code = response.code;

				$('#list-code').html(code);
				$('.list-code__box').show();
				$('#share-button').hide();
				//console.log('End List Refresh');
            }
        }
    });
}

function process_createItem(formData){
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/item/new?token='+token+'&'+formData,
        dataType: 'json',
        success: function(response){
            console.log(response);
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				var item = response.item;
				if(item['checked'] == 1){
					var checked = ' checked';
				}else{
					var checked = '';
				}
				if(item['description']){
					var description = '<span class="item-description">'+item['description']+'</span>';
				}else{
					var description = '';
				}
				$('.notice').hide();
				$('.list').prepend(`
					<div class="item`+checked+`" data-id="`+item['id']+`">
						<button class="check"></button>
						<button class="content">
							<span class="item-name">`+item['name']+`</span>
							`+description+`
						</button>
					</div>
					`);
				slideOverClose();
				$('#form-item-new').trigger("reset");
				$('.list').show();
				$('.list-skeleton').hide();
            }
        }
    });
}

function process_getEditItem(item_id){
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/item/getEdit?token='+token+'&item='+item_id,
        dataType: 'json',
        success: function(response){
			console.log(response);
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				$('#form-item-edit').trigger("reset");
				$('#form-item-edit-id').val(response.item_id);
				$('#form-item-edit-name').val(response.name);
				$('#form-item-edit-description').html(response.description);
				$('#form-item-edit-delete').attr('data-id',response.item_id);
				$('#form-item-edit-skeleton').hide();
				$('#form-item-edit').show();
			}
        }
    });
}

function process_editItem(formData){
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/item/edit?token='+token+'&'+formData,
        dataType: 'json',
        success: function(response){
			console.log(response);
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				slideOverClose();
				$('#form-item-edit').trigger("reset");
				process_refreshList();
			}
        }
    });
}

function process_deleteItem(item_id){
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/item/delete?token='+token+'&item='+item_id,
        dataType: 'json',
        success: function(response){
			console.log(response);
            if(response.status == 'error'){
				console.error(response.message);
            }else if(response.status == 'success'){
				slideOverClose();
				$('#form-item-edit').trigger("reset");
				process_refreshList();
			}
        }
    });
}

function process_checkItem(item_id){
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/item/check?token='+token+'&item='+item_id,
        dataType: 'json',
        success: function(response){
            if(response.status == 'error'){
				console.error(response.message);
            }
        }
    });
}
function process_unCheckItem(item_id){
	let token = localStorage.getItem('token');
	$.ajax({
        type: "GET",
        url: apiUrl+'/item/uncheck?token='+token+'&item='+item_id,
        dataType: 'json',
        success: function(response){
            if(response.status == 'error'){
				console.error(response.message);
            }
        }
    });
}
