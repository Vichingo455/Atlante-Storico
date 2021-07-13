var cb_canvas = null;
var cb_ctx = null;
var cb_lastPoints = null;
var cb_easing = 0.4;
var vid, playButton;

function playVideo() {
            if (playButton.value == "Play") {
                vid.pause();
                play.value = "Pause";
				playButton.src="../images/play.png";
            }
            else {
                vid.play();
                playButton.value = "Play";
				playButton.src="../images/pause.png";
            }
        }
        function vidEnd() {
            playButton.value = "Play";
            clearTimeout(vidTimer);
		}
	


		
function init() {
	cb_canvas = document.getElementById("can");
	cb_lastPoints = Array();
	vid = document.getElementById("trash");
 	playButton = document.getElementById("play");
	
	if (cb_canvas.getContext) {
		cb_ctx = cb_canvas.getContext('2d');
		cb_ctx.lineWidth = 4;
		cb_ctx.strokeStyle = "rgb(250, 250, 250)";
		cb_ctx.beginPath();
		
		cb_canvas.onmousedown = startDraw;
		cb_canvas.onmouseup = stopDraw;
		cb_canvas.ontouchstart = startDraw;
		cb_canvas.ontouchstop = stopDraw;
		cb_canvas.ontouchmove = drawMouse;
	}
}
			  


				
