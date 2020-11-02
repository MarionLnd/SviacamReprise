//set width and height of the stage and webcam
const width = 400;
const height = 300;

var video = document.createElement('video')
video.autoplay = true

// Creation of Konva Stage
var stage = new Konva.Stage({
    container: 'container',
    x:0,
    y:0,
    width: width,
    height: height
});

// Creation of Konva Layer
var layer = new Konva.Layer();
stage.add(layer);

var webcam = new Konva.Image({
    image: video,
    x: 0,
    y: 0,
    width: width,
    height: height
});
layer.add(webcam);

var imageObj = new Image(width, height)

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


