// controls –––––––––––––––––––––––––––––––––––––––––––––––––––––––––

var start = false;

var imageCount = 206;

var title = "ART HISTORY"

// var pauseKey = 32;

var initTimeVarMin = 25;
var initTimeVarMax = 25;

var demoModeOn = true;

var demoTimeVarMin = 4000;
var demoTimeVarMax = 8000;

var imageWidthVar = 15; // percentage
var imageWidthMin = 20; // percentage
var marginTopVar = 10; // percentage
var marginTopMin = 5; // percentage
var marginLeftVar = 40; // percentage
var marginLeftVarMax = 5; // percentage

var transitionTime = 3 // seconds

var holdVibrate = true;
var holdWidth = 30; // percentage
var holdMarginTopMin = 1.5 // percentage

var opacityVariation = true;
var staticOpacityVar = 1;


// arrays –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

var imageArr = [];

// variables ––––––––––––––––––––––––––––––––––––––––––––––––––––––––

var primaryImage = document.getElementById("image");
var pauseVar = false;


// setup commands –––––––––––––––––––––––––––––––––––––––––––––––––––

document.getElementById("title").innerHTML = title;


// commands –––––––––––––––––––––––––––––––––––––––––––––––––––––––––

for (var i = 0; i <= imageCount; i++){
	var imagePath = "images/" + i + ".jpg";
	var imageTemp = new Image();
	imageTemp.src = imagePath;
	imageArr.push(imageTemp);
}

function waitForLoad() {
	setTimeout(function(){
		for(var i = 0; i < imageArr.length; i++){
			if(!imageArr[i].complete){
				return waitForLoad();
			}
		}
		init();
		if (demoModeOn === true) {
			demoMode();
		}
	}, 100);
}

waitForLoad()
// listeners ––––––––––––––––––––––––––––––––––––––––––––––––––––––––


// not working ??

window.onkeydown = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if (key == 32) {
		pauseVar = true;
		document.getElementById('audio').pause();
		document.getElementById('audio2').pause();
		document.getElementById('audio5').pause();
		document.getElementById('audio6').pause();
		document.getElementById('audio3').play();
		document.getElementById('audio4').play();
		document.getElementById('body').style.backgroundImage = "url('')";
		document.getElementById('image').style.transition = transitionTime + "s";
		document.getElementById('image').style.opacity = 1;
		document.getElementById('image').style.marginTop = Math.random() * holdMarginTopMin + "%";
		if (holdVibrate === true){
			document.getElementById('image').style.width = (Math.random() * 40) + 20 + "%";
		} else {
			document.getElementById('image').style.width = holdWidth + "%";
		};
	};
};

window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if (key == 32) {
		pauseVar = false;
		document.getElementById('audio').play();
		document.getElementById('audio2').play();
		document.getElementById('audio5').play();
		document.getElementById('audio6').play();
		document.getElementById('audio3').pause();
		document.getElementById('audio4').pause();
		document.getElementById('image').style.transition = "0s";
		init();
	} else if (key == 13) {
       var elem = document.getElementById("body");
	   req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
	   req.call(elem);	
   } else if (key == 40){
		if(initTimeVarMin <= 2000){
			initTimeVarMin *= 2;
			initTimeVarMax *= 2;
		} else {
			initTimeVarMin = 2000;
			initTimeVarMax = 2000;
		};
   } else if (key == 38){
		// alert("pressed");
		if(initTimeVarMin >= 25){
			initTimeVarMin /= 2;
			initTimeVarMax /= 2;
		} else {
			initTimeVarMin = 25;
			initTimeVarMax = 25;
		};
   } else if (key == 37){
		if(staticOpacityVar <= 1){
			staticOpacityVar += .1;
		} else {
			staticOpacityVar = 1;
		};
   } else if (key == 39){
		if(staticOpacityVar >= 0){
			staticOpacityVar -= .1;
		} else {
			staticOpacityVar = 0;
		};
   } else if (key == 68){
		if(demoModeOn === true){
			demoModeOn = false;
			alert("demo mode off");
		} else {
			demoModeOn = true;
			alert("demo mode on");
		};
   } 
   // else if (key == 16){
   // 		alert(demoModeOn);
   // 		if (demoModeOn = false) {
   // 			demoModeOn = true;
   // 		} else {
   // 			demoModeOn = false;
   // 		};
   // }
};

