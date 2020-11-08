let points_value = {}
let points = {}
let key;

//Part linked to the rectangles
let MIN_X = 2
let MIN_Y = 2
let MAX_WIDTH = 700;
let MIN_WIDTH = 150;
let MAX_HEIGHT = 600;
let MIN_HEIGHT = 400;

// The blue rectangle
let rect1 = new Konva.Rect({
    x: 0,
    y: stage.height() - (MAX_HEIGHT/2),
    width: 150,
    height: 300,
    stroke: 'blue',
    strokeWidth:0,
    visible: false,
    name: 'rect1',
    draggable: false
});

// Transformer of rect (the outside of the rectangle)
let tr = new Konva.Transformer({
    boundBoxFunc: function(oldBoundBox, newBoundBox) {
    let MAX_X = newBoundBox.x + newBoundBox.width
    let MAX_Y = newBoundBox.y + newBoundBox.height
        
      // Points set when the rectangle is descreased of increased
      if (newBoundBox.x < MIN_X) {
        tr.stopTransform();
        newBoundBox.x = MIN_X;
      }
      if (MAX_X > MAX_WIDTH) {
        tr.stopTransform();
        newBoundBox.x = MAX_WIDTH - newBoundBox.width;
      }
      if (newBoundBox.y < MIN_Y) {
        tr.stopTransform();
        newBoundBox.y = MIN_Y;
      }
      if (MAX_Y > MAX_HEIGHT) {
        tr.stopTransform();
        newBoundBox.y = MAX_HEIGHT - newBoundBox.height;
      }

      if (newBoundBox.width > MAX_WIDTH) {
        newBoundBox.width = MAX_WIDTH;
      }
      if (newBoundBox.width < MIN_WIDTH) {
        newBoundBox.width = MIN_WIDTH;
      }
      if (newBoundBox.height > MAX_HEIGHT) {
        newBoundBox.height = MAX_HEIGHT;
      }
      if (newBoundBox.height < MIN_HEIGHT) {
        newBoundBox.height = MIN_HEIGHT;
      }
      
      points = {
          "x": newBoundBox.x,
          "y":newBoundBox.y,
          "width":newBoundBox.width,
          "height":newBoundBox.height
      }
      return newBoundBox;
    }
  });

//Type of mouse for the rectangle
rect1.on('mouseenter', function() {
    stage.container().style.cursor = 'move';
});

rect1.on('mouseleave', function() {
    stage.container().style.cursor = 'default';
});

//rect2
let points_value2 = {}
let points2 = {}
let key2;

//Part linked to the rectangles
let MIN_X2 = 1
let MIN_Y2 = 1
let MAX_WIDTH2 = 700;
let MIN_WIDTH2 = 150;
let MAX_HEIGHT2 = 600;
let MIN_HEIGHT2 = 400;

// The blue rectangle
let rect2 = new Konva.Rect({
    x: stage.width() - 150,
    y: stage.height() - (MAX_HEIGHT2/2),
    width: 150,
    height: 300,
    stroke: 'green',
    strokeWidth:0,
    visible: false,
    name: 'rect2',
    draggable: false
});

//console.log(rect2.attrs)

// Transformer of rect (the outside of the rectangle)
let tr2 = new Konva.Transformer({
    boundBoxFunc: function(oldBoundBox, newBoundBox) {
        let MAX_X2 = newBoundBox.x + newBoundBox.width
        let MAX_Y2 = newBoundBox.y + newBoundBox.height

        // Points set when the rectangle is descreased of increased
        if (newBoundBox.x < MIN_X2) {
            tr2.stopTransform();
            newBoundBox.x = MIN_X;
        }
        if (MAX_X2 > MAX_WIDTH2) {
            tr2.stopTransform();
            newBoundBox.x = MAX_WIDTH2 - newBoundBox.width;
        }
        if (newBoundBox.y < MIN_Y2) {
            tr2.stopTransform();
            newBoundBox.y = MIN_Y2;
        }
        if (MAX_Y2 > MAX_HEIGHT2) {
            tr2.stopTransform();
            newBoundBox.y = MAX_HEIGHT2 - newBoundBox.height;
        }

        if (newBoundBox.width > MAX_WIDTH2) {
            newBoundBox.width = MAX_WIDTH2;
        }
        if (newBoundBox.width < MIN_WIDTH2) {
            newBoundBox.width = MIN_WIDTH2;
        }
        if (newBoundBox.height > MAX_HEIGHT2) {
            newBoundBox.height = MAX_HEIGHT2;
        }
        if (newBoundBox.height < MIN_HEIGHT2) {
            newBoundBox.height = MIN_HEIGHT2;
        }

        points2 = {
            "x": newBoundBox.x,
            "y":newBoundBox.y,
            "width":newBoundBox.width,
            "height":newBoundBox.height
        }
        return newBoundBox;
    }
});

