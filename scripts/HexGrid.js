/*
Class: HexGrid
Properties: size (number), hexWidth (number)
Description: Creates a cube coordinate system hex grid with the given number of rows of hexagons
*/

function HexGrid(size, hexWidth, shape) {
  this.size = size;
  this.hexWidth = hexWidth;
  this.shape = shape || "hex";
  this.center = {x: window.innerWidth/2, y: window.innerHeight/2};
  this.grid = {};
  this.directions = [
     {x:+1, y:-1, z: 0}, {x:+1, y: 0, z:-1}, {x: 0, y:+1, z:-1},
     {x:-1, y:+1, z: 0}, {x:-1, y: 0, z:+1}, {x: 0, y:-1, z:+1}
  ];
  this.init();
}

HexGrid.prototype = (function() {

  function createGrid() {
    this.grid = {};
    if (this.shape == "hex") {
      createHexShape.call(this);
    } else if (this.shape == "rectangle") {
      createRectangleShape.call(this);
    }
    generateNeighbors.call(this);
  }

  function createRectangleShape() {
    var width = this.hexWidth + (this.size - 1) * (this.hexWidth * 0.75) * 2;
    var hexHeight = this.hexWidth * Math.sqrt(3)/2;
    var height = (hexHeight * 6 + hexHeight / 2) * 2;
    console.log(height);
    this.center = {x: (window.innerWidth - width) / 2 + (this.hexWidth/2), y: window.innerHeight - ((window.innerHeight - height) / 2) - hexHeight};
    var count = 0;
    for (var i = 0; i < this.size; i++) {
      var offset = Math.floor(i/2);
      for (j = -offset; j < 6 - offset; j++) {
        this.grid[count] = new Hexagon({x: i, y: j, z: -i-j}, this.hexWidth, this);
        count++;
      }
    }
  }

  function createHexShape() {
    this.center = {x: window.innerWidth/2, y: window.innerHeight/2};
    var count = 0;
    for (var i = -this.size; i <= this.size; i++) {
      var max = -(this.size - Math.abs(i));
      if (i > 0) {
        max = -max;
      }
      for (var j = -this.size; j <= this.size; j++) {
        if (i <= 0 && j >= max || i >= 0 && j <= max) {
          var x = i;
          var z = j;
          var y = -x-z;
          if (y == -0) {
            y = Math.abs(y);
          }
          this.grid[count] = new Hexagon({x: x, y: y, z: z}, this.hexWidth, this);
          count++;
        }
      }
    }
  }

  function getHex(x, y, z) {
    for (var hex in this.grid) {
      var currentHex = this.grid[hex];
      if (currentHex.x == x && currentHex.y == y && currentHex.z == z) {
        return currentHex;
      }
    }
  }

  function draw() {
    for (var i = 0; i < this.hexes.length; i++) {
      this.hexes[i].draw();
    }
  }

  function generateNeighbors() {
    for (var hex in this.grid) {
      this.grid[hex].findNeighbors(this, this.directions);
    }
  }

  function init() {
    createGrid.call(this);
    generateNeighbors.call(this);
  }

  return {
    getHex: getHex,
    createGrid: createGrid,
    init: init,
    draw: draw
  }
})();
