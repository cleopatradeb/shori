$.fn.scrollHero = function(options) {

	// if no one passes options, set options to blank object
	var options = options || {};

	$(window).on('scroll',function(){

		//Getting the scroll percentage
		var windowHeight = $(window).height();
		var scrollHeight = $(window).scrollTop();
		var scrollPercentage =  (scrollHeight / windowHeight);

		//blur filter
		var maxBlur = 15; // the max blur it can be
		var blurRatio = 100 / maxBlur; //height of the window
		var blurAmount = scrollPercentage * blurRatio; //for every 10% scrolled, blur it 1px
		
		//brightness filter
		var brightnessPercentage = 100 - Math.round(scrollPercentage * 100);
		
		//grayscale filter
		var grayscalePercentage = 0 + Math.round(scrollPercentage * 120);

		var filters = 'blur('+blurAmount+'px)'; 

		if(options.brightness) {
			filters = 'brightness('+ brightnessPercentage + '%)';
		}

		if(options.grayscale) {
			filters = 'grayscale('+ grayscalePercentage + '%)';
		}

		$('.image-1, .image-2, .image-3, .image-4, .image-5').css({
			'-webkit-filter' : filters
		});


}); //END window.scroll

} //END scrollHero