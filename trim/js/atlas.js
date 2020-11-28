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
/*******************************************************************************************************
 * Клонирование разделов мебели для мобильной навигации на странице каталога
 ********************************************************************************************************/
$('.js-clone-catalog').each(function() {
	var $this = $(this);
	$this.clone().attr('class', 'offcanvas-menu catalog-menu-clone').appendTo('.catalog-clone');
});
/*******************************************************************************************************
 * Клонирование подкаталога для страниц типов мебели
 ********************************************************************************************************/
$('.js-clone-filter').each(function() {
	var $this = $(this);
	$this.clone().attr('class', 'offcanvas-menu filter-menu-clone').appendTo('.filter-clone');
});

/***********************************************************************************************
	* Открытие бокового вертикального меню
***************************************************************************************************/

$('.navbar-toggler').click(function () {
	if($('.offcanvas-menu').find('.collapse li.active').length > 0)
	{
			let item = $('.offcanvas-menu').find('.collapse li.active').closest('.collapse');
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


/*Parallax*/
if ($(window).width() > 992) {
	$(".parallaxie").parallaxie({
		speed: 0.7,
		offset: 0,
	});
}else  {
	$(".parallaxie").css('background-position', 'center').css( 'background-size', 'cover');
}


/*******************************************************************************************************
 * Валидиция данных форм
 ********************************************************************************************************/

/* MaskInputPhone*/
/* ===================================================== */
$('.phone').mask("+375 (99) 999-99-99",
	{
		completed: function(){
			console.log("OK");
		}
	});
/* ===================================================== */

/* Validate for form  */
/* Кнопка должна быть type=submit. Если type=button - надо добавить обработчик click и проверку валидации запускать вручную */

/* Botton for Clear input form */
$('.clear').on('click', function (e) {
	e.preventDefault();
	$(this).closest('.clear-form')[0].reset();
});

/* Изменение поведения placeholder при событиях фокусировке и потере фокуса */
$('form').find('input, textarea').each(function (e) {
	let input= $(this);
	let placeholder =input.attr('placeholder');
	input.on('focus', function (e) {
		$(this).attr('placeholder','');
	})
	input.on('blur', function (e) {
		$(this).attr('placeholder',placeholder);
	});
});
/* === */
/* ФОРМА ЗАКАЗА ЗВОНКА */
$('.callBack-form').validate({
	rules: {
		name:{
			required:true,
			minlength: 2
		},
		phone:{
			required:true,
			minlength: 19
		},
	},
	errorPlacement: function (error, element) {},
	submitHandler: function(form) {
		urlencodeForm(form);
	}
});

/* Форма в модальном окне оставить заявку на главной странице*/
$('.feedBackForm-form, .question-form').validate({
	rules: {
		name:{
			required:true,
			minlength: 2
		},
		email:{
			email: true,
			required:true,
		},
		message: {
			required: true,
			minlength: 2
		},
	},
	errorPlacement: function (error, element) {},
	submitHandler: function(form) {
		urlencodeForm(form);
	}
});

/*Форма на главной странице и страницы контактов*/
$('.mainPage-form, .contactPage-form').validate({
	rules: {
		name: {
			required: true,
			minlength: 2
		},
		subject: {
			required: true,
			minlength: 4
		},
		email: {
			required: true,
			email: true
		},
		message: {
			required: true,
			minlength: 10
		},
	},
	messages: {
		name: {
			required: "Заполните поле",
			minlength: "Слишком коротное имя"
		},
		email: {
			required: "Заполните поле",
			email: "Укажите email адрес"
		},
		message: {
			required: "Заполните поле",
			minlength: "Еще что-нибудь напишите"
		},
	},
	errorClass: "has-error",
	submitHandler: function(form) {
		console.log("123");
		urlencodeForm(form);
	},
});


function dataForm (form) {
	let formData = new FormData(form);
	ajaxTransfer(form, formData);
}

function urlencodeForm(form) {
	let form_encode = $(form).serialize();
	ajaxTransferUrlEncode(form, form_encode);
}

/*Функция передачи данных формы*/
function ajaxTransferUrlEncode(forma, dataForm) {
	let uri = 'test.php';
	let form =$(forma);
	$.ajax({
		type: 'POST',
		url:uri,
		processData: false,
		data:dataForm,
		timeout: 5000,
		//Указывая тип json использовать функцию JSON.parse не надо будет ошибка
		dataType: "json",
		beforeSend: function (data) {
			//Блокируем кнопку и элементы формы
			form.find('button, input, textarea').attr('disabled', 'disabled');
			form.append("<div id='loading' class='text-center p-3'></div>");
		},
		success:  function (data) {
			form.find('#loading').remove();
			if(data) {
				//Если ошибок нет, очищаем форму
				if(data.status == true){
					//Очистка формы
					form[0].reset();
					//Включение кнопки и элементов формы
					form.find('button, input, textarea').removeAttr('disabled');
					form.find('#response_order').remove();
					form.append("<div id='response_order' class=''><p class='msg text-center m-0 pb-3'></p> </div>");
					form.find("p.msg").html(data.message);
					form.find("p.msg").addClass("msg-success").fadeIn("slow");
					setTimeout(function () {
						//Если форма в модально окне, закрываем модальное окно при успехе
						if (form.closest('.modal').hasClass('modal')) {
							form.closest('.modal').modal( 'hide' );
						}
						$('p.msg').fadeOut("slow").removeClass('msg-success').html("");
					}, 3000);
				}else {
					form.find('#response_order').remove();
					form.append("<div id='response_order' class=''><p class='msg text-center m-0 pb-3'></p> </div>");
					form.find("p.msg").html(data.message);
					form.find("p.msg").addClass("msg-error").fadeIn("slow");
					setTimeout(function () {
						$('p.msg').fadeOut("slow");
						//Включение кнопки и элементов формы
						form.find('button,input, textarea').removeAttr('disabled');
					},2000);
				}
			}
		},
		error: function(x, t, e){
			if( t === 'timeout') {
				// Произошел тайм-аут
				form.find('#loading').remove();
				//Очистка формы
				form[0].reset();
				//Включение кнопки и элементов формы
				form.find('button,input, textarea').removeAttr('disabled');
				form.find('#response_order').remove();
				form.append("<div id='response_order' class=''><p class='msg text-center m-0 pb-3'></p> </div>");
				form.find("p.msg").html('Превышено время ожидания');
				form.find("p.msg").addClass("msg-error").fadeIn("slow");
				setTimeout(function() { $('p.msg').fadeOut("slow"); }, 3000);
			}
		}
	})
}





