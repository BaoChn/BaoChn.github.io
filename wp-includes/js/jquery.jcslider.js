;(function($, document, window, undefined) {

    'use strict';

    var jcSlider = 

	    $.fn.jcSlider = function(options) {

	        var $this = $(this);
	        $this.css({'overflow':'hidden'});

	        // hide all items excepting first
	        $this.find('.jc-animation:not(:first)').hide();

	        // get settings
	        var settings = $.extend({
	            // default settings
	            animationIn     : 'bounceInRight',
	            animationOut    : 'bounceOutLeft',
	            stopOnHover     : true,
	            loop            : true
	        }, options );

	        var animateOut = 'animated ' + settings.animationOut,
	            animateIn =  'animated ' + settings.animationIn,
	            animationItem = $this.find('.jc-animation'),
	            animationItemsLength = animationItem.length,
	            animationCurrentItem = 0,
	            jcSliderInterval = null;


	        // Detect when animations (keyframes) end
	        function whichAnimationEvent() {
	          var t,
	              el = document.createElement('fakeelement');

	          var animations = {
	            'animation'      : 'animationend',
	            'OAnimation'     : 'oAnimationEnd',
	            'MozAnimation'   : 'animationend',
	            'WebkitAnimation': 'webkitAnimationEnd'
	          };

	          for (t in animations) {
	            if (el.style[t] !== undefined) {
	              return animations[t];
	            }
	          }
	        }
	        var animationEvent = whichAnimationEvent();


	        // main function
	        var jcSliderAnimation = function() {

	            jcSliderInterval = setInterval(function() {
	                
	                // stop animation if loop is false and we are on the last image
	                if (settings.loop === false && animationCurrentItem == (animationItemsLength -2)) {
	                    clearInterval(jcSliderInterval);
	                }

	                animationItem.eq(animationCurrentItem)
	                .removeClass(animateIn) // reset enter animation
	                .addClass(animateOut)   // exit animation

	                // when exit animation is finished, move next item
	               .one(animationEvent,

	                    function() {

	                        // move current item
	                        animationItem.eq(animationCurrentItem)
	                        .removeClass(animateOut) // reset exit animation
	                        .hide();      // hide

	                        // select next item
	                        animationCurrentItem ++;
	                        if (animationCurrentItem == animationItemsLength) {
	                            animationCurrentItem = 0;
	                        }

	                        // move next item
	                        animationItem.eq(animationCurrentItem)
	                        .show() // show
	                        .addClass(animateIn);  // next item animation

	                    });

	            }, 4000);
	        };

	        // Initialise the animation function
	        jcSliderAnimation();

	        if(settings.stopOnHover === true) {

	            // Stop the animation on hover
	            $this.hover(
	                function() {
	                    clearInterval(jcSliderInterval);
	                },
	                function(){
	                    jcSliderAnimation();
	                });
	        }
	    }
	;

})(window.jQuery || window.Zepto || window.$, document, window);
// Pending Zepto support


/*
 * Export as a CommonJS module
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = jcSlider;
}