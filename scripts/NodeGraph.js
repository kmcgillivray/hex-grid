/*
Class: HexGrid
Properties: rows (number), columns (number)
Description: Creates spaced hexagons in a grid with the given number of rows and columns
*/

function NodeGraph(rows, columns) {
  this.rows = rows;
  this.columns = columns;
  this.nodes = this.createGrid();
}

NodeGraph.prototype = (function() {

  function createGrid() {
    var nodes = [];
    nodes.push(new Node({x: 40, y: 40}, 20));
    nodes.push(new Node({x: 80, y: 80}, 20));
    return nodes;
    // var hexes = [];
    // for (var i = 0; i < this.rows; i++) {
    //   for (var j = 0; j < this.columns; j++) {
    //     var spacing = 0;
    //     if (j % 2 == 0) {
    //       var spacing = hexWidth / 2;
    //     }
    //     var hex = new Hexagon({c: j, r: i}, hexWidth, hexWidth * j, hexWidth * i - spacing);
    //     hexes.push(hex);
    //     console.log(hex.coordinates);
    //   }
    // }
    // return hexes;
  }

  function draw() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw();
    }
  }

  return {
    createGrid: createGrid,
    draw: draw
  }
})();
