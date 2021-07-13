/*
 * 	PluginName- Points of Interest 1.0 plugin
 *	written by Kent Heberling	
 *	http://khwebdesign.net/blog/points-of-interest-jquery-plugin/
 *
 *	Copyright (c) 2010 Kent Heberling (http://www.khwebdesign.net)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
/*
 *	easing animations
 *  top and bottom positions
 */
 
(function($){  
	$.fn.pointsOfInterest = function(options) {  
		// Default Values
		var defaults = {  
			speed: 500,
			showOnHover: false,
			arrowVOffset: 30,
			arrowHOffset: 17,
			contentsHideOn: "none",
			canvasHidesOn: "none",
			closeButton: true
		};  
		var options = $.extend(defaults, options);  
		var i = 0;
		
		return this.each(function() {  
			var obj = $(this);
			var poi = $(".poi_points li", obj);
			var poi_contents = $(".poi_contents li", obj);
			
			poi.each(function(index) {
				$(this).css({marginTop: $(".y", $(this)).text() + "px",marginLeft: $(".x", $(this)).text() + "px"});

				if((parseInt($(".x", $(this)).text())  + $(this).outerWidth() + options.arrowHOffset + $(".poi_contents li").outerWidth()) > obj.outerWidth()){
					$(poi_contents[i]).prepend("<div class=\"poi_arrow arrow_right\" style=\"margin-top: " + ($(poi_contents[i]).height()/2 - options.arrowVOffset ) + "px; margin-left: " + ($(".poi_contents li").outerWidth() - parseInt($(".poi_contents li").css("paddingRight")))+ "px;\">&nbsp;</div>");
					$(poi_contents[i]).css({marginTop: (parseInt($(".y", $(this)).text()) + $(this).outerHeight()/2 - $(poi_contents[i]).outerHeight()/2) + "px",marginLeft: (parseInt($(".x", $(this)).text())  - options.arrowHOffset - $(".poi_contents li").outerWidth())  + "px"});
					if (options.closeButton){$(poi_contents[i]).prepend("<div class=\"poi_close close_right\">&nbsp;</div>");}
				} else {
					$(poi_contents[i]).prepend("<div class=\"poi_arrow arrow_left\" style=\"margin-top: " + ($(poi_contents[i]).height()/2 - options.arrowVOffset ) + "px;\">&nbsp;</div>");
					$(poi_contents[i]).css({marginTop: (parseInt($(".y", $(this)).text()) + $(this).outerHeight()/2 - $(poi_contents[i]).outerHeight()/2) + "px",marginLeft: (parseInt($(".x", $(this)).text())  + $(this).outerWidth() + options.arrowHOffset)  + "px"});								
					if (options.closeButton){$(poi_contents[i]).prepend("<div class=\"poi_close close_left\">&nbsp;</div>");}
				}
			
				if (options.showOnHover){
					$(this).hover(function(){
						drawContents($(this));
					});		
				} else {
					$(this).click(function(){
						drawContents($(this));
					});	
				}
				i++;
  			});

			// Event Bindings
			if (options.canvasHidesOn == "hover"){
				$("img, .poi_contents li",obj).hover(function (){	
					$(poi_contents).fadeOut(options.speed);											  
				});
			} else if (options.canvasHidesOn =="click"){
				$("img, .poi_contents li",obj).click(function (){	
					$(poi_contents).fadeOut(options.speed);											  
				});
			}
			
			if (options.contentsHideOn == "hover"){
				$(".poi_contents li",obj).hover(function (){	
					$(poi_contents).fadeOut(options.speed);											  
				});
			} else if (options.contentsHideOn =="click"){
				$(".poi_contents li",obj).click(function (){	
					$(poi_contents).fadeOut(options.speed);											  
				});
			}	
			
			$(".poi_close",obj).click(function (){	
				$(poi_contents).fadeOut(options.speed);											  
			});			
		
			// Plugin Methods
			function drawContents(contents) {	
					i = $(contents).prevAll().length;
					if(!$(poi_contents[i]).is(':visible') ){
						$(poi_contents).fadeOut();
						$(poi_contents[i]).fadeIn(options.speed);
					}
			};	
		});
	};  
})(jQuery);  



