function slideOverOpen(type){
	$('.slide-over__body').hide();
	$('.slide-over__head').removeClass('hidden');
	$('#slide-over-title').html('-');

	switch(type){
		case 'welcome':
		$('#slide-body-welcome').show();
		$('.slide-over__head').addClass('hidden');
		break;
		case 'menu':
		$('#slide-body-menu').show();
		$('#slide-over-title').html('Menu');
		break;
		case 'addItem':
		$('#slide-body-addItem').show();
		$('#slide-over-title').html('Add Item');
		break;
		case 'editItem':
		$('#slide-body-editItem').show();
		$('#slide-over-title').html('Edit Item');
		break;
	}

	$('body').addClass('no-scroll');
	$('.overlay').addClass('active');
	$('.slide-over').addClass('active');
}
function slideOverClose(){
	$('body').removeClass('no-scroll');
	$('.overlay').removeClass('active');
	$('.slide-over').removeClass('active');
}

if (localStorage.getItem("token") === null){//Does List ID exist
	slideOverOpen('welcome');
}else{
	process_refreshList();
	const interval = setInterval(function(){
		process_refreshList();
	}, 5000);
}
