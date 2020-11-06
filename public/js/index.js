// Set width and height of the stage and webcam
let width = 700
let height = 600

let titleHeight = $("#main-title").height() + parseInt($("#main-title").css("marginBottom").replaceAll("px", ""))
let sensor1DivWidth = Math.round($("#sensor1_div").width())
    + parseInt($("#sensor1_div").css("paddingLeft").replaceAll("px", ""))
    + parseInt($("#sensor1_div").css("paddingRight").replaceAll("px", ""))
    + 80

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
                core = core()
            })
            .catch(function (error) {
                console.log("Webcam is not working")
                console.log(error.code)
            })
    }
}

get_video()


