function core() {
	// set all the used variables
	let audio = document.getElementById('audio');

	let socket = io();

	let rendering = false;

	//let width = 40;
	//let height = 30;
	let width = webcam.width() / 10;
	let height = webcam.height() / 10;

	let width_img = width * 10;
	let height_img = height * 10;

	let imageCompare = null;

	let oldImage = null;

	let topLeft = [Infinity, Infinity]; // Position ?
	let bottomRight = [0, 0]; // Position ?

	// start the animation from the video
	let raf = (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function (anim) {
				setTimeout(anim, 1000 / 60);
				//setTimeout(anim, 100);
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

	// let count=0;
	// let render = setInterval(function(){
	// 		if(count == 5) {
	// 			clearInterval(render);
	// 			setTimeout(render, 5000)
	// 		}
	// 		count++;
	// 		console.log('hey')
	// }, 1000);


	function render() {
		oldImage = new Image(width_img, height_img);
		oldImage.src = imageObj.src
		imageObj.src = webcam.toDataURL()

		console.log(webcam)

		if (!oldImage || !imageObj) {
			return;
		}

		let vals = imageCompare.compare(imageObj, oldImage, width, height);
		console.log(imageObj)
		console.log(oldImage)
		console.log(width)
		console.log(height)
		console.log(vals)
		topLeft[0] = vals.topLeft[0] * 10;
		topLeft[1] = vals.topLeft[1] * 10;

		bottomRight[0] = vals.bottomRight[0] * 10;
		bottomRight[1] = vals.bottomRight[1] * 10;

		console.log(vals.topLeft)
		console.log(vals.bottomRight)

		// Position of the red zone
		document.getElementById('movement').style.top = topLeft[1] + 'px';
		document.getElementById('movement').style.left = topLeft[0] + 'px';
		//console.log(document.getElementById('movement'))

		// Dimension of the red zone
		/*let width_mvt = bottomRight[0] - topLeft[0]
		let height_mvt = bottomRight[1] - topLeft[1]
		document.getElementById('movement').style.width = width_mvt + 'px';
		document.getElementById('movement').style.height = height_mvt + 'px';*/

		document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
		document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';

		// Sensor 1
		let x_top_right = points_value.x + points_value.width
		let y_bottom_right = points_value.y + points_value.height
		// Sensor 2
		let x_top_right2 = points_value2.x + points_value2.width
		let y_bottom_right2 = points_value2.y + points_value2.height

		console.log(x_top_right)
		console.log(y_bottom_right)
		console.log(x_top_right2)
		console.log(x_top_right2)

		// Compare the points of the Konva square (sensor 1) and the movement
		if ((topLeft[0] >= points_value.x && topLeft[1] >= points_value.y
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
		// Compare the points of the Konva square (sensor 2) and the movement
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

	function newValue1() {
		key = $("#select_rect1").val().toLowerCase();
	}

	function newValue2() {
		key2 = $("#select_rect2").val().toLowerCase();
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

		if (rendering === true) {
			let anim = new Konva.Animation(function () {
			}, layer)
			raf(main.bind(anim.start()))
		}
	}

	initialize();
}
