// Variables

	var $html = $('html'),
		$body = $('body'),
		$window = $(window),
		$pageUrl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1),
		$overlay = $('.global-overlay'),
		$header = $('.header'),		
		$headerInner = $('.header__inner');
		



$('.navbar-toggler').click(function () {
	$('.global-overlay').addClass('overlay-open');
	$('.offcanvas-navigation').addClass('menu-open');
	$('body').addClass('body-open');
});
$('.global-overlay').click(function () {
	$('.global-overlay').removeClass('overlay-open');
	$('.offcanvas-navigation').removeClass('menu-open');
	$('body').removeClass('body-open');
});

$('.btn-close').on('click', function(e){
	e.preventDefault();
	var $this = $(this);
	 		$this.parents('.menu-open').removeClass('menu-open');
		$($overlay).removeClass('overlay-open');
	});