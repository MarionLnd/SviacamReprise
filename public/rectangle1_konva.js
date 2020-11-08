var points_value = {}
var points = {}
var key;

//Part linked to the rectangles
var MIN_X = 2
var MIN_Y = 2 
var MAX_WIDTH = 395;
var MIN_WIDTH = 50;
var MAX_HEIGHT = 295;
var MIN_HEIGHT = 50;

// The blue rectangle
var rect1 = new Konva.Rect({
    x: 0,
    y: stage.height() / 3,
    width: 50,
    height: 50,
    stroke: 'black',
    strokeWidth:0,
    visible: false,
    name: 'rect1',
    draggable: true,
    // Set points when the rectangle is dragged 
    dragBoundFunc: function(pos) {
        var width = rect1.width() * rect1.scaleX();
        var height = rect1.height() * rect1.scaleY();
        var MAX_X = pos.x + width
        var MAX_Y = pos.y + height

        if (pos.x < MIN_X) {
            pos.x = MIN_X;
        }
        if (MAX_X > MAX_WIDTH) {
            pos.x = MAX_WIDTH - width;
        }
        if (pos.y < MIN_Y) {
            pos.y = MIN_Y;
        }
        if (MAX_Y > MAX_HEIGHT) {
            pos.y = MAX_HEIGHT - height;
        }

        points = {
            "x": pos.x,
            "y":pos.y,
            "width":width,
            "height":height
        }

        return pos;
    }
});

// Transformer of rect (the outside of the rectangle)
var tr = new Konva.Transformer({
    boundBoxFunc: function(oldBoundBox, newBoundBox) {
    var MAX_X = newBoundBox.x + newBoundBox.width
    var MAX_Y = newBoundBox.y + newBoundBox.height
        
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
var MAX_WIDTH2 = 350;
var MIN_WIDTH2 = 20;
var MAX_HEIGHT2 = 200;
var MIN_HEIGHT2 = 20;

// The blue rectangle
var rect2 = new Konva.Rect({
    x: stage.width() - 50 ,
    y: stage.height() / 3,
    width: 50,
    height: 50,
    stroke: 'green',
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
        if (pos.y < MIN_Y2) {
            pos.y = MIN_Y2;
        }
        if (MAX_Y2 > MAX_HEIGHT2) {
            pos.y = MAX_HEIGHT2 - height2;
        }

        points2 = {
            "x": pos.x,
            "y":pos.y,
            "width":width2,
            "height":height2
        }

        return pos;
    }
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

//Start to show the rectangle when the button Sensor 1 is clicked and change value of button

function changeS1() {
  if (document.getElementById("btn1").value == "Sensor 1 désactivé")
{
  document.getElementById("btn1").value = "Sensor 1 activé";
  $('#select_rect1').removeAttr('disabled');
        layer.add(rect1);
        layer.add(tr);
        tr.attachTo(rect1);
        rect1.show();
        tr.show()

        layer.draw();
}else
{
  document.getElementById("btn1").value = "Sensor 1 désactivé";
  $('#select_rect1').attr('disabled', true);
        rect1.hide();
        tr.hide();
        
        layer.draw();
}

}


//Start to show the rectangle when the button Sensor 2 is clicked and change value of button

function changeS2() {
  if (document.getElementById("btn2").value == "Sensor 2 désactivé")
{
  document.getElementById("btn2").value = "Sensor 2 activé";
  $('#select_rect2').removeAttr('disabled');
        layer.add(rect2);
        layer.add(tr2);
        tr2.attachTo(rect2);
        rect2.show();
        tr2.show()

        layer.draw();
}else
{
  document.getElementById("btn2").value = "Sensor 2 désactivé";
  $('#select_rect2').attr('disabled', true);
        rect2.hide();
        tr2.hide();
        
        layer.draw();
}

}


//both 
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
// Set the points of the reactangle when the button Threshold is clicked_
$('#threshold').click(function () {
  if (($('#threshold').is(':checked'))) {
    if (document.getElementById("btn1").value = "Sensor 1 activé") {
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
  }else{
    points_value = {}
  }
});
$('#threshold').click(function () {
  if (($('#threshold').is(':checked'))) {
  if (document.getElementById("btn2").value = "Sensor 2 activé") {
   
      key2 = $("#select_rect2").val().toLowerCase();
      // if points_value is empty (not dragged or transformed)
      if (Object.keys(points2).length === 0 && points2.constructor === Object) {
          points_value2 = {
              "x":rect2.x(),
              "y":rect2.y(),
              "width":rect2.width(),
              "height":rect2.height()
          }
          
      } else {
        points_value2 = points2
      }
  } else {
    points_value2 = {}
  }
}else{
  points_value2 = {}
}
});  