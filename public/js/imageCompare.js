function image_compare() {
		let sensitivity,
			temp1Canvas, 
			temp1Context, 
			temp2Canvas, 
			temp2Context, 
			topLeft, 
			bottomRight;

		/*
		 * Initializes the canvas for the comparaison.
		 */
		function initialize() {
			sensitivity = 40;

			if(!temp1Canvas) {
				temp1Canvas = document.createElement('canvas');
				temp1Context = temp1Canvas.getContext("2d");
			}

			if(!temp2Canvas) {
				temp2Canvas = document.createElement('canvas');
				temp2Context = temp2Canvas.getContext("2d");
			}

			//console.log(temp1Canvas.style)

			topLeft = [Infinity,Infinity];
			bottomRight = [0,0];
		}

		/*
		 * Compares to images.
		 *
		 * @param <Element> image1 The canvas of the first image.
		 * @param <Element> image2 The canvas of the second image.
		 * @param <Int>		width  The width to compare.
		 * @param <Int>		height The height to compare
		 *
		 * @return <Object> The top left, and the bottom right pixels.
		 *
		 */
		function compare(image1, image2, width, height) {
			initialize();

			if(!image1 || !image2) {
				return;
			}

			// Waiting for the first image to load to start the comparaison
			image1.onload = function() {
				//temp1Context.clearRect(0, 0, 100000, 100000);
				//temp2Context.clearRect(0, 0, 100000, 100000);

				temp1Context.drawImage(image1, window.innerWidth / 100, window.innerHeight / 100, width, height);
				temp2Context.drawImage(image2, window.innerWidth / 100, window.innerHeight / 100, width, height);
				//temp1Context.drawImage(image1, 0, 0, width, height);
				//temp2Context.drawImage(image2, 0, 0, width, height);
			}
					
			for(let y = 0; y < height; y++) {
				for(let x = 0; x < width; x++) {
					let pixel1 = temp1Context.getImageData(x,y,1,1);
					let pixel1Data = pixel1.data;

					let pixel2 = temp2Context.getImageData(x,y,1,1);
					let pixel2Data = pixel2.data;
					
					if(comparePixel(pixel1Data, pixel2Data) === false) {
						setTopLeft(x,y);
						setBottomRight(x,y);
					}					
				}
			}

			return {
				'topLeft': topLeft,
				'bottomRight': bottomRight
			}
		
		}

		/*
		 * Compares an individual pixel (within a range based on sensitivity).
		 *
		 * @param <Array> p1 The first pixel [r,g,b,a].
		 * @param <Array> p2 The second pixel [r,g,b,a].
		 *
		 * @return <Boolean> If they are the same.
		 *
		 */
		function comparePixel(p1, p2) {
			let matches = true;

			for(let i = 0; i < p1.length; i++) {
				let t1 = Math.round(p1[i]/10)*10;
				let t2 = Math.round(p2[i]/10)*10;

				if(t1 !== t2) {
					if((t1+sensitivity < t2 || t1-sensitivity > t2)) {
						matches = false;
					}
				}
			}

			return matches;
		}

		/*
		 * Sets the top left pixel.
		 *
		 * @param <int> x The x position.
		 * @param <int> y The y position.
		 *
		 * @return void.
		 *
		 */
		function setTopLeft(x, y) {
			if(x < topLeft[0] ) {
				topLeft[0] = x;
			}
			if(y < topLeft[1]) {
				topLeft[1] = y;
			}
		}

		/*
		 * Sets the bottom right pixel.
		 *
		 * @param <int> x The x position.
		 * @param <int> y The y position.
		 *
		 * @return void.
		 *
		 */
		function setBottomRight(x, y) {
			if(x > bottomRight[0]) {
				bottomRight[0] = x;
			}
			if(y > bottomRight[1]) {
				bottomRight[1] = y;
			}
		}

		// Initialize on creation.
		initialize();

		// Return public interface.
		return {
			compare: compare
		}
	}