window.onmousedown = function() {
	pauseVar = true;
	document.getElementById('image').style.transition = transitionTime + "s";
	document.getElementById('image').style.opacity += 1;
	document.getElementById('image').style.marginTop = Math.random() * holdMarginTopMin + "%";
	document.getElementById('audio').pause();
	document.getElementById('audio2').pause();
	document.getElementById('audio5').pause();
	document.getElementById('audio6').pause();
	document.getElementById('audio3').play();
	document.getElementById('audio4').play();
	if (holdVibrate === true){
		document.getElementById('image').style.width = (Math.random() * 40) + 20 + "%";
	} else {
		document.getElementById('image').style.width = holdWidth + "%";
	}
}

window.onmouseup = function() {
	pauseVar = false;
	document.getElementById('image').style.transition = "0s";
	document.getElementById('audio').play();
	document.getElementById('audio2').play();
	document.getElementById('audio5').play();
	document.getElementById('audio6').play();
	document.getElementById('audio3').pause();
	document.getElementById('audio4').pause();
	init();
};


// time functions –––––––––––––––––––––––––––––––––––––––––––––––––––

function initRandomTime(){
	var x = (Math.random() * (initTimeVarMax - initTimeVarMin)) + initTimeVarMin;
	return x;
}

function demoRandomTime(){
	var x = (Math.random() * (demoTimeVarMax - demoTimeVarMin)) + demoTimeVarMin;
	return x;
}

// functions ––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function init(){
	if(pauseVar === false){
		setTimeout(function(){
			randomImage();
			init();
		}, initRandomTime());
	};
};

// demo mode not working - sticking on?

function demoMode(){
	setTimeout(function(){
		pauseVar = true;
		// document.getElementById('body').style.backgroundImage = "url('')";
		document.getElementById('image').style.transition = transitionTime + "s";
		document.getElementById('audio').pause();
		document.getElementById('audio2').pause();
		document.getElementById('audio5').pause();
		document.getElementById('audio6').pause();
		document.getElementById('audio3').play();
		document.getElementById('audio4').play();
		document.getElementById('image').style.opacity = 1;
		if (holdVibrate === true){
			document.getElementById('image').style.width = (Math.random() * 40) + 20 + "%";
		} else {
			document.getElementById('image').style.width = holdWidth + "%";
		}
		demoMode();
	}, demoRandomTime());
	setTimeout(function(){
		pauseVar = false;
		document.getElementById('audio').play();
		document.getElementById('audio2').play();
		document.getElementById('audio5').play();
		document.getElementById('audio6').play();
		document.getElementById('audio3').pause();
		document.getElementById('audio4').pause();
		document.getElementById('image').style.transition = "0s";
		document.getElementById('image').style.opacity = staticOpacityVar;
		document.getElementById('background').style.opacity = staticOpacityVar;
		init();
	}, 2000);
};

function randomImage(){
	var x = Math.round(Math.random() * imageCount);
	var width = Math.random() * imageWidthVar;
	var marginTop = (Math.random() * marginTopVar) + marginTopMin;
	var marginLeft = Math.random() * marginLeftVar;
	var y = Math.round(Math.random());
	var marginPlusMinus = "";
	if(y === 1){
		marginPlusMinus = "-";
	};
	document.getElementById('image').src = imageArr[x].src;
	// document.getElementById('body').style.backgroundImage = "url(images/" + (Math.round(Math.random() * x )) + ".jpg)";
	document.getElementById('background').src = imageArr[(Math.round(Math.random() * x ))].src;
	document.getElementById('image').style.width = width + imageWidthMin + "%";
	document.getElementById('image').style.marginTop = marginTop + "%";
	var z = marginPlusMinus + marginLeft;
	if (z <= marginLeftVarMax) {
		document.getElementById('image').style.marginLeft = marginPlusMinus + marginLeft + "%";
	} else {
		document.getElementById('image').style.marginLeft = marginLeftVarMax + "%";
	};
	document.getElementById('image').style.opacity = staticOpacityVar;	
	document.getElementById('background').style.opacity = staticOpacityVar;	
	if (pauseVar === true) {
		// document.getElementById('body').style.backgroundImage = "";
		document.getElementById('background').src = "";
	};
	// if (opacityVariation === true) {
	// 	document.getElementById('image').style.opacity = (Math.random() * .5) + .25;	
	// };
};