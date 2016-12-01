// shift slider on hover
;(function ($) {
	$(window).on('load', function(){
		function ShiftSlide(){
			this.prev = $('.slick-prev');
			this.next = $('.slick-next');
		}

		ShiftSlide.prototype.init = function(){
			var self = this;
			this.actionUi(self);
		}

		ShiftSlide.prototype.actionUi = function(self){
			this.shiftFunc = function(element, transVal, someSlide){
				self.parent = $(element).closest('.slick-carousel');
				self.currentSlide = $(self.parent).find('.slick-current');
				self.nextSlide = $(self.currentSlide).next('.slick-slide');
				self.prevSlide = $(self.currentSlide).prev('.slick-slide');	
				self.currentSlide.css('transform', 'translateX(' + transVal + ')');	
				self[someSlide].css('transform', 'translateX(' + transVal + ')');	
			}
			this.shiftFuncMouseOut = function(someSlide){
				self.currentSlide.css('transform', 'translateX(0)');
				self[someSlide].css('transform', 'translateX(0)');				
			}

			this.prev.mouseover(function(){
				self.shiftFunc(this, '10%', 'prevSlide');
			})
			this.prev.mouseout(function(){
				self.shiftFuncMouseOut('prevSlide');			
			})

			this.next.mouseover(function(){
				self.shiftFunc(this, '-10%', 'nextSlide');
			})
			this.next.mouseout(function(){
				self.shiftFuncMouseOut('nextSlide');				
			})
		}

		var shift = new ShiftSlide();
		shift.init();
	})
})(jQuery);

// play/pause video
(function($){
	$(window).on('load', function(){
		var windowSize = $(window).width();

		$('.slick-carousel').on('afterChange beforeChange', function(event, slick, currentSlide){
			if (windowSize < 1024) return false;
			var video = $('video');
			var current = $(this).find('.slick-current');
			var currentVideo = current.find('video');
			currentVideo.each(function(i, value){
				console.log(value);
				if(currentVideo && event['type'] == 'afterChange'){
					value.play();
				} else{
					value.pause();
				}		
			})

		})
		
	})
})(jQuery);

// show/hide menu on scroll
var getHeader = document.getElementsByTagName('header');
var headerElement = getHeader[0];
var headerSourceBottom = headerElement.getBoundingClientRect().bottom;

var getFirstScreen = window.innerHeight;
var firstScreen = getFirstScreen + window.pageYOffset;

var prevOffset = window.pageYOffset;

    window.onscroll = function() {
    	if (prevOffset <= window.pageYOffset){
    		if (window.pageYOffset > headerSourceBottom){
    			headerElement.classList.add('is-fixed');
    		}
			if (headerElement.classList.contains('show-header') && window.pageYOffset > getFirstScreen ){
				headerElement.classList.remove('show-header');
			}
			// console.log('down');
    	} else {
    		if (headerElement.classList.contains('is-fixed') && window.pageYOffset < headerSourceBottom){
    			headerElement.classList.remove('is-fixed');
    		}
    		if (window.pageYOffset < getFirstScreen){
    			headerElement.classList.remove('show-header');
    		} else {
    			headerElement.classList.add('show-header');
    		}
    		
			//console.log('up');
    	}

    prevOffset = window.pageYOffset;

    };

// data-animate sections
(function($){
	$(window).on('load', function(){
		var windowWdth = $(window).width();
		var sections = $('*[data-animate="animate"]');
		var sectionsOnLoad = $('*[data-animate="onload"]');

		if (sectionsOnLoad) {
			sectionsOnLoad.addClass("animate");
		}
		if (windowWdth < 1024) {
			sections.addClass("animate");
		} else {
			$(window).on('scroll', function(){
				sections.each(function(i, value){
					if ($(document).scrollTop() + $(window).height() > $(value).offset().top && $(document).scrollTop() - $(value).offset().top < $(value).height()){ 
						$(value).addClass("animate");
					}
				}); 
			})   
		}  
	})
})(jQuery);


// load img on scroll
(function ($){
	var img = $('img[data-src]')
	var lastImg = 0;
	
	$(window).on('scroll', function(){
		var lastImageValue = img[lastImg];
		if (lastImg < img.length) {
			if ($(document).scrollTop() + $(window).height() > $(lastImageValue).offset().top - 200 && $(document).scrollTop() - $(lastImageValue).offset().top - 200 < $(lastImageValue).height()){ 
				var fiveImg = lastImg + 5;
				for (i = lastImg; i < fiveImg; i++) {
					if (i > img.length - 1) {break;} 
					var value = img[i];				
					$(value).attr('src', $(value).attr('data-src'));								
					lastImg = i + 1;
				}			
			}			
		}
	}); 
}(jQuery));