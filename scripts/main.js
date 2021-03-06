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
  hexGrid = new HexGrid(3, hexWidth, "hex");

  // Set up interface buttons and interaction
  var hexButton = document.getElementById("hex-button");
  var rectangleButton = document.getElementById("rectangle-button");
  var sizeSlider = document.getElementById("size-slider");
  sizeSlider.value = hexGrid.size;

  // Change the map to a hex shape
  hexButton.addEventListener('click', function() {
    hexGrid.shape = "hex";
    if (sizeSlider.value > 5) {
      sizeSlider.value = 5;
      hexGrid.size = sizeSlider.value;
    }
    sizeSlider.max = 5;
    hexGrid.createGrid();
  });

  // Change the map to a rectangle shape
  rectangleButton.addEventListener('click', function() {
    hexGrid.shape = "rectangle";
    sizeSlider.max = 15;
    hexGrid.createGrid();
  });

  // Change the size of the map
  sizeSlider.addEventListener("change", function() {
    hexGrid.size = sizeSlider.value;
    hexGrid.createGrid();
  }, false);

  // Show current hex and its neighbors when hovering
  gameCanvas.element.addEventListener("mousemove", function() {
    var currentHex;
    var foundHex;
    var x = event.pageX;
    var y = event.pageY;

    for (var hex in hexGrid.grid) {
      currentHex = hexGrid.grid[hex];
      currentHex.color = "#30A7BF"
      currentHex.selected = false;
      if (pnpoly(currentHex, x, y)) {
        foundHex = currentHex;
      }
    }

    foundHex.selected = true;
    for (var i = 0; i < foundHex.neighbors.length; i++) {
      foundHex.neighbors[i].color = "#a1d6e1";
      foundHex.neighbors[i].selected = true;
    }
  }, false);

  // Draw everything. Use the first line to enable animation, use the second line to draw only once
  setInterval(draw, 10);
  // draw();
}
