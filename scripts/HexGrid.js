/*
Class: HexGrid
Properties: rows (number), columns (number)
Description: Creates spaced hexagons in a grid with the given number of rows and columns
*/

function HexGrid(size) {
  this.size = size;
  this.grid = {};
  this.directions = [
     {x:+1, y:-1, z: 0}, {x:+1, y: 0, z:-1}, {x: 0, y:+1, z:-1},
     {x:-1, y:+1, z: 0}, {x:-1, y: 0, z:+1}, {x: 0, y:-1, z:+1}
  ];
  this.init();
}

HexGrid.prototype = (function() {

  function createGrid() {
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
          this.grid[count] = new Hexagon({x: x, y: y, z: z}, hexWidth);
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
    // for (var i = 0; i < this.hexes.length; i++) {
    //   if (this.hexes[i].coordinates.c == c && this.hexes[i].coordinates.r == r) {
    //     console.log(this.hexes[i]);
    //     return this.hexes[i];
    //   }
    // }
  }

  function draw() {
    for (var i = 0; i < this.hexes.length; i++) {
      this.hexes[i].draw();
    }
  }

  function init() {
    createGrid.call(this);
    for (var hex in this.grid) {
      this.grid[hex].findNeighbors(this, this.directions);
    }
  }

  return {
    getHex: getHex,
    init: init,
    draw: draw
  }
})();
