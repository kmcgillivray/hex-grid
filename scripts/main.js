// Hexagon parameters – change the size of the hexagons here
var nodeWidth = 80;

// Hex Grid parameters – change the size of the grid here
var rows = 5;
var columns = 5;

// Global element variables – don't touch these
var gameCanvas;
var ctx;
var nodes = [];

function draw() {

  // Clear the screen every frame
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  console.log(nodes);
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].draw();
  }
}

window.onload = function() {
  // Create the canvas object and add the canvas element to the view
  gameCanvas = new Canvas(window.innerWidth, window.innerHeight);
  gameCanvas.draw();
  ctx = gameCanvas.element.ctx;

  var directions = [
     {x:+1, y:-1, z: 0}, {x:+1, y: 0, z:-1}, {x: 0, y:+1, z:-1},
     {x:-1, y:+1, z: 0}, {x:-1, y: 0, z:+1}, {x: 0, y:-1, z:+1}
  ]

  // This one works for an offset grid
  // for (var i = 0; i < 20; i++) {
  //   for (var j = 0; j < 10; j++) {
  //     var x = i;
  //     var z = j - (i + (i%2)) / 2;
  //     var y = -x-z;
  //     nodes.push(new Node({x: x, y: y, z: z}, 40));
  //   }
  // }

  var size = 3;
  for (var i = -size; i <= size; i++) {
    var max = -(size - Math.abs(i));
    if (i > 0) {
      max = -max;
    }
    for (var j = -size; j <= size; j++) {
      if (i <= 0 && j >= max || i >= 0 && j <= max) {
        var x = i;
        var z = j;
        var y = -x-z;
        nodes.push(new Node({x: x, y: y, z: z}, 40));
      }
    }
  }

  // Draw everything. Use the first line to enable animation, use the second line to draw only once
  // setInterval(draw, 10);
  draw();
}
