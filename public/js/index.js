// Set width and height of the stage and webcam

let width = 700
let height = 600

let titleHeight = $("#main-title").height() + parseInt($("#main-title").css("marginBottom").replaceAll("px", ""))

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
    'go_up': '👆',
    'victory': '✌',
    'thumbs_down': '👇',
    'thumbs_left': '👉',
    'thumbs_right': '👈',
    'thumbs_Curl': '✊'
};

async function main() {
    const canvas = document.querySelector("#pose-canvas");
    const ctx = canvas.getContext("2d");
    const resultLayer = document.querySelector("#pose-result");
    //add new gestures
    //up
    const thumbsupGesture = new fp.GestureDescription('go_up');
    thumbsupGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    thumbsupGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
    thumbsupGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.5);
    thumbsupGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.5);
    thumbsupGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
    thumbsupGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
    thumbsupGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
    thumbsupGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
    //down
    const thumbsDownGesture = new fp.GestureDescription('thumbs_down');
    thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
    thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);
    thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.5);
    thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.5);
    thumbsDownGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
    thumbsDownGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
    thumbsDownGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
    thumbsDownGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

    //left
    const thumbsleftGesture = new fp.GestureDescription('thumbs_left');
    thumbsleftGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    thumbsleftGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
    thumbsleftGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
    thumbsleftGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
    thumbsleftGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
    thumbsleftGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

    //right
    const thumbsRightGesture = new fp.GestureDescription('thumbs_right');
    thumbsRightGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
    thumbsRightGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
    thumbsRightGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
    thumbsRightGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
    thumbsRightGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
    thumbsRightGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

    //close
    const thumbsCurlGesture = new fp.GestureDescription('thumbs_Curl');

    thumbsCurlGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
    thumbsCurlGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
    thumbsCurlGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
    thumbsCurlGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
    thumbsCurlGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

    const knownGestures = [
        fp.Gestures.VictoryGesture,
        thumbsupGesture,
        thumbsleftGesture,
        thumbsDownGesture,
        thumbsRightGesture,
        thumbsCurlGesture

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

        for (let i = 0; i < predictions.length; i++) {
            // draw colored dots at each predicted joint position
            for (let part in predictions[i].annotations) {
                for (let point of predictions[i].annotations[part]) {
                    drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
                }
            }
            // now estimate gestures based on landmarks
            // using a minimum confidence of 7.5 (out of 10)
            const est = GE.estimate(predictions[i].landmarks, 7.5);

            if (est.gestures.length > 0) {

                // find gesture with highest confidence
                let result = est.gestures.reduce((p, c) => {
                    return (p.confidence > c.confidence) ? p : c;
                });

                resultLayer.innerText = gestureStrings[result.name];
                console.log(result.name);

                if (result.name === "victory") {
                    console.log("C'est Ok jusque là");


                    //  alert("ok");



                }
            }
        }
        setTimeout(() => { estimateHands(); }, 1000 / video.fps);
    };
    await estimateHands();

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


