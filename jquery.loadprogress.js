 /*global $:true, jQuery:true */
 /*
 * jQuery Load Progress Plugin 1.1.1
 * Author : Otto Kamiya (MegazalRock)
 * License : Dual licensed under the MIT or GPL Version 2 licenses.
 * Browser : Chrome23+ (Win/Mac) Firefox14+ (Win/Mac) Opera12+ (Win/Mac) Safari6+(Mac) IE9+(Win) IE8(Win)
 * History :
 * 1.1.3	404images stop script problem
 * 1.1.2    New Default Design and mini fix
 * 1.1.1    Bug fix
 * 1.1.0    Add Manual Mode
 * 1.0.2    Bug Fix for IE
 * 1.0.1    Mini fix.
 * 1.0.0    Initial Release.
 */
(function(){
	$.extend({
		loadprogress:function(_options){
			_options = _options || {};
			var options = {
				imgSelector:'img',
				easing:'swing',
				duration:'1000',
				showText:true,
				manualMode:false,
				manualModeStopNum:95,
				bodyOverflowFixTo:false //false, auto ,hidden
			};
			$.extend(options,_options);

			var bodyElem = document.getElementsByTagName('body')[0];
			if(options.bodyOverflowFixTo){
				bodyElem.style.overflow = 'hidden';
			}
			
			var $_overlay = $('<div id="loadprogress-overlay" />');
			$_overlay
				.css({
					height:$(window).height()
				});
			var $_box = $('<div id="loadprogress-box" />');
			var $_bar = $('<div id="loadprogress-bar" />');
			var $_text = '';
			if(options.showText){
				$_text = $('<div id="loadprogress-text" />');
				$_text.text('0%');
			}
			
			function onResize(){
				$_overlay
					.css({
						height:$(window).height()
					});
			}
			$(window).resize(onResize).resize();
			
			var $_img = $(options.imgSelector);
			var imgNum = $_img.length;
			var loadedNum = 0;
			$_overlay
				.appendTo($('body'))
				.append($_box.append($_bar).append($_text));
			$(window)
				.one('loadprogressEnd',function(){
					if(!options.manualMode){
						onLoadProgressEnd();
					}
				})
				.bind('loadprogressProgress',function(e,loadedNum){
					onLoadProgressProgress(loadedNum);
				});
			if(options.manualMode){
				$(window).one('loadprogressManualEnd',function(){
					onLoadProgressEnd();
				});
			}
			
			function onLoadProgressEnd(){
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
						if(options.bodyOverflowFixTo){
							bodyElem.style.overflow = options.bodyOverflowFixTo;
						}
						$(this).remove();
						$(window).off('resize',onResize);
					});
			}
			function onLoadProgressProgress(loadedNum){
				var per = (options.manualMode)?loadedNum / imgNum * 100 - (100 - options.manualModeStopNum):(loadedNum / imgNum * 100);
				$_bar
					.css({
						width:per + '%'
					});
				if(options.showText){
					$_text
						.text(Math.floor(per) + '%');
				}
			}
			
			$_img.each(function(){
				var src = $(this).attr('src');
				$('<img />')
					.one('load error',function(){
						loadedNum += 1;
						if(imgNum === loadedNum){
							$(window).trigger('loadprogressEnd');
						}else{
							$(window).trigger('loadprogressProgress',loadedNum);
						}
					})
					.attr('src',src);
			});
		}
	});
})(jQuery);