//Type of mouse for the rectangle
rect2.on('mouseenter', function() {
    stage.container().style.cursor = 'move';
});

rect2.on('mouseleave', function() {
    stage.container().style.cursor = 'default';
});

let modeVal;
/*
$("#modes").change(function(e) {
    modeVal = e.target.options[e.target.options.selectedIndex].value
    if(modeVal === "presentation") {
        console.log("mode presentation")
        $("#btn-sensor1").prop("disabled", true)
        $("#btn-sensor2").prop("disabled", true)
    } else if(modeVal === "drawing") {
        console.log("mode dessin")
        $("#btn-sensor1").prop("disabled", false)
        $("#btn-sensor2").prop("disabled", false)
    } else if(modeVal === "navigation") {
        console.log("mode navigation")
        $("#btn-sensor1").prop("disabled", false)
        $("#btn-sensor2").prop("disabled", false)
    }
})*/

// Start to show the rectangle when the button Sensor 1 is clicked and change value of button
function changeS1() {
    if (document.getElementById("btn1").value === "Sensor 1 désactivé") {
        document.getElementById("btn1").value = "Sensor 1 activé";
        document.getElementById("btn1").style.backgroundColor= "green";
        document.getElementById("btn1").style.color= "white";
        $('#select_rect1').removeAttr('disabled');
        layer.add(rect1);
        layer.add(tr);
        tr.attachTo(rect1);
        rect1.show();
        tr.show()

        layer.draw();
    } else {
        document.getElementById("btn1").value = "Sensor 1 désactivé";
        document.getElementById("btn1").style.backgroundColor= "blue";
        document.getElementById("btn1").style.color= "white";
        $('#select_rect1').attr('disabled', true);
        rect1.hide();
        tr.hide();

        layer.draw();
    }
}


// Start to show the rectangle when the button Sensor 2 is clicked and change value of button
function changeS2() {
    if (document.getElementById("btn2").value === "Sensor 2 désactivé") {
        document.getElementById("btn2").value = "Sensor 2 activé";
        document.getElementById("btn2").style.backgroundColor= "green";
        document.getElementById("btn2").style.color= "white";

        $('#select_rect2').removeAttr('disabled');
        layer.add(rect2);
        layer.add(tr2);
        tr2.attachTo(rect2);
        rect2.show();
        tr2.show()

        layer.draw();
    } else {
        document.getElementById("btn2").value = "Sensor 2 désactivé";
        document.getElementById("btn2").style.backgroundColor= "blue";
        document.getElementById("btn2").style.color= "white";

        $('#select_rect2').attr('disabled', true);
        rect2.hide();
        tr2.hide();

        layer.draw();
    }
}


// Both
if ((document.getElementById("btn1").value == "Sensor 1 activé") && (document.getElementById("btn2").value = "Sensor 2 activé") ){
    $('#select_rect1').removeAttr('disabled');
    $('#select_rect2').removeAttr('disabled');
    layer.add(rect1);
    layer.add(tr);
    tr.attachTo(rect1);
    rect1.show();
    tr.show()

    layer.add(rect2);
    layer.add(tr2);
    tr2.attachTo(rect2);
    rect2.show();
    tr2.show()

    layer.draw();
}


$('#threshold').click(function () {
    if ($(this).is(':checked')) {
        key = $("#select_rect1").val().toLowerCase();
        // if points_value is empty (not dragged or transformed)
        if (Object.keys(points).length === 0 && points.constructor === Object) {
            points_value = {
                "x": rect1.x(),// + sensor1DivWidth,
                "y": rect1.y() + titleHeight,
                "width": rect1.width(),
                "height": rect1.height()
            }
            console.log(points_value)
        } else {
            points_value = points
        }
    } else {
        points_value = {}
    }
});

$('#threshold').click(function () {
    if (($(this).is(':checked'))) {
        $("#select_rect2").onchange = newValue();
        key2 = $("#select_rect2").val().toLowerCase();
        // if points_value is empty (not dragged or transformed)
        if (Object.keys(points2).length === 0 && points2.constructor === Object) {
            points_value2 = {
                "x": rect2.x(),// + sensor1DivWidth,
                "y": rect2.y() + titleHeight,
                "width": rect2.width(),
                "height": rect2.height()
            }

        } else {
            points_value2 = points2
        }
    } else {
        points_value2 = {}
    }
});

function newValue() {
    key2 = $("#select_rect2").val().toLowerCase();
}
