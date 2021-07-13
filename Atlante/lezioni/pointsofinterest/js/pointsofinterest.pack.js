<!--(function($){$.fn.pointsOfInterest=function(e){var f={speed:500,showOnHover:false,arrowVOffset:30,arrowHOffset:17,contentsHideOn:"none",canvasHidesOn:"none",closeButton:true};var e=$.extend(f,e);var i=0;return this.each(function(){var b=$(this);var c=$(".poi_points li",b);var d=$(".poi_contents li",b);c.each(function(a){$(this).css({marginTop:$(".y",$(this)).text()+"px",marginLeft:$(".x",$(this)).text()+"px"});if((parseInt($(".x",$(this)).text())+$(this).outerWidth()+e.arrowHOffset+$(".poi_contents li").outerWidth())>b.outerWidth()){$(d[i]).prepend("<div class=\"poi_arrow arrow_right\" style=\"margin-top: "+($(d[i]).height()/2-e.arrowVOffset)+"px; margin-left: "+($(".poi_contents li").outerWidth()-parseInt($(".poi_contents li").css("paddingRight")))+"px;\">&nbsp;</div>");$(d[i]).css({marginTop:(parseInt($(".y",$(this)).text())+$(this).outerHeight()/2-$(d[i]).outerHeight()/2)+"px",marginLeft:(parseInt($(".x",$(this)).text())-e.arrowHOffset-$(".poi_contents li").outerWidth())+"px"});if(e.closeButton){$(d[i]).prepend("<div class=\"poi_close close_right\">&nbsp;</div>")}}else{$(d[i]).prepend("<div class=\"poi_arrow arrow_left\" style=\"margin-top: "+($(d[i]).height()/2-e.arrowVOffset)+"px;\">&nbsp;</div>");$(d[i]).css({marginTop:(parseInt($(".y",$(this)).text())+$(this).outerHeight()/2-$(d[i]).outerHeight()/2)+"px",marginLeft:(parseInt($(".x",$(this)).text())+$(this).outerWidth()+e.arrowHOffset)+"px"});if(e.closeButton){$(d[i]).prepend("<div class=\"poi_close close_left\">&nbsp;</div>")}}if(e.showOnHover){$(this).hover(function(){drawContents($(this))})}else{$(this).click(function(){drawContents($(this))})}i++});if(e.canvasHidesOn=="hover"){$("img, .poi_contents li",b).hover(function(){$(d).fadeOut(e.speed)})}else if(e.canvasHidesOn=="click"){$("img, .poi_contents li",b).click(function(){$(d).fadeOut(e.speed)})}if(e.contentsHideOn=="hover"){$(".poi_contents li",b).hover(function(){$(d).fadeOut(e.speed)})}else if(e.contentsHideOn=="click"){$(".poi_contents li",b).click(function(){$(d).fadeOut(e.speed)})}$(".poi_close",b).click(function(){$(d).fadeOut(e.speed)});function drawContents(a){i=$(a).prevAll().length;if(!$(d[i]).is(':visible')){$(d).fadeOut();$(d[i]).fadeIn(e.speed)}}})}})(jQuery);-->

(function($){$.fn.pointsOfInterest=function(e)
{var f={speed:500,showOnHover:false,arrowVOffset:30,arrowHOffset:17,contentsHideOn:"none",canvasHidesOn:"none",closeButton:true};
var e=$.extend(f,e);
var i=0;
return this.each(function(){var b=$(this);
var c=$(".poi_points li",b);
var d=$(".poi_contents li",b);
c.each(function(a){$(this).css({marginTop:$(".y",$(this)).text()+"px",marginLeft:$(".x",$(this)).text()+"px"});

if((parseInt($(".x",$(this)).text())+$(this).outerWidth()+e.arrowHOffset+$(".poi_contents li").outerWidth())>b.outerWidth()){$(d[i]).prepend("<div class=\"poi_arrow arrow_right\" style=\"margin-top: "+($(d[i]).height()/2-e.arrowVOffset)+"px; margin-left: "+($(".poi_contents li").outerWidth()-parseInt($(".poi_contents li").css("paddingRight")))+"px;\">&nbsp;</div>");

$(d[i]).css({marginTop:(parseInt($(".y",$(this)).text())+$(this).outerHeight()/2-$(d[i]).outerHeight()/2)+"px",marginLeft:(parseInt($(".x",$(this)).text())-e.arrowHOffset-$(".poi_contents li").outerWidth())+"px"});if(e.closeButton){$(d[i]).prepend("<div class=\"poi_close close_right\">&nbsp;</div>")}}

else{$(d[i]).prepend("<div class=\"poi_arrow arrow_left\" style=\"margin-top: "+($(d[i]).height()/2-e.arrowVOffset)+"px;\">&nbsp;</div>");$(d[i]).css({marginTop:(parseInt($(".y",$(this)).text())+$(this).outerHeight()/2-$(d[i]).outerHeight()/2)+"px",marginLeft:(parseInt($(".x",$(this)).text())+$(this).outerWidth()+e.arrowHOffset)+"px"});if(e.closeButton){$(d[i]).prepend("<div class=\"poi_close close_left\">&nbsp;</div>")}}if(e.showOnHover){$(this).hover(function(){drawContents($(this))})}else{$(this).click(function(){drawContents($(this))})}i++});

if(e.canvasHidesOn=="hover"){
	$("img, .poi_contents li",b).hover(function(){$(d).fadeOut(e.speed)})}
	else if(e.canvasHidesOn=="click")
	{$("img, .poi_contents li",b).click(function(){$(d).fadeOut(e.speed)})}
	if(e.contentsHideOn=="hover"){$(".poi_contents li",b).hover(function(){$(d).fadeOut(e.speed)})}
	else if(e.contentsHideOn=="click"){$(".poi_contents li",b).click(function(){$(d).fadeOut(e.speed)})}$(".poi_close",b).click(function(){$(d).fadeOut(e.speed)});
function drawContents(a){i=$(a).prevAll().length;if(!$(d[i]).is(':visible')){$(d).fadeOut();$(d[i]).fadeIn(e.speed)}}})}})(jQuery);