$("#close-slide-button").click(function(event){
	event.preventDefault();

	$('body').removeClass('no-scroll');
	$('.overlay').removeClass('active');
	$('.slide-over').removeClass('active');
});
$("#add-item-button").click(function(event){
	event.preventDefault();

	$('body').addClass('no-scroll');
	$('.overlay').addClass('active');
	$('.slide-over').addClass('active');
});

$('.item .check').click(function(event){
	if($(this).parent('.item').hasClass('checked')){
		$(this).parent('.item').removeClass('checked');
	}else{
		$(this).parent('.item').addClass('checked');
	}
});
