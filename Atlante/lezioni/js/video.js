// JavaScript Document
 	var video;
    var controls;
    var playControl;
    var progressControl;
    var progressHolder;
    var playProgressBar;
    var playProgressInterval;
    var currentTimeDisplay;
    var durationDisplay;
    var volumeControl;
    var volumeDisplay;
    var fullScreenControl;

    var videoWasPlaying;
    var videoIsFullScreen;
    var videoOrigWidth;
    var videoOrigHeight;

    var bodyLoaded = function(){
      video = document.getElementById("video");
      controls = document.getElementById("controls");
      playControl = document.getElementById("play");
      progressControl = document.getElementById("progress");
      progressHolder = document.getElementById("progress_box");
      playProgressBar = document.getElementById("play_progress");
      currentTimeDisplay = document.getElementById("current_time_display");
      durationDisplay = document.getElementById("duration_display");
      volumeControl = document.getElementById("volume");
      volumeDisplay = document.getElementById("volume_display");
      fullScreenControl = document.getElementById("full_screen");
	  playVideo();
      showController();
      positionController();
	  
	   
		 $(function() {
		 $("#main").draggable({containment:"#video",});
		 });
		 

      playControl.addEventListener("click", function(){
        if (video.paused) {
          playVideo();
        } else {
          pauseVideo();
        }
      }, true);

      progressHolder.addEventListener("mousedown", function(){
        stopTrackingPlayProgress();

        if (video.paused) {
          videoWasPlaying = false;
        } else {
          videoWasPlaying = true;
          video.pause();
        }

        blockTextSelection();
        document.onmousemove = function(e) {
          setPlayProgress(e.pageX);
        }

        document.onmouseup = function() {
          unblockTextSelection();
          document.onmousemove = null;
          document.onmouseup = null;
          if (videoWasPlaying) {
            video.play();
            trackPlayProgress();
          }
        }
      }, true);

      progressHolder.addEventListener("mouseup", function(e){
        setPlayProgress(e.pageX);
      }, true);

      volumeControl.addEventListener("mousedown", function(){
        blockTextSelection();
        document.onmousemove = function(e) {
          setVolume(e.pageX);
        }
        document.onmouseup = function() {
          unblockTextSelection();
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }, true);

      volumeControl.addEventListener("mouseup", function(e){
        setVolume(e.pageX);
      }, true);

      updateVolumeDisplay();

      fullScreenControl.addEventListener("click", function(){
        if (!videoIsFullScreen) {
          fullScreenOn();
        } else {
          fullScreenOff();
        }
      }, true);
    }

    function playVideo(){
      video.play();
      playControl.className = "pause control";
      trackPlayProgress();
    }

    function pauseVideo(){
      video.pause();
		
      playControl.className = "play control";
      stopTrackingPlayProgress();
    }

    function positionController(){
      controls.style.top = (video.offsetHeight - controls.offsetHeight) + "px";
      controls.style.left = "0px";
      controls.style.width = video.offsetWidth + "px";
      sizeProgressBar();
    }

    function showController(){
      controls.style.display = "block";
    }

    function hideController(){
      controls.style.display = "none";
    }

    function sizeProgressBar(){
      progressControl.style.width = (controls.offsetWidth - 125) + "px";
      progressHolder.style.width = (progressControl.offsetWidth - 80) + "px";
      updatePlayProgress();
    }

    function trackPlayProgress(){
      playProgressInterval = setInterval(updatePlayProgress, 33);
    }

    function stopTrackingPlayProgress(){
      clearInterval(playProgressInterval);
    }

    function updatePlayProgress(){
      playProgressBar.style.width = ((video.currentTime / video.duration) * (progressHolder.offsetWidth - 2)) + "px";
      updateTimeDisplay();
    }

    function setPlayProgress(clickX) {
      var newPercent = Math.max(0, Math.min(1, (clickX - findPosX(progressHolder)) / progressHolder.offsetWidth));
      video.currentTime = newPercent * video.duration
      playProgressBar.style.width = newPercent * (progressHolder.offsetWidth - 2)  + "px";
      updateTimeDisplay();
    }

    function updateTimeDisplay(){
      currentTimeDisplay.innerHTML = formatTime(video.currentTime);
      if (video.duration) durationDisplay.innerHTML = formatTime(video.duration);
    }

    function setVolume(clickX) {
      var newVol = (clickX - findPosX(volumeControl)) / volumeControl.offsetWidth;
      if (newVol > 1) {
        newVol = 1;
      } else if (newVol < 0) {
        newVol = 0;
      }
      video.volume = newVol;
      updateVolumeDisplay();
    }

    // Unique to these controls.
    function updateVolumeDisplay(){
      var volNum = Math.floor(video.volume * 6);
      for(var i=0; i<6; i++) {
        if (i < volNum) {
          volumeDisplay.children[i].style.borderColor = "#fff";
        } else {
          volumeDisplay.children[i].style.borderColor = "#555";
        }
      }
    }

    function fullScreenOn(){
      videoIsFullScreen = true;
      videoOrigWidth = video.offsetWidth;
      videoOrigHeight = video.offsetHeight;

      video.style.width = window.innerWidth + "px";
      video.style.height = window.innerHeight + "px";
      video.style.position = "fixed";
      video.style.left = 0;
      video.style.top = 0;
      controls.style.position = "fixed";
      positionController();

      fullScreenControl.className = "fs-active control";
    }

    function fullScreenOff(){
      videoIsFullScreen = false;
      video.style.width = videoOrigWidth + "px";
      video.style.height = videoOrigHeight + "px";
      video.style.position = "static";
      controls.style.position = "absolute";
      positionController();
      fullScreenControl.className = "control";
    }

    function blockTextSelection(){
      document.body.focus();
      document.onselectstart = function () { return false; };
    }

    function unblockTextSelection(){
      document.onselectstart = function () { return true; };
    }

    // Return seconds as MM:SS
    function formatTime(seconds) {
      seconds = Math.round(seconds);
      minutes = Math.floor(seconds / 60);
      minutes = (minutes >= 10) ? minutes : "0" + minutes;
      seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : "0" + seconds;
      return minutes + ":" + seconds;
    }

    // Get objects position on the page
    function findPosX(obj) {
      var curleft = obj.offsetLeft;
      while(obj = obj.offsetParent) {
        curleft += obj.offsetLeft;
      }
      return curleft;
    }
