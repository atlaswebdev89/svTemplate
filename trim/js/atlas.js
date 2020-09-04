/***********************************************************************************************
	* Variables
***************************************************************************************************/
  
	var $html = $('html'),
		$body = $('body'),
		$window = $(window),
		$pageUrl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1),
		$overlay = $('.global-overlay'),
		$offcavnas = $('.offcanvas-navigation');
		$header = $('.header'),		
		$headerInner = $('.header__inner');

/***********************************************************************************************
	* Открытие бокового вертикального меню
***************************************************************************************************/

$('.navbar-toggler').click(function () {
			$overlay.addClass('overlay-open');
			$offcavnas.addClass('menu-open');
			$body.addClass('body-open');
				if ($overlay.hasClass('overlay-open')) {
					$(this).find('div.icon').addClass("open");
				}
});

/***********************************************************************************************
	* Обработчик клика по overlay фону при открытом боковом меню. Меню при клике по фону закрывается
***************************************************************************************************/

$overlay.click(function (e) {
	e.preventDefault();
	e.stopPropagation();
		$overlay.removeClass('overlay-open');
		$offcavnas.removeClass('menu-open');
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
	* Аккордеон одна только открыта и найти родительское под меню
*****************************************************************/

$('span.menu-expand i').on('click', function (e) {
	e.preventDefault();	
	var $this = $(this);	
		$submenu = $this.parent().parent().children('.sub-menu');
		//скрываем все кроме того, что должны открыть
		$('.has-children ul.sub-menu').not($submenu).hide(300);
		$submenu.toggle(200);
});

/******************************************************
	* Active ItemMenu - Активный пункт меню
********************************************************/

$('.navbar a, .offcanvas-menu a').each(function() {
    	var url = window.location.pathname;
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
                		$(this).parents('.has-children').addClass('active');               
            }
});

/******************************************************
	* Scroll To Top - Кнопка возврата к верху страницы
********************************************************/

		var scrollTop = $(".scroll-to-top");
		$(window).on('scroll',function() {
			var topPos = $(this).scrollTop();

			if (topPos > 350) {
				$(scrollTop).css("opacity", "1");
			} else {
				$(scrollTop).css("opacity", "0");
			}
		}); 
		//Плавный переход к top page
		$(scrollTop).on('click',function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;
		}); 




