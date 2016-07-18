/**
 * 定义 1. 各屏幕加载执行流； 2. 十字架准星； 3. 
 */
define(['jquery', 'EventUtil'], function ($, EventUtil){
	// var $vrWuspace = document.getElementById("vrWuspace");
	// if ($vrWuspace.getContext) {
	// 	var context = $vrWuspace.getContext("2d");
	// 	context.translate(0.5,0.5);
	// 	context.strokeStyle = "#fff";
	// 	context.lineWidth = "1";
	// 	context.beginPath();
	// 	context.moveTo(0, 100);
	// 	context.lineTo(600, 100);
	// 	context.moveTo(100, 0);
	// 	context.lineTo(100, 800);
	// 	context.stroke();

	// }
	// console.log("drawing");

	var crossProcessor = {
		timeoutId: null,
		performProcessing: function() {
			$('.cross-layout').hide();
		},
		process: function() {
			clearTimeout(this.timeoutId);
			var that = this;
			this.timeoutId = setTimeout(function() {
				that.performProcessing();
			}, 1000);
		}
	};

	var mouseMoveHandler = function(event) {
		event = EventUtil.getEvent(event);
		// console.log("x = " + event.pageX + ", y = " + event.pageY);
		$('#crossPointer').css({
			"top": "calc(" + event.pageY + "px - 0.25rem)",
			"top": "-webkit-calc(" + event.pageY + "px - 0.25rem)",
			"left": "-calc(" + event.pageX + "px - 0.25rem)",
			"left": "-webkit-calc(" + event.pageX + "px - 0.25rem)",
		});
		$('#crossPointerSmall').css({
			"top": "calc(" + event.pageY + "px - 0.15rem)",
			"top": "-webkit-calc(" + event.pageY + "px - 0.15rem)",
			"left": "-calc(" + event.pageX + "px - 0.15rem)",
			"left": "-webkit-calc(" + event.pageX + "px - 0.15rem)",
		});
		$('.cross-x').css({"margin-top": "" + event.pageY + "px"});
		//  parseInt(window.getComputedStyle(document.documentElement)["fontSize"])
		var left = -window.innerWidth + event.pageX;
		// console.log("marginLeft = " + marginLeft);
		$('.cross-y').css({
			"left": "-calc(" + event.pageX + "px - 300vw)",
			"left": "-webkit-calc(" + event.pageX + "px - 300vw)",
			"right": "0"
			// "left": "" + marginLeft + "px",
		});
		$('.cross-layout').show();
		crossProcessor.process();
	};

	var initCross = function() {
		EventUtil.addHandler(document, "mousemove", mouseMoveHandler);
		$('.cross-layout').hide();
	};

	var gotoHome = function($current) {
		$('.vr-nav-bottom-layout').removeClass('vr-nav-bottom-layout-overlay');
		$('.vr-page-current').removeAttr('style');
    $('.vr-nav-bottom-layout').show();
    closeMenuArticle();
		var $current = $('.vr-page-current').eq(0);
		if ($current.hasClass('vr-1')) {return }
		EventUtil.addHandler(document, "mousemove", mouseMoveHandler);
		if (!window.isMobile) {$('.cross-layout').show(); }
		$('video').show();
		changeNavItemState();
		backToInitState($current);
		$current
			.removeClass('vr-page-moveFromBottom')
			.addClass('vr-page-moveToBottom')
			.removeClass('vr-page-current');
		$('#vrHome')
			.removeClass('vr-page-moveToTop')
			.addClass('vr-page-current vr-page-moveFromTop');

		return 0; // pageIndex
	}

	var gotoMenu = function($current) {
		var $current = $('.vr-page-current').eq(0);
		var $menuArticle = $('#menuArticle');
		if ($('.vr-article-menu').hasClass('vr-page-current')) {
			closeMenuArticle();
			return;
		}
		document.body.scrollTop = 0;
		$('.vr-page-current').css({'position': 'fixed'});
    $('.vr-nav-bottom-layout').hide();
		$('.vr-menu-fake-icon').css({'width': '0.79625rem'});
		$('#vrMenu2').css({'border-color':'#000'});
		$('#vrMenu1').addClass('vr-menu-close-top-effect');
		$('#vrMenu3').addClass('vr-menu-close-bottom-effect');
		changeNavItemState();
		// backToInitState($current);
		$menuArticle
			.removeClass('vr-page-moveToTop')
			.addClass('vr-page-current vr-page-moveFromTop');
			// $('.vr-menu-article').toggle();
	}

	var gotoAboutUs = function($current) {
		$('.vr-nav-bottom-layout').addClass('vr-nav-bottom-layout-overlay');
		document.body.scrollTop = 0;
		$('.nav-clicked').removeClass('nav-clicked');
		$('#aboutUs').addClass('nav-clicked');
		var $current = $('.vr-page-current').eq(0);
		if ($current.hasClass('vr-aboutus')) {return }
		backToInitState($current);
		$('.cross-layout').hide();
		changeNavItemState($('#aboutUs'));
		$current
			.removeClass('vr-page-moveFromTop')
			.addClass('vr-page-moveToTop')
			.removeClass('vr-page-current');
		$('#vrAboutUs')
			.removeClass('vr-page-moveToBottom')
			.addClass('vr-page-current vr-page-moveFromBottom');
		setTimeout(function() {
			$('h2', '#vrAboutUs .vr-article-content')
				.removeClass('vr-item-moveFromBottom move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 1000);
		setTimeout(function() {
			$('p', '#vrAboutUs .vr-article-content')
				.removeClass('vr-item-moveFromBottom move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 1500);
	}

	var gotoService = function($current) {
		$('.vr-nav-bottom-layout').addClass('vr-nav-bottom-layout-overlay');
		$('.nav-clicked').removeClass('nav-clicked');
		$('#service').addClass('nav-clicked');
		var $current = $('.vr-page-current').eq(0);
		if ($current.hasClass('vr-service')) { return }
		backToInitState($current);
		$('body').addClass('service-bg');
		$('.cross-layout').hide();
		changeNavItemState($('#service'));
		$current
			.removeClass('vr-page-moveFromTop')
			.addClass('vr-page-moveToTop')
			.removeClass('vr-page-current');
		$('#vrService')
			.removeClass('vr-page-moveToBottom')
			.addClass('vr-page-current vr-page-moveFromBottom');
		setTimeout(function() {
			$('.vr-article-content', '#vrService')
				.removeClass('vr-item-moveFromBottom move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 800);
	}

	var gotoIncubator = function($current) {
		document.body.scrollTop = 0;
		$('.vr-nav-bottom-layout').addClass('vr-nav-bottom-layout-overlay');
		$('.nav-clicked').removeClass('nav-clicked');
		$('#incubator').addClass('nav-clicked');
		var $current = $('.vr-page-current').eq(0);
		if ($current.hasClass('vr-incubator')) { return }
		backToInitState($current);
		$('body').addClass('scroll--hack');
		$('.cross-layout').hide();
		changeNavItemState($('#incubator'));
		$current
			.removeClass('vr-page-moveFromTop')
			.addClass('vr-page-moveToTop')
			.removeClass('vr-page-current');
		$('#vrIncubator')
			.removeClass('vr-page-moveToBottom')
			.addClass('vr-page-current vr-page-moveFromBottom');
		setTimeout(function() {
			$('.incubator-addr').addClass('vr-circle-animation-effect');
			$('.incubator-content', '#vrIncubator')
				.removeClass('vr-item-moveFromBottom move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 500);
		setTimeout(function() {
			$('div', '.incubator-addr').removeClass('move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 2000);
	}

	var gotoVrNews = function($current) {
		document.body.scrollTop = 0;
		$('.vr-nav-bottom-layout').addClass('vr-nav-bottom-layout-overlay');
		$('.nav-clicked').removeClass('nav-clicked');
		$('#vrnews').addClass('nav-clicked');
		var $current = $('.vr-page-current').eq(0);
		if ($current.hasClass('vr-news')) { return }
		backToInitState($current);
		$('body').addClass('service-bg');
		$('.cross-layout').hide();
		changeNavItemState($('#vrnews'));
		$current
			.removeClass('vr-page-moveFromTop')
			.addClass('vr-page-moveToTop')
			.removeClass('vr-page-current');
		$('#vrNews')
			.removeClass('vr-page-moveToBottom')
			.addClass('vr-page-current vr-page-moveFromBottom');
		setTimeout(function() {
			$('.vr-article-content', '#vrNews')
				.removeClass('vr-item-moveFromBottom move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 800);
	}

	var gotoInTeam = function($current) {
		document.body.scrollTop = 0;
		$('.vr-nav-bottom-layout').addClass('vr-nav-bottom-layout-overlay');
		$('.nav-clicked').removeClass('nav-clicked');
		$('#inTeam').addClass('nav-clicked');
		var $current = $('.vr-page-current').eq(0);
		if ($current.hasClass('vr-inteam')) { return }
		backToInitState($current);
		$('body').addClass('scroll--hack');
		$('.cross-layout').hide();
		changeNavItemState($('#inTeam'));
		$current
			.removeClass('vr-page-moveFromTop')
			.addClass('vr-page-moveToTop')
			.removeClass('vr-page-current');
		$('#vrInteam')
			.removeClass('vr-page-moveToBottom')
			.addClass('vr-page-current vr-page-moveFromBottom');
		setTimeout(function() {
			$('.incubator-addr').addClass('vr-circle-animation-effect');
			$('.incubator-content', '#vrInteam')
				.removeClass('vr-item-moveFromBottom move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 800);
		setTimeout(function() {
			$('div', '.incubator-addr').removeClass('move-from-bottom--init')
				.addClass('vr-item-moveFromBottom');
		}, 2000);
	}

	var closeMenuArticle = function() {
		var $menuArticle = $('#menuArticle');
		$('#vrMenu1').addClass('vr-menu-close-ntop-effect');
		$('#vrMenu3').addClass('vr-menu-close-nbottom-effect');
		$menuArticle.removeClass('vr-page-moveFromBottom')
				.addClass('vr-page-moveToBottom')
				.removeClass('vr-page-current');
		$('.vr-menu-fake-icon').removeAttr('style');
		setTimeout(function() {
			$('#vrMenu2').removeAttr('style');
			$menuArticle.removeClass('vr-page-moveToBottom vr-page-moveFromTop');
			$('#vrMenu1').removeClass('vr-menu-close-top-effect vr-menu-close-ntop-effect');
			$('#vrMenu3').removeClass('vr-menu-close-bottom-effect vr-menu-close-nbottom-effect');
		}, 400);
	};

	var removeCrossHandler = function() {
		EventUtil.removeHandler(document, "mousemove", mouseMoveHandler);
	}

	var initMenu = function() {
		var $menuArticle = document.getElementById("menuArticle");
		EventUtil.addHandler($menuArticle, "click", function(event) {
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			$current = $('.vr-page-current').eq(0);
			switch (target.id) {
				case "menuPartner":
					closeMenuArticle();
					$logoAnimation = $('.vr-logo-animation-layout');
					$logoAnimation.removeClass('vr-page-moveToTop')
						.addClass('vr-page-current vr-page-moveFromTop');
					$('.vr-logo-animation', $logoAnimation).addClass('vr-circle-right-animation-effect');
					$('.vr-menu-article').toggle();
					setTimeout(function(){
						$logoAnimation
							.removeClass('vr-page-moveFromTop')
							.addClass('vr-page-moveToTop')
							.removeClass('vr-page-current');
						backToInitState($current);
						$('.cross-layout').hide();
						$current
							.removeClass('vr-page-moveFromTop')
							.addClass('vr-page-moveToTop')
							.removeClass('vr-page-current');
						$('#vrPartner')
							.removeClass('vr-page-moveToBottom')
							.addClass('vr-page-current vr-page-moveFromBottom');
						$('.vr-logo-animation', $logoAnimation).removeClass('vr-circle-right-animation-effect');
					}, 2000);
					break;
				case "menuCall":
					closeMenuArticle();
					$logoAnimation = $('.vr-logo-animation-layout');
					$logoAnimation.removeClass('vr-page-moveToTop')
						.addClass('vr-page-current vr-page-moveFromTop');
					$('.vr-logo-animation', $logoAnimation).addClass('vr-circle-right-animation-effect');
					$('.vr-menu-article').toggle();
					setTimeout(function(){
						$logoAnimation
							.removeClass('vr-page-moveFromTop')
							.addClass('vr-page-moveToTop')
							.removeClass('vr-page-current');
						backToInitState($current);
						$('.cross-layout').hide();
						$current
							.removeClass('vr-page-moveFromTop')
							.addClass('vr-page-moveToTop')
							.removeClass('vr-page-current');
						$('#vrContact')
							.removeClass('vr-page-moveToBottom')
							.addClass('vr-page-current vr-page-moveFromBottom');
						$('.vr-logo-animation', $logoAnimation).removeClass('vr-circle-right-animation-effect');
					}, 3000);
					break;
			}
		})
	};

	var backToInitState = function($current) {
		$current.removeClass('vr-page-moveFromBottom vr-page-moveToTop');

		$('body').removeClass('service-bg scroll--hack');
		$('.vr-article-content', '#vrNews').addClass('move-from-bottom--init').removeClass('vr-item-moveFromBottom');
		$('.vr-article-content', '#vrService').addClass('move-from-bottom--init').removeClass('vr-item-moveFromBottom');
		$('.incubator-content', '#vrIncubator').addClass('move-from-bottom--init').removeClass('vr-item-moveFromBottom');
		$('h2', '#vrAboutUs .vr-article-content').addClass('move-from-bottom--init').removeClass('vr-item-moveFromBottom');
		$('p', '#vrAboutUs .vr-article-content').addClass('move-from-bottom--init').removeClass('vr-item-moveFromBottom');
		$('.incubator-addr').removeClass('vr-circle-animation-effect');
		$('div', '.incubator-addr').addClass('move-from-bottom--init').removeClass('vr-item-moveFromBottom');
	}

	var changeNavItemState = function($selector) {
		if ($selector) {
			$('video').hide();
			$('a span', $selector.parent()).removeAttr('style');
			$('span:first', $selector).css({'opacity': '0.67'});
			$('.nav-bottom-text', $selector).css({'color': '#fff'});
		} else {
			$('a span', '.vr-nav-bottom-layout').removeAttr('style');
		}
	};

	var initEvent = function() {
		var $menuArticle = $('.vr-menu-article');
		var $menuClose = $('.vr-menu-close')
		$menuClose.click(function(event) {
			$menuArticle.toggle();
		});
	};

	return {
		initMenu: initMenu,
		initCross: initCross,
		initEvent: initEvent,
		removeCrossHandler: removeCrossHandler,
		gotoHome: gotoHome,
		gotoMenu: gotoMenu,
		gotoAboutUs: gotoAboutUs,
		gotoService: gotoService,
		gotoIncubator: gotoIncubator,
		gotoVrNews: gotoVrNews,
		gotoInTeam: gotoInTeam,
	};
});