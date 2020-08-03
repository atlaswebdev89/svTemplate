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
	$('.navbar-toggler div').toggleClass("open");

});

$('.global-overlay').click(function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('.global-overlay').removeClass('overlay-open');
	$('.offcanvas-navigation').removeClass('menu-open');
	$('body').removeClass('body-open');
	$('.navbar-toggler div').toggleClass("open");
});

$('.btn-close').on('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	var $this = $(this);
	 		$this.parents('.menu-open').removeClass('menu-open');
			$($overlay).removeClass('overlay-open');
			$('.navbar-toggler div').toggleClass("open");
			$('body').toggleClass('body-open');
	});


//Сделать аккордеон одна только открыта и найти родительское под меню
//Скрипт выделения активного меню
$('span.menu-expand i').on('click', function (e) {
	e.preventDefault();	
	var $this = $(this);	
		$submenu = $this.parent().parent().children('.sub-menu');
		//скрываем все кроме того, что должны открыть
		$('.has-children ul.sub-menu').not($submenu).hide(200);
		$submenu.toggle(300);
	
  
});

	

//защита от двойного клика 
// кнопка возврата к верху страницы
//Активный пункт меню (основном и offcavnas)
//Эффекты в боковое меню