/***********************************************************************************************
	* Variables
***************************************************************************************************/
  
	var $html = $('html'),
		$body = $('body'),
		$window = $(window),
		$pageUrl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1),
		$overlay = $('.global-overlay'),
		$offcavnas = $('.offcanvas-navigation');
		$SubmenuOffcavnas = $('.offcanvas-submenu-navigation');
		$header = $('.header'),		
		$headerInner = $('.header__inner');

/*******************************************************************************************************
 * Клонирование меню для мобильной версии
 ********************************************************************************************************/
$('.js-clone-nav').each(function() {
	var $this = $(this);
	$this.clone().attr('class', 'offcanvas-menu main-menu-clone').appendTo('.menu-clone');
});
$('.main-menu-clone').find('a').each(function () {
	$(this).removeClass();
})
$('.main-menu-clone .has-children').find('i').remove();
setTimeout(function() {
	var counter = 0;
	$('.main-menu-clone .has-children').each(function(){
		var $this = $(this);
		$this.prepend('<span class="arrow-collapse collapsed menu-expand"><i class="fa fa-angle-up"></i></span>');
		$this.find('.arrow-collapse').attr({
			'data-toggle' : 'collapse',
			'data-target' : '#collapseItem' + counter,
		});
		$this.find('> ul').attr({
			'class' : 'collapse',
			'id' : 'collapseItem' + counter,
		});
		counter++;
	});
}, 2);

$('body').on('click', '.arrow-collapse', function(e) {
	var $this = $(this);
	if ( $this.closest('li').find('.collapse').hasClass('show') ) {
		$this.removeClass('active');
	} else {
		$this.closest('.site-nav-wrap').find('.has-children').each(function () {
			$(this).find('.arrow-collapse').removeClass('active').addClass('collapsed');
			$(this).find('.collapse').collapse('hide');
		});
		$this.addClass('active');
	}
	e.preventDefault();
});

/***********************************************************************************************
	* Открытие бокового вертикального меню
***************************************************************************************************/

$('.navbar-toggler').click(function () {
	if($('.offcanvas-menu').find('.collapse li.active').length > 0)

	{

			let item = $('.offcanvas-menu').find('.collapse li.active').closest('.collapse');
		console.log(item);
			let has_children = item.parent();
			if(!item.hasClass('show'))
			{
				item.collapse('show');
			}
			if (!has_children.children('.arrow-collapse').hasClass('active')){
				has_children.children('.arrow-collapse').addClass('active');
			}
	}
	$overlay.addClass('overlay-open');
	$offcavnas.addClass('menu-open');
	$body.addClass('body-open');
	//Смена кнопки открытия меню
	if ($overlay.hasClass('overlay-open')) {
		$(this).find('div.icon').addClass("open");
	}
});

/***********************************************************************************************
 * Открытие бокового вертикального подменю для разделом каталога
 ***************************************************************************************************/

$('.submenu-offcavnas').click(function (e) {
	e.preventDefault();
	$overlay.addClass('overlay-open');
	$SubmenuOffcavnas.addClass('menu-open');
	$body.addClass('body-open');
});


/***********************************************************************************************
	* Обработчик клика по overlay фону при открытом боковом меню. Меню при клике по фону закрывается
***************************************************************************************************/

$overlay.click(function (e) {
	e.preventDefault();
	e.stopPropagation();
		$overlay.removeClass('overlay-open');
		$offcavnas.removeClass('menu-open');
		$SubmenuOffcavnas.removeClass('menu-open');
		$('body').removeClass('body-open');
		$('.navbar-toggler div').removeClass("open");
});


/******************************************************************
	* Обработчик клика на крестику в боковом вертикальном меню
*******************************************************************/

$('.btn-close').on('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	var $this = $(this);
	 		$this.parents('.menu-open').removeClass('menu-open');
			$overlay.removeClass('overlay-open');
			$('.navbar-toggler div').removeClass("open");
			$body.toggleClass('body-open');
	});

/*****************************************************************
	* Аккордеон для меню с иерархией одна только открыта и найти родительское под меню
*****************************************************************/

$('span.menu-expand i').on('click', function (e) {
	e.preventDefault();	
	var $this = $(this);	
		$submenu = $this.parent().parent().children('.sub-menu');
		//скрываем все кроме того, что должны открыть
		$('.has-children ul.sub-menu').not($submenu).hide(300);
		$submenu.slideToggle(300);


});

/******************************************************
	* Active ItemMenu - Активный пункт меню
********************************************************/
		//Url текущей страницы
		var url = window.location.pathname;
		var arr =[
						//Ссылки в главном меню
						$('.navbar a'),
						//Ссылки в боковом меню и меню фильтра
						$('.offcanvas-menu a'),
						//Ссылки в sidebar
						$('.parent-ul a')
			];
//Проход по всем ссылкам
$.each(arr, function (index, value){
		var elem = value;

		//Поиск ссылок в каждом элементе из массива arr
		elem.each(function() {
		var index = $(this).attr('href');
		if (index == '/' && index == url){
			$(this).parent().addClass('active');
		}else if (index == '/') {
			index = '/index.html/';
		}
		//Поиск в строке pathUri искомого URL при вложенной структуре меню
		if ((url.indexOf(index)) > -1)
		{
			$(this).parent().addClass('active');
			//Проверка наличия родительского элемента
			$(this).parent().parent('.sub-menu').show(200);
			$(this).parents('.has-children').addClass('active');
		}
	});
})


/*******************************************************************************************************
	* Scroll To Top - Кнопка возврата к верху страницы, Кнопка появления кнопки фильтра в каталоге
********************************************************************************************************/

		var scrollTop = $(".scroll-to-top");
		var filter_catalog = $(".submenu-offcavnas");
		$(window).on('scroll',function() {
			var topPos = $(this).scrollTop();
			if (topPos > 350) {
				$(scrollTop).css("opacity", "1");
				$(filter_catalog).css("opacity", "1");
			} else {
				$(scrollTop).css("opacity", "0");
				$(filter_catalog).css("opacity", "0");
			}
		}); 
		//Плавный переход к top page
		$(scrollTop).on('click',function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;
		});


/*******************************************************************************************************
 * Форма проверки и отправки Заказать звонок
 ********************************************************************************************************/
$('#exp').click(function () {
	$('#response_order p').text("Спасибо. Мы скоро с вами свяжемся! Спасибо. Мы скоро с вами свяжемся!")
		.addClass("success_massage");
	setTimeout(function(){
						$('#response_order p').removeClass("success_massage");
		$('#response_order p').empty();
		$("#callBack").modal("hide");
					}, 2000);
})


/*Parallax*/
if ($(window).width() > 992) {
	$(".parallaxie").parallaxie({
		speed: 0.7,
		offset: 0,
	});
}else  {
	$(".parallaxie").css('background-position', 'center').css( 'background-size', 'cover');
}



