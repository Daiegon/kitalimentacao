$(document).ready(function () {
	$('.navbar-toggle').click(function(){
		var icone = $(this).find('span.glyphicon');
		if(icone.hasClass('glyphicon-menu-hamburger')){
			icone.removeClass('glyphicon-menu-hamburger');
			icone.addClass('glyphicon-remove');
			$(this).addClass('active');
		} else {
			icone.removeClass('glyphicon-remove');
			icone.addClass('glyphicon-menu-hamburger');
			$(this).removeClass('active');
		}
	});
	
	if ($.isSm() || $.isMd() || $.isLg() ) {
		var bannerHeight = $('#rowContent').height();
		$('.bannerWrapper').css('height', bannerHeight);
	}
	
	
});