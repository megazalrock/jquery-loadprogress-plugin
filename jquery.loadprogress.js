 /*
 * jQuery Load Progress Plugin 1.0
 * Author : Otto Kamiya (MegazalRock)
 * License : Dual licensed under the MIT or GPL Version 2 licenses.
 * Browser : Chrome23+ (Win/Mac) Firefox14+ (Win/Mac) Opera12+ (Win/Mac) Safari6+(Mac) IE9+(Win) IE8(Win)
 * Usage : http://
 */
(function(){
    $.extend({
    	loadprogress:function(_options){
    		_options = _options || {};
    		var options = {
    			imgSelector:'img',
    			easing:'swing',
    			duration:'1000',
    			showText:true
    		};
    		$.extend(options,_options);

			var bodyElem = document.getElementsByTagName('body')[0];
			bodyElem.style.overflow = 'hidden';
    		
    		var $_overlay = $('<div id="loadprogress-overlay" />');
    		$_overlay
    			.css({
    				height:$(window).height()
    			});
    		var $_box = $('<div id="loadprogress-box" />');
    		var $_bar = $('<div id="loadprogress-bar" />');
    		if(options.showText){
        		var $_text = $('<div id="loadprogress-text" />');
        		$_text.text('0%');
    		}
    		var $_img = $(options.imgSelector);
    		var imgNum = $_img.length;
    		var loadedNum = 0;
    		$_overlay
    			.appendTo($('body'))
    			.append($_box.append($_bar).append($_text));
    		$(window)
    			.one('loadprogressEnd',function(){
					$_bar
						.stop(true,false)
						.animate({
							width:'100%'
						},400,'swing');
					if(options.showText){
						$_text
							.text('100%');
					}
					$_overlay
						.delay(200)
						.fadeTo(options.duration,0,options.easing,function(){
							bodyElem.style.overflow = 'auto';
							$(this).remove();
						});
    			})
    			.bind('loadprogressProgress',function(e,loadedNum){
					$_bar
						.css({
							width:(loadedNum / imgNum * 100) + '%'
						});
					if(options.showText){
						$_text
							.text(Math.floor((loadedNum / imgNum) * 100) + '%');
					};
    			});
    		$_img.each(function(n){
    			$(this).one('load',function(){
    				loadedNum += 1;
    				if(imgNum === loadedNum){
    					$(window).trigger('loadprogressEnd');
    				}else{
    					$(window).trigger('loadprogressProgress',loadedNum);
    				}
    			});
    		});
    	}
    });
})(jQuery);