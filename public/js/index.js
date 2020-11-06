// Set width and height of the stage and webcam
let width = window.innerWidth - 300
let height = window.innerHeight - 100

$(window).resize(function() {
    //width = $( window ).width()
    //height = $( window ).height()
})

let video = document.createElement('video')
video.autoplay = true

// Creation of Konva Stage
let stage = new Konva.Stage({
    container: 'video-container',
    width: width,
    height: height
});

// Creation of Konva Layer
let layer = new Konva.Layer();
stage.add(layer);

let webcam = new Konva.Image({
    image: video,
    x: 0,
    y: 0,
    width: width,
    height: height
});
layer.add(webcam);

let imageObj = new Image(width, height)

const landmarkColors = {
    thumb: 'red',
    indexFinger: 'blue',
    middleFinger: 'yellow',
    ringFinger: 'green',
    pinky: 'pink',
    palmBase: 'white'
};

const gestureStrings = {
    'thumbs_up': '👍',
    'victory': '✌🏻'
};

async function main() {
    // const video = document.querySelector("#video-container");
    const canvas = document.querySelector("#pose-canvas");
    const ctx = canvas.getContext("2d");
    const resultLayer = document.querySelector("#pose-result");

    const knownGestures = [
        fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture
    ];
    const GE = new fp.GestureEstimator(knownGestures);

    // load handpose model
    const model = await handpose.load();
    console.log("Handpose model loaded");

        const estimateHands = async () => {

        // clear canvas overlay
        ctx.clearRect(0, 0, video.width, video.height);
        resultLayer.innerText = '';

        // get hand landmarks from video
        // Note: Handpose currently only detects one hand at a time
        // Therefore the maximum number of predictions is 1
        const predictions = await model.estimateHands(video, true);

        for(let i = 0; i < predictions.length; i++) {
            // draw colored dots at each predicted joint position
            for(let part in predictions[i].annotations) {
                for(let point of predictions[i].annotations[part]) {
                    drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
                }
            }
            // now estimate gestures based on landmarks
            // using a minimum confidence of 7.5 (out of 10)
            const est = GE.estimate(predictions[i].landmarks, 7.5);

            if(est.gestures.length > 0) {

                // find gesture with highest confidence
                let result = est.gestures.reduce((p, c) => {
                    return (p.confidence > c.confidence) ? p : c;
                });

                resultLayer.innerText = gestureStrings[result.name];
            }
        }

        // ...and so on
        setTimeout(() => { estimateHands(); }, 1000 / video.fps);
    };
    estimateHands();

    console.log("Starting predictions");
}

function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

//Function to play the video
function get_video() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(
            {
                audio: false,
                video: true
            })
            .then(function (stream) {
                console.log("Webcam is working")
                video.srcObject = stream
                video.play()
                video.addEventListener("loadeddata", event => {
                    console.log("Camera is ready");
                    main();
                });
                core = core()
            })
            .catch(function (error) {
                console.log("Webcam is not working")
                console.log(error.code)
            })
    }
}
get_video()
