var points_value2 = {}
var points2 = {}
var key2;

//Part linked to the rectangles
var MIN_X2 = 1
var MIN_Y2 = 1
var MAX_WIDTH2 = 350;
var MIN_WIDTH2 = 20;
var MAX_HEIGHT2 = 200;
var MIN_HEIGHT2 = 20;

// The blue rectangle
var rect2 = new Konva.Rect({
    x: stage.width() / 3,
    y: stage.height() / 3,
    width: 80,
    height: 20,
    stroke: 'blue',
    strokeWidth:0,
    visible: false,
    name: 'rect2',
    draggable: true,
    // Set points when the rectangle is dragged 
    dragBoundFunc: function(pos) {
        var width2 = rect2.width() * rect2.scaleX();
        var height2 = rect2.height() * rect2.scaleY();
        var MAX_X2 = pos.x + width2
        var MAX_Y2 = pos.y + height2

        if (pos.x < MIN_X2) {
            pos.x = MIN_X2;
        }
        if (MAX_X2 > MAX_WIDTH2) {
            pos.x = MAX_WIDTH2 - width2;
        }
        if (pos.y < MIN_Yé) {
            pos.y = MIN_Y2;
        }
        if (MAX_Y2 > MAX_HEIGHT2) {
            pos.y = MAX_HEIGHT2 - height2;
        }

        points = {
            "x": pos.x,
            "y":pos.y,
            "width":width2,
            "height":height2
        }

        return pos;
    }
});

// Transformer of rect (the outside of the rectangle)
var tr = new Konva.Transformer({
    boundBoxFunc: function(oldBoundBox, newBoundBox) {
    var MAX_X2 = newBoundBox.x + newBoundBox.width
    var MAX_Y2 = newBoundBox.y + newBoundBox.height
        
      // Points set when the rectangle is descreased of increased
      if (newBoundBox.x < MIN_X2) {
        tr.stopTransform();
        newBoundBox.x = MIN_X;
      }
      if (MAX_X2 > MAX_WIDTH2) {
        tr.stopTransform();
        newBoundBox.x = MAX_WIDTH2 - newBoundBox.width;
      }
      if (newBoundBox.y < MIN_Y2) {
        tr.stopTransform();
        newBoundBox.y = MIN_Y2;
      }
      if (MAX_Y > MAX_HEIGHT2) {
        tr.stopTransform();
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
rect2.on('mouseenter', function() {
stage.container().style.cursor = 'move';
});

rect2.on('mouseleave', function() {
stage.container().style.cursor = 'default';
});

//Start to show the rectangle when the button Sensor 1 is clicked
$('#rect2').click(function () {
    if ($(this).is(':checked')) {
        $('#select_rect2').removeAttr('disabled');
        layer.
        layer.add(rect2);
        layer.add(tr);
        tr.attachTo(rect2);
        rect2.show();
        tr.show()
        layer.draw();
    } else {
        $('#select_rect2').attr('disabled', true);
        rect2.hide();
        tr.hide()
        layer.draw();
    }
});

// Set the points of the reactangle when the button Threshold is clicked_
$('#threshold').click(function () {
    if ($(this).is(':checked')) {
        key = $("#select_rect2").val().toLowerCase();
        // if points_value is empty (not dragged or transformed)
        if (Object.keys(points).length === 0 && points.constructor === Object) {
            points_value = {
                "x":rect2.x(),
                "y":rect2.y(),
                "width":rect2.width(),
                "height":rect2.height()
            }
        } else {
          points_value = points
        }
    } else {
      points_value = {}
    }
});