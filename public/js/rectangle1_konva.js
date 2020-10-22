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
    y: stage.height() - 500,
    width: 400,
    height: 500,
    stroke: 'blue',
    strokeWidth:0,
    visible: false,
    name: 'rect1',
    draggable: false,
    // Set points when the rectangle is dragged 
    dragBoundFunc: function(pos) {
        var width = rect1.width() * rect1.scaleX();
        var height = rect1.height() * rect1.scaleY();
        var MAX_X = pos.x + width
        var MAX_Y = pos.y + height

        // Coté gauche de la page
        if (pos.x < MIN_X) {
            pos.x = MIN_X;
        }

        // Coté droit de la page
        if (MAX_X > MAX_WIDTH) {
            pos.x = MAX_WIDTH - width;
        }

        // En haut de la page
        if (pos.y < MIN_Y) {
            pos.y = MIN_Y;
        }

        // En bas de la page
        if (MAX_Y > MAX_HEIGHT) {
            pos.y = MAX_HEIGHT - height;
        }

        points = {
            "x": pos.x,
            "y":pos.y,
            "width":width,
            "height":height
        }
        //console.log(points)
        //console.log(stage.width() / 2)
        //console.log(MAX_X)
        //console.log(MAX_WIDTH)
        //console.log(MAX_Y)

        return pos;
    }
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

// Start to show the rectangle when the button Sensor 1 by default
$('#select_rect1').removeAttr('disabled');
layer.add(rect1);
layer.add(tr);
tr.attachTo(rect1);
rect1.show();
tr.show()
layer.draw();

$('#threshold').click(function () {
    if ($(this).is(':checked')) {
        key = $("#select_rect1").val().toLowerCase();
        // if points_value is empty (not dragged or transformed)
        if (Object.keys(points).length === 0 && points.constructor === Object) {
            points_value = {
                "x":rect1.x(),
                "y":rect1.y(),
                "width":rect1.width(),
                "height":rect1.height()
            }
        } else {
            points_value = points
        }
    } else {
        points_value = {}
    }
});

// Set the points of the rectangle when the button Threshold is clicked_
/*$('#threshold_label_btn').click(function (e) {
    e.preventDefault()
    let checkboxThreshold = $('#threshold');

    checkboxThreshold.prop("checked", true)

    if (checkboxThreshold.is(':checked')) {
        $('#threshold_label_btn').val("Désactiver la détection de mouvement")
        key = $("#select_rect1").val().toLowerCase();
        // if points_value is empty (not dragged or transformed)
        if (Object.keys(points).length === 0 && points.constructor === Object) {
            points_value = {
                "x":rect1.x(),
                "y":rect1.y(),
                "width":rect1.width(),
                "height":rect1.height()
            }
        } else {
            points_value = points
        }
    } else {
        points_value = {}
    }

});*/
