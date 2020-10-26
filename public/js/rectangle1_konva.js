var points_value = {}
var points = {}
var key;

//Part linked to the rectangles
var MIN_X = 2
var MIN_Y = 2 
var MAX_WIDTH = window.innerWidth - 30;
var MIN_WIDTH = 1000;
var MAX_HEIGHT = window.innerHeight - 100;
var MIN_HEIGHT = 1000;

// The blue rectangle
var rect1 = new Konva.Rect({
    x: 0,
    y: stage.height() / 3,
    width: 300,
    height: MAX_HEIGHT / 3,
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
var points_value2 = {}
var points2 = {}
var key2;

//Part linked to the rectangles
var MIN_X2 = 1
var MIN_Y2 = 1
var MAX_WIDTH2 = window.innerWidth - 30;
var MIN_WIDTH2 = 1000;
var MAX_HEIGHT2 = window.innerHeight - 100;
var MIN_HEIGHT2 = 1000;

// The blue rectangle
var rect2 = new Konva.Rect({
    x: stage.width() - 300,
    y: stage.height() / 3,
    width: 300,
    height: MAX_HEIGHT2 / 3,
    stroke: 'green',
    strokeWidth:0,
    visible: false,
    name: 'rect2',
    draggable: false
});

// Transformer of rect (the outside of the rectangle)
var tr2 = new Konva.Transformer({
    boundBoxFunc: function(oldBoundBox, newBoundBox) {
        var MAX_X2 = newBoundBox.x + newBoundBox.width
        var MAX_Y2 = newBoundBox.y + newBoundBox.height

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

// Start to show the rectangle of the Sensor 1 by default
layer.add(rect1);
layer.add(tr);
tr.attachTo(rect1);
rect1.show();
tr.show()
layer.draw();

// Start to show the rectangle of the Sensor 2 by default
layer.add(rect2);
layer.add(tr2);
tr2.attachTo(rect2);
rect2.show();
tr2.show()
layer.draw();

$('#threshold').click(function () {
    if ($(this).is(':checked')) {
        key = $("#select_rect1").val().toLowerCase();
        // if points_value is empty (not dragged or transformed)
        if (Object.keys(points).length === 0 && points.constructor === Object) {
            points_value = {
                "x": rect1.x(),
                "y": rect1.y(),
                "width": rect1.width(),
                "height": rect1.height()
            }
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
                "x": rect2.x(),
                "y": rect2.y(),
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
