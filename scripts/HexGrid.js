/*
Class: HexGrid
Properties: rows (number), columns (number)
Description: Creates spaced hexagons in a grid with the given number of rows and columns
*/

function HexGrid(rows, columns) {
  this.rows = rows;
  this.columns = columns;
  this.hexes = this.createGrid();
}

HexGrid.prototype = (function() {

  function createGrid() {
    var hexes = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        var spacing = 0;
        if (j % 2 == 0) {
          var spacing = hexWidth / 2;
        }
        var hex = new Hexagon({c: j, r: i}, hexWidth, hexWidth * j, hexWidth * i - spacing);
        hexes.push(hex);
        console.log(hex.coordinates);
      }
    }
    return hexes;
  }

  function getHex(c, r) {
    for (var i = 0; i < this.hexes.length; i++) {
      if (this.hexes[i].coordinates.c == c && this.hexes[i].coordinates.r == r) {
        console.log(this.hexes[i]);
        return this.hexes[i];
      }
    }
  }

  function draw() {
    for (var i = 0; i < this.hexes.length; i++) {
      this.hexes[i].draw();
    }
  }

  return {
    createGrid: createGrid,
    getHex: getHex,
    draw: draw
  }
})();
