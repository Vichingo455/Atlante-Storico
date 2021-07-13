(function($) {
	
	$.bgSlideshow = function(data) {
		
		// GLOBAL VARS
		var doc = $(document);
		if(doc.find("#bg-images").length === 0) return;
		
		var autoPlay = data.autoPlay, 
		transDelay = data.transitionDelay, 
		activeOpacity = data.activeNumOpacity,
		catOpacity = data.nonActiveCatOpacity,
		randomImg = data.randomizeImages,
		
		play, 
		pause,
		prev,
		next, 
		playOn, 
		iLeg, 
		leg, 
		timer,
		runTime,
		oWidth,
		oHeight,
		winWide,
		winTall,
		imgOne,
		imgTwo,
		list,
		hash,
		pre,
		numbers,
		images,
		bgImages,
		centered,
		stretched,
		useArrows,
		footWide,
		useBgNumbers,
		usePlayPause,
		isOn, 
		
		bgOn = 0,
		catCount = 0,
		catOn = 0,
		time = 750,
		 
		runOn = false,
		readyToFire = false,
		isLoading = false,
		noControls = false,
		running = false, 
		firstRun = true,
		firstTime = true,
		getListOnce = true,
		
		win = $(window), 
		bodies = $("body"),
		bgs = $("#bg-images"), 
		bgOne = $("<div />"),
		bgTwo = $("<div />"),
		bgUL = bgs.find("ul"),
		theFoot = $("#gallery-buttons"),
		
		cats = [],
		titles = [],
		titleText = [],
		ulist = [],
		
		infoText,
		infoFound,
		isOpen = false,
		
		isChrome = (navigator.userAgent.toLowerCase().indexOf("chrome") === -1) ? false : true;
		
		if(data.disableRightClick) doc.bind("contextmenu", function(event) {event.preventDefault()});	
		if(doc.find("#preloader").length > 0) pre = $("#preloader");	
		
		// IF FOOTER IS FOUND
		if(theFoot.length) {
			
			theFoot.css("display", "block");
			footWide = theFoot.outerWidth(true) >> 1;
			theFoot.css("left", (win.width() >> 1) - footWide + 125);
			
		}
		
		(autoPlay) ? playOn = true : playOn = false;
		
		// IF BG ITEMS ARE FOUND
		if(bgUL.length > 0) {
			
			var cat, items, pusher, str, centr, txt;
			
			bgUL.each(function() {
				
				items = [];
				pusher = 0;
				
				$(this).children("li").each(function() {
				
					items[pusher] = $(this);
					pusher++;
					
				});
				
				switch(data.scaleType) {
					
					case "stretch":
						str = true;
						centr = false;
					break;
					
					case "stretch-center":
						str = true;
						centr = true;
					break;
					
					default:
						str = false;
						centr = false;	
					// end default
					
				}
				
				txt = $(this).attr("title");
				$(this).removeAttr("title");
				titleText[catCount] = "images";
				
				cat = $("<p />");
				cat.data({"id": catCount, "stretch": str, "center": centr});
				
				ulist[catCount] = $(this);
				titles[catCount] = cat;
				cats[catCount] = items;
				catCount++;
				
			});
			
			if(bgUL.length === 1) titles[0].css("visibility", "hidden");
			
			items = null;
			cat = null;
			catalog = null;
			pusher = null;
			st = null;
			str = null;
			centr = null;
			txt = null;
			
		}
		else {
			
			return;
				
		}
		
		data = null;
		bgUL = null;
		
		// IF BUTTONS ARE FOUND
		if(doc.find(".play-button").length > 0 && doc.find(".pause-button").length > 0) {
								
			play = $(".play-button");	
			pause = $(".pause-button");	
								
			play.click(handlePlay);
			pause.click(handlePlay);
			
			(autoPlay) ? play.css("display", "none") : pause.css("display", "none");
			
			usePlayPause = true;
								
		}
						
		else {
			
			usePlayPause = false;
								
		}
		
		if(doc.find(".prev-button").length > 0 && doc.find(".next-button").length > 0) {
								
			prev = $(".prev-button");	
			next = $(".next-button");	
			
			useArrows = true;
								
		}
						
		else {
			
			usePlayPause = false;
								
		}
		
		bgs.css("display", "block");
		bgOne.css({position: "fixed", zIndex: -10000});
		bgTwo.css({position: "fixed", zIndex: -10000});
		
		winWide = win.width();
		winTall = win.height();
		
		// SET UP DEEP LINKING
		$.address.internalChange(insideChange);
		$.address.externalChange(browserChange);
		win.resize(sizer);
		
		// IF INFO IS FOUND
		if($(document).find("#info").length) {
			
			var info = $("#info");
			infoFound = info.find("#info-text");
			
			if(infoFound.length && info.find(".info-button").length) {
				
				$(".info-button").click(handleInfo);
						
			}
			else if(infoFound.length) {
				
				$("#info-text").css("display", "block");
					
			}
			
			info = null;
					
		}
		
		// AVAILABLE API CALLS
		$.bgSlideshow.getIsOn = function() {return isOn;}
		$.bgSlideshow.getCatOn = function() {return catOn;}
		$.bgSlideshow.getHash = function() {return hash;}
		
		
		// UPDATE THE INFO SECTION PER IMAGE
		function updateInfo(st) {
			
			if(infoFound) {
			
				if(infoFound.length) {
					
					infoFound.html(st);
					Cufon.refresh(".info-title");
					
					if(isOpen) {
						infoFound.stop(true, true).css("display", "none").fadeIn();
					}
					
				}
				
			}
			
		}
		
		// INFO BUTTON CLICK
		function handleInfo() {
				
			if(!isOpen) {
					
				infoFound.stop(true, true).fadeIn(500);
				isOpen = true;
						
			}
			else {
						
				infoFound.stop(true, true).fadeOut(300);
				isOpen = false;
						
			}
					
		}
		
		// DEEP LINK CHANGE FROM THE BROWSER
		function browserChange(event) {
			
			if(timer) clearTimeout(timer);
			if(runTime) clearTimeout(runTime);
			
			if(isLoading) {
				
				if(imgOne) imgOne.unbind("load", loaded);
				if(imgTwo) imgTwo.unbind("load", loaded);
				
				detatch();
				isLoading = false;
					
			}
			
			getHash(event.value);
			
			if(!firstTime) {
				
				disableClicks();
				runTime = setTimeout(changeHash, 750);
				
			}
			else {
				
				changeHash();
				firstTime = false;	
				
			}
			
		}
		
		// DEEP LINK CHANGE FROM A CLICK
		function insideChange(event) {
			
			if(timer) clearTimeout(timer);
			if(runTime) clearTimeout(runTime);
			disableClicks();
			
			getHash(event.value);
			changeHash();
			
		}
		
		// GET THE DEEPLINK URL
		function getHash(val) {
			
			val = val.split("//").join("/");
			
			if(val !== "/") {
				
				var ars = val.split("/");
				var lgs = ars.length;
				
				if(ars.length === 3) {
					
					isOn = parseInt(ars[2], 10) - 1;
					hash = ars[1];
					
				}
				else {
					
					if(isNaN(ars[1])) {
						isOn = 0;
						hash = ars[1];
					}
					else {
						isOn = parseInt(ars[1], 10) - 1;
						hash = "";
					}
					
				}
				
			}
			else {
			
				hash = "/";
				isOn = 0;
				
			}
			
		}
		
		// SET THE DEEPLINK URL
		function changeHash() {
			
			var i;
			
			if(hash !== "/") {
				
				i = catCount;
				
				while(i--) {
				
					if(titleText[i] == hash) {
					
						catOn = i;
						break;
						
					}
					
				}
				
			}
			else {
				catOn = 0;
			}
			
			i = catCount;
			
			while(i--) {
				
				if(i !== catOn) {
					
					ulist[i].css("display", "none");
					titles[i].css({"opacity": catOpacity, "cursor": "pointer"});
					
				}
				else {
				
					titles[catOn].css({"opacity": 1, "cursor": "default"})
					
					if(!firstRun) {
						ulist[catOn].fadeIn(500);
					}
					else {
						firstRun = false;
					}
					
				}
				
			}
			
			if(pre) pre.fadeIn(300);
			
			if(getListOnce) {
				getList();
				getListOnce = false;
			}
			
			updateInfo(images[isOn].html());
			
			if(!isChrome) {
				loadBG(list[isOn]);
			}
			else {
				// Chrome has a cache bug which causes the image to not register a width and height when reloaded.  This fixes the bug.
				loadBG(list[isOn] + "?img=" + new Date().getTime().toString());
			}
			
		}
		
		// DISABLE CLICK EVENTS WHEN THE BG IS CHANGING
		function disableClicks() {
		
			runOn = true;
			readyToFire = false;
			
			var i = catCount;
				
			while(i--) titles[i].unbind("click", categoryClick);
				
			if(useBgNumbers) {
							
				i = leg;
							
				while(i--) numbers[i].unbind("click", numberClick);
				
			}
			
			if(useArrows) {
				prev.unbind("click", handleLeft);
				next.unbind("click", handleRight);
			}
			
		}
		
		// CREATE A NEW CATEGORY LIST
		function getList() {
			
			var foundHTML = true;
			images = cats[catOn];
			leg = images.length;
			
			iLeg = leg - 1;
			list = [];
			numbers = [];
			bgImages = [];
			
			if(isOn > iLeg) isOn = 0;
			
			for(var i = 0; i < leg; i++) {
							
				if(images[i].html() !== "") {
										
					if(i !== isOn) {
						images[i].css({"cursor": "pointer", "opacity": 1});
					}
					else {
						images[i].css({"cursor": "default", "opacity": activeOpacity});		
					}
										
					images[i].data("id", i);
					numbers[i] = images[i];
					useBgNumbers = true;
										
				}
								
				else {
									
					images[i].css("display", "none");
					useBgNumbers = false;
					foundHTML = false;
										
				}
								
				if(images[i].attr("title")) {
						
					images[i].data("url", images[i].attr("title"));
					bgImages[i] = images[i].attr("title");
					images[i].removeAttr("title");
					
				}
				else {
					
					bgImages[i] = images[i].data("url");
						
				}
				
			}
			
			if(leg > 1) {
				
				if(foundHTML) {
					ulist[catOn].css("display", "block");
				}
				else {
					ulist[catOn].css("display", "none");	
				}
				
				if(noControls) {
				
					if(usePlayPause) $("#play-pause").css("display", "block");
					
					if(useArrows) $(".prev-next").css("display", "block");
					
					noControls = false;
					
				}
				
			}
			else {
			
				ulist[catOn].css("display", "none");
				
				if(usePlayPause) $("#play-pause").css("display", "none");

				if(useArrows) $(".prev-next").css("display", "none");
				
				noControls = true;
				
			}
						
			if(randomImg) {
						
				var shuf = [], placer;
						   
				for(var i = 0; i < leg; i++) {
					shuf[i] = bgImages[i];
				}
								
				while(shuf.length > 0) { 
								
					placer = Math.floor(Math.random() * shuf.length);
					list[list.length] = shuf[placer];
					shuf.splice(placer, 1);
								
				}
							
			}
						
			else {
				
				list = bgImages;
				
			}
			
			stretched = titles[catOn].data("stretch");
			centered = titles[catOn].data("center");
			
		}
		
		// LOAD IN A NEW BG
		function loadBG(url) {
			
			isLoading = true;
			
			if(bgOn === 0) {
					
				bodies.prepend(bgOne);
				bgOne.css("z-index", parseInt(bgTwo.css("z-index"), 10) + 1);
				
				imgOne = $("<img />").css({display: "none", position: "fixed"}).one("load", loaded);
				imgOne.appendTo(bgOne);
				imgOne.attr("src", url);
	
			}
			else {

				bodies.prepend(bgTwo);
				bgTwo.css("z-index", parseInt(bgOne.css("z-index"), 10) + 1);
			
				imgTwo = $("<img />").css({display: "none", position: "fixed"}).one("load", loaded);
				imgTwo.appendTo(bgTwo);
				imgTwo.attr("src", url);
				
			}
					
		}
		
		// BG IMAGE LOADED EVENT
		function loaded() {                                          
			
			isLoading = false;
			
			if(bgOn === 0) {
				
				oWidth = imgOne.width();
				oHeight = imgOne.height();
				
				bgOn = 1;
			}
			else {
				
				oWidth = imgTwo.width();
				oHeight = imgTwo.height();
				
				bgOn = 0;
			}
			
			if(pre) pre.fadeOut(300);
			
			sizer();
			fadeImage();
						
		}
			
		// FADE IN THE BG IMAGE WHEN LOADED
		function fadeImage() {
				
			running = true;
			
			if(!stretched) detatch();
			
			if(bgOn === 1) {
				imgOne.fadeIn(time, afterTrans);
			}
			else {
				imgTwo.fadeIn(time, afterTrans);	
			}
				
		}
		
		// CLEAN UP THE PREVIOUS BG
		function detatch() {
		
			if(bgOn === 1) {
			
				if(imgTwo) {
				
					imgTwo.remove();
					bgTwo.detach();
					
				}
				
			}
			else {
			
				if(imgOne) {
					
					imgOne.remove();
					bgOne.detach();
					
				}
				
			}
			
		}
		
		// CLEAN UP THE PREVIOUS BG
		function afterTrans() {
				
			running = false;
			
			if(stretched) detatch();
														  
			bgFired();
													  
		}
		
		// CHANGE THE BG IMAGE
		function changeBG() {
					
			disableClicks();
						
			if(useBgNumbers) {
					
				numbers[isOn].css({"cursor": "pointer", "opacity": 1});
					
				(isOn < iLeg) ? isOn++ : isOn = 0;
					
				numbers[isOn].css({"cursor": "default", "opacity": activeOpacity});
					
			}
			else {
				
				(isOn < iLeg) ? isOn++ : isOn = 0;
					
			}
			
			$.address.value(hash.split("/").join("") + "/" + (isOn + 1).toString());
					
		}
		
		// ADD CLICK EVENTS AFTER NEW BG	
		function bgFired() {
			
			if(timer) clearTimeout(timer);
			
			var i = catCount;
				
			while(i--) {
			
				if(i !== catOn) titles[i].click(categoryClick);
					
			}
			
			if(leg > 1) {		
			
				if(useBgNumbers) {
							
					i = leg;
							
					while(i--) {		
						if(i !== isOn) numbers[i].click(numberClick);
					}
							
				}
				
				if(useArrows) {
					
					prev.click(handleLeft);
					next.click(handleRight);	
					
				}
				
				if(autoPlay) {
					
					if(playOn) {
						timer = setTimeout(changeBG, transDelay);
					}
							
					else {
						readyToFire = true;	
					}
					
				}
				else {
					readyToFire = true;
				}
				
			}
			else {
				readyToFire = true;	
			}
			
			runOn = false;
					
		}
		
		// BG CATREGORY CLICK
		function categoryClick() {
			
			if(!runOn) {
				
				$.address.value(titleText[$(this).data("id")]);
				
			}
			
		}
		
		// BG NUMBER CLICK		
		function numberClick() {
					
			if(!runOn) {
						
				if(timer) clearTimeout(timer);
				disableClicks();
				$.address.value(hash.split("/").join("") + "/" + (parseInt($(this).data("id"), 10) + 1).toString());
						
			}
						
		}
		
		// LEFT BUTTON CLICK EVENT
		function handleLeft() {
			
			if(timer) clearTimeout(timer);
			
			disableClicks();
			
			if(useBgNumbers) numbers[isOn].css({"cursor": "pointer", "opacity": 1});
			
			(isOn > 0) ? isOn-- : isOn = iLeg;
			
			if(useBgNumbers) numbers[isOn].css({"cursor": "default", "opacity": activeOpacity});
			
			$.address.value(hash.split("/").join("") + "/" + (isOn + 1).toString());
			
		}
		
		// RIGHT BUTTON CLICK EVENT
		function handleRight() {
			
			if(timer) clearTimeout(timer);
			
			disableClicks();
			
			if(useBgNumbers) numbers[isOn].css({"cursor": "pointer", "opacity": 1});
			
			(isOn < iLeg) ? isOn++ : isOn = 0;
			
			if(useBgNumbers) numbers[isOn].css({"cursor": "default", "opacity": activeOpacity});
			
			$.address.value(hash.split("/").join("") + "/" + (isOn + 1).toString());
			
		}
		
		// PLAY/PAUSE BUTTON CLICK
		function handlePlay() {
					
			if(playOn) {
						
				if(timer) clearTimeout(timer);
						
				pause.css("display", "none");
				play.css("display", "block");
						
				playOn = false;
						
				if(!runOn) readyToFire = true;	
						
			}
					
			else {
						
				play.css("display", "none");
				pause.css("display", "block");
						
				playOn = true;
				
				if(readyToFire) changeBG();	
						
			}
					
		}
		
		// RESIZE IMAGE, WINDOW RESIZE EVENT	
		function sizer(event) {
			
			winWide = win.width();
			winTall = win.height();
			
			if(typeof imgOne === "undefined") return;
			
			if(typeof event === "object" && running) {
				
				running = false;
				
				imgOne.stop(true, true);
				if(imgTwo) imgTwo.stop(true, true);
					
			}
			
			var wide = winWide / oWidth,
			tall = winTall / oHeight, 
			perc, w, h, x, y;
			
			if(stretched) {
				
				perc = (wide > tall) ? wide : tall;
				w = Math.ceil(oWidth * perc);
				h = Math.ceil(oHeight * perc);
				
				if(centered) {
					
					(w > winWide) ? x = (w - winWide) >> 1 : x = 0;
					(h > winTall) ? y = (h - winTall) >> 1 : y = 0;
						
				}
				else {
					
					x = 0;
					y = 0;
						
				}
				
			}
			else {
				
				perc = (wide > tall) ? tall : wide;
				w = Math.ceil(oWidth * perc);
				h = Math.ceil(oHeight * perc);
				
				(winWide > w) ? x = -((winWide - w) >> 1) : x = 0;
				(winTall > h) ? y = -((winTall - h) >> 1) : y = 0;
				
			}
			
			if(bgOn === 1) {
			
				if(imgOne) imgOne.width(w).height(h).css({top: -y, left: -x});
				
			}
			else {
				
				if(imgTwo) imgTwo.width(w).height(h).css({top: -y, left: -x});
				
			}
			
			if(theFoot.length && typeof event === "object") theFoot.css("left", (winWide >> 1) - footWide + 125);
			
		}
		
	}
	
})(jQuery);













