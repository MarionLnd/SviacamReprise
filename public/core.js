function core() {

	// set all the used variables
	var audio = document.getElementById('audio');

	var socket = io();

	var rendering = false;

	var width = 40;
	var height = 30;

	var width_img = width * 10;
	var height_img = height * 10;

	var imageCompare = null;

	var oldImage = null;

	var topLeft = [Infinity, Infinity];
	var bottomRight = [0, 0];

	// start the animation from the video
	var raf = (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function (anim) {
				setTimeout(anim, 1000 / 60);
			};
	})();

	/*
	 * Initializes the function image_compare
	 */
	function initialize() {
		imageCompare = image_compare();

		rendering = true;

		main();
	}

	/*
	 * Compares to images and updates the position
	 * of the motion div.
	 */

	// var count=0;
	// var render = setInterval(function(){
	// 		if(count == 5) {
	// 			clearInterval(render);
	// 			setTimeout(render, 5000)
	// 		}
	// 		count++;
	// 		console.log('hey')
	// }, 1000);

	const skinColorUpper = hue => new cv.Vec(hue, 0.8 * 255, 0.6 * 255);
    const skinColorLower = hue => new cv.Vec(hue, 0.1 * 255, 0.05 * 255);
    const makeHandMask = (img) => {
		// filter by skin color
		const imgHLS = img.cvtColor(cv.COLOR_BGR2HLS);
		const rangeMask = imgHLS.inRange(skinColorLower(0), skinColorUpper(15));
	  
		// remove noise
		const blurred = rangeMask.blur(new cv.Size(10, 10));
		const thresholded = blurred.threshold(
		  200,
		  255,
		  cv.THRESH_BINARY
		);
	  
		return thresholded;
	  };
	  const getHandContour = (handMask) => {
		const contours = handMask.findContours(
		  cv.RETR_EXTERNAL,
		  cv.CHAIN_APPROX_SIMPLE
		);
		// largest contour
		return contours.sort((c0, c1) => c1.area - c0.area)[0];
	  };
	 
	function render() {
		oldImage = new Image(width_img, height_img);
		oldImage.src = imageObj.src
		imageObj.src = webcam.toDataURL()

		if (!oldImage || !imageObj) {
			return;
		}
       
		var vals = imageCompare.compare(imageObj, oldImage, width, height);
		topLeft[0] = vals.topLeft[0] * 10;
		topLeft[1] = vals.topLeft[1] * 10;

		bottomRight[0] = vals.bottomRight[0] * 10;
		bottomRight[1] = vals.bottomRight[1] * 10;

		document.getElementById('movement').style.top = topLeft[1] + 'px';
		document.getElementById('movement').style.left = topLeft[0] + 'px';

		document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
		document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';

		width_mvt = bottomRight[0] - topLeft[0]
		height_mvt = bottomRight[1] - topLeft[1]

		x_top_right = points_value.x + points_value.width
		y_bottom_right = points_value.y + points_value.height
		//2
		x_top_right2 = points_value2.x + points_value2.width
		y_bottom_right2 = points_value2.y + points_value2.height

		// Compare the points of the Konva square and the movement
		if ((topLeft[0] <= points_value.x && topLeft[1] <= points_value.y
			&& topLeft[0] <= x_top_right && topLeft[1] <= y_bottom_right)
			||
			(bottomRight[0] >= points_value.x && bottomRight[1] >= points_value.y
				&& bottomRight[0] <= x_top_right && bottomRight[1] <= y_bottom_right)) {
			$("#select_rect1").onchange = newValue1();
			socket.emit('click', key);
			socket.on('done', function (msg) {
				movement_done = msg
				audio.play();
			})
		}
		if ((topLeft[0] >= points_value2.x && topLeft[1] >= points_value2.y
			&& topLeft[0] <= x_top_right2 && topLeft[1] <= y_bottom_right2)
			||
			(bottomRight[0] >= points_value2.x && bottomRight[1] >= points_value2.y
				&& bottomRight[0] <= x_top_right2 && bottomRight[1] <= y_bottom_right2)) {
			$("#select_rect2").onchange = newValue2();
			socket.emit('click', key2);
			socket.on('done', function (msg) {
				movement_done = msg
				audio.play();
			})
		}
	
	}
	function newValue1(){
  
		key=$("#select_rect1").val().toLowerCase()
	
	}
	function newValue2(){
  
		key2=$("#select_rect2").val().toLowerCase()
	
	}

/*
 * The main rendering loop.
 */
function main() {
	try {
		if (Object.keys(points_value).length === 0 && points_value.constructor === Object) {
			// points_value of the square empty : no movement needed
		} else {
			render();
		}
	} catch (e) {
		console.log(e);
		return;
	}
	try {
		if (Object.keys(points_value2).length === 0 && points_value2.constructor === Object) {
			// points_value of the square empty : no movement needed
		} else {
			render();
		}
	} catch (e) {
		console.log(e);
		return;
	}

	if (rendering == true) {
		var anim = new Konva.Animation(function () { }, layer)
		raf(main.bind(anim.start()))
	}
}

initialize();
};
