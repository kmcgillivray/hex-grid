/*
Class: Hexagon
Properties: coordinates (object), width (number)
Description: Creates a hexagon with equilateral sides and based on the given width and calculates its X and Y position on the page based on an XYZ cube coordinate object.
*/

function Hexagon(coordinates, width, grid) {
  this.x = coordinates.x;
  this.y = coordinates.y;
  this.z = coordinates.z;
  this.q = this.x;
  this.r = this.z;
  this.grid = grid;
  this.points = [];
  this.neighbors = [];
  this.width = width || 40;
  this.color = "#30A7BF";
  this.init();
}

Hexagon.prototype = (function() {

  function draw() {
    ctx.strokeStyle = "#E7E7E7";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    if (this.selected) {
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function calculatePoints() {
    for (var i = 0; i < 6; i++) {
      var angleDeg = 60 * i;
      var angleRad = Math.PI / 180 * angleDeg;
      this.points.push(
        {
          x: this.xPosition + this.width * Math.cos(angleRad),
          y: this.yPosition + this.width * Math.sin(angleRad)
        }
      );
    }
  }

  function calculatePosition() {
    this.xPosition = this.grid.center.x + (this.width * 3/2 * this.q);
    this.yPosition = this.grid.center.y + (this.width * Math.sqrt(3) * (this.r + this.q/2));
  }

  function findNeighbors(grid, directions) {
    for (var i = 0; i < directions.length; i++) {
      var neighbor = grid.getHex(this.x + directions[i].x, this.y + directions[i].y, this.z + directions[i].z);
      if (neighbor != undefined) {
        this.neighbors.push(neighbor)
      }
    }
    console.log("It's a beautiful day in the neighborhood");
    console.log(this);
  }

  function init() {
    calculatePosition.call(this);
    calculatePoints.call(this);
  }

  return {
    init: init,
    findNeighbors: findNeighbors,
    draw: draw
  }
})();
