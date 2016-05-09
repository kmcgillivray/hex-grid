// Hexagon parameters – change the size of the hexagons here
var hexWidth = 40;

// Hex Grid parameters – change the size of the grid here
var rows = 5;
var columns = 5;

// Global element variables – don't touch these
var gameCanvas;
var ctx;
var hexGrid;

function draw() {

  // Clear the screen every frame
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw each hex in the grid
  for (var hex in hexGrid.grid) {
    hexGrid.grid[hex].draw();
  }
}

window.onload = function() {
  // Create the canvas object and add the canvas element to the view
  gameCanvas = new Canvas(window.innerWidth, window.innerHeight);
  gameCanvas.draw();
  ctx = gameCanvas.element.ctx;

  // Generate a hex grid with the given number of rows
  hexGrid = new HexGrid(3);

  // Grab one hex
  var myHex = hexGrid.getHex(0, 3, -3);
  // Select the hex and its neighbors
  myHex.selected = true;
  for (var i = 0; i < myHex.neighbors.length; i++) {
    myHex.neighbors[i].selected = true;
  }

  // Draw everything. Use the first line to enable animation, use the second line to draw only once
  // setInterval(draw, 10);
  draw();
}
