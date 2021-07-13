(function($) {
	
	$.royale = function(prettySets) {
		
		// WRITE GLOBAL VARS
		var win = $(window),
		content = $("#content"),
		portHeight,
		forceWid,
		myScroll,
		scrollX,
		menuWid,
		portTip,
		wide;
		
		if(content.length) {
			
			forceWid = parseInt($("#left").css("width"), 10);
			wide = Math.round((content.width() + (parseInt(content.css("padding-left"), 10) << 1)) >> 1);
			menuWid = forceWid >> 1;
			forceWid += 16;
			
		}
		
		init(prettySets);
		
		// INIT FUNCTION
		function init(pretty) {
			
			var logo = $("#logo"), 
			nav = $("nav"),
			topNav = logo.height() + parseInt(logo.css("margin-top"), 10) + parseInt(nav.css("margin-top"), 10),
			imgTall,
			imgWid,
			port,
			par2,
			par,
			img;
			
			// SETTING UP THE SUBMENUS
			nav.find("ul li ul li ul").each(function() {
						
				par = $(this).parent().parent();
					
				$(this).css("left", parseInt(par.width(), 10));
						
			});
			
			nav.find("ul li ul").each(function() {
			
				$(this).css({visibility: "visible", display: "none"});
				
			});
			
			$("nav ul li > ul").each(function() {
				
				$(this).children(":first").css("margin-top", topNav);
				$(this).parent().data("child", $(this)).mouseenter(enterSub).mouseleave(leaveSub);
				
			});
			
			if(content.length) win.resize(posContent);
			
			// SETTING UP THE LIGHTBOX THUMBNAILS
			$(".lightbox-thumb a").each(function() {
				
				img = $(this).find(".thumb");
				imgWid = parseInt(img.attr("width"), 10);
				imgTall = parseInt(img.attr("height"), 10);
				
				$(this).find(".hover-icon").each(function() {
					
					$(this).css({opacity: 0, width: imgWid, height: imgTall}).mouseover(overThumb).mouseleave(outThumb);
					
				});
				
			});
			
			$("a[data-rel]").each(function() {
				
				$(this).attr("rel", $(this).attr("data-rel")).removeAttr("data-rel");
				
			});
			
			// SETTING U9P THE PORTFOLIO THUMBNAIL SLIDER
			port = $("#portfolio-thumb-slider");
			
			if(port.length) {
				
				var pWide = 0, pWidth = 0;
				
				portTip = $("#portfolio-tooltip");
				
				if(portTip.length) portHeight = portTip.height() + parseInt(portTip.css("padding-top"), 10) + parseInt(portTip.css("padding-bottom"), 10) + 10;
				
				port.children("a").each(function(i) {
					
					if(i === 0) pWidth = parseInt($(this).children("img").attr("width"), 10) + parseInt($(this).css("margin-left"), 10);
					
					$(this).css({left: pWide, marginLeft: 0});
					
					if($(this).attr("title") && portTip.length) $(this).data("title", $(this).attr("title")).removeAttr("title").mouseover(portOver).mouseout(portOut);
					
					$(this).find("img").each(function() {
					
						if($(this).attr("alt")) $(this).removeAttr("alt");
						
					});
					
					pWide += pWidth;
					
				});
				
				port.css("visibility", "visible");
				
				myScroll = port.jScrollPane().data("jsp");
				
			}
			
			if(pretty) $("a[rel^='prettyPhoto']").prettyPhoto(pretty);
			
			// SETTING UP THE BLOG COMMENT MOUSE EVENTS
			$(".blog-post").each(function() {
				
				$(this).find(".comments").data("url", $(this).find("header h3 a").attr("href") + "#replies").data("text", $(this).find(".comment-text")).mouseover(blogCommentOver).mouseout(blogCommentOut).click(gotoBlogPage);
				
			});
			
			$(".blog-single").each(function() {
				
				$(this).find(".comments").data("text", $(this).find(".comment-text")).mouseover(blogCommentOver).mouseout(blogCommentOut).click(jumpToComments);
				
			});
			
			// SETTING UP THE FOOTER MOUSE OVER EVENTS
			$("footer a").mouseover(footerOver).mouseout(footerOut);
			$(".email a").mouseover(emailOver).mouseout(emailOut);
			
			// SETTING UP THE BLOG SEARCH BAR 
			$("#search-submit").each(function() {
				
				$(this).mouseover(submitOver).mouseout(submitOut).click(function(event) {
					
					event.stopPropagation();
					event.preventDefault();
					
				});
				
			});
			
			$(".royale-form").each(function() {
				
				$(this).attr("action", "");
				
			});
			
			
			$("#search-bar").each(function() {
				
				var ths = $(this);
				
				$(this).find("#search-field").each(function() {
				
					if($(this).attr("value")) {
								
						$(this).data("parent", ths).data("original", $(this).attr("value")).focus(inFocus).blur(outFocus);
								
					}
					
				});
				
			});
			
			if(DetectTierTablet()) {
				$("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0" />');
				posContent();
			}
			
		}
		
		// CENTERS THE MAIN CONTENT BETWEEN THE MENU AND THE RIGHT SIDE OF THE PAGE
		function posContent(event) {
			
			if(typeof event !== "undefined") event.stopPropagation();
			
			var pos = (Math.round(win.width() >> 1) + menuWid) - wide;
			
			content.css({marginLeft: 0, left: pos > forceWid ? content.css("left", pos) : forceWid});
			
		}
		
		
		// SHOW SUBMENU
		function enterSub() {
			
			$(this).data("child").fadeIn(300);

		}
		
		// HIDE SUBMENU
		function leaveSub() {
			
			$(this).data("child").stop(true, true).fadeOut(200);
			
		}
		
		// LIGHTBOX THUMBNAIL HOVER IN
		function overThumb(event) {
		
			event.stopPropagation();
			
			$(this).stop(true).animate({opacity: 0.6}, 300);
			
		}
		
		// LIGHTBOX THUMBNAIL HOVER OUT
		function outThumb(event) {
			
			event.stopPropagation();
			
			$(this).stop(true).animate({opacity: 0}, 300);
			
		}
		
		// FOOTER LINK OVER
		function footerOver() {
			
			$(this).parent().addClass("bullet-over");
			
		}
		
		// FOOTER LINK OVER
		function footerOut() {
			
			$(this).parent().removeClass("bullet-over");
			
		}
		
		// FOOTER EMAIL OVER
		function emailOver() {
			
			$(this).parent().addClass("email-over");
			
		}
		
		// FOOTER EMAIL OVER
		function emailOut() {
			
			$(this).parent().removeClass("email-over");
			
		}
		
		// SHOW PORTFOLIO SCROLLER TOOLTIP
		function portOver(event) {
		
			event.stopPropagation();
			
			scrollX = myScroll.getContentPositionX() | 0;
			
			$(this).mousemove(moveTip);
			
			portTip.stop(true, true).css({
					
				display: "none", 
				top: event.pageY - portHeight, 
				left: parseInt($(this).css("left"), 10) + event.pageX - $(this).offset().left - scrollX
					
			}).html($(this).data("title")).fadeIn(300);
			
		}
		
		// MOVE PORTFOLIO SCROLLER TOOLTIP
		function moveTip(event) {
			
			event.stopPropagation();
			
			portTip.css({
				
				top: event.pageY - portHeight, 
				left: parseInt($(this).css("left"), 10) + event.pageX - $(this).offset().left - scrollX
				
			});
			
		}
		
		// HIDE PORTFOLIO SCROLLER TOOLTIP
		function portOut(event) {
			
			event.stopPropagation();
			
			$(this).unbind("mousemove", moveTip)
			
			portTip.stop(true, true).fadeOut();
			
		}
		
		// BLOG LINK OVER
		function blogCommentOver(event) {
			
			event.stopPropagation();
			
			$(this).data("text").addClass("blog-comment-over");
			
		}
		
		// BLOG LINK OUT
		function blogCommentOut(event) {
			
			event.stopPropagation();
			
			$(this).data("text").removeClass("blog-comment-over");
			
		}
		
		// BLOG LINK CLICK
		function gotoBlogPage(event) {
			
			event.stopPropagation();
			
			window.location = $(this).data("url");
			
		}
		
		// COMMENTS LINK CLICK
		function jumpToComments(event) {
			
			event.stopPropagation();
			
			window.location = "#replies";
			
		}
		
		// SEARCH BAR FOCUS IN
		function inFocus() {
			
			var st = this.value;
			
			if(st === $(this).data("original")) this.value = "";
			
			$(this).addClass("form-field-focus");
			$(this).data("parent").addClass("search-field-focus");
			
		}
		
		// SEARCH BAR FOCUS OUT
		function outFocus() {
			
			if(this.value === "") this.value = $(this).data("original");
			
			$(this).removeClass("form-field-focus");
			$(this).data("parent").removeClass("search-field-focus");
			
		}
		
		// SEARCH BAR SUBMIT BUTTON OVER
		function submitOver(event) {
			
			event.stopPropagation();
			
			$(this).css("opacity", 0.75);
			
		}
		
		// SEARCH BAR SUBMIT BUTTON OUT
		function submitOut(event) {
			
			event.stopPropagation();
			
			$(this).css("opacity", 1);
			
		}
		
	}
	
})(jQuery);



