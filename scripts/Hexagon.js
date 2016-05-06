/*
Class: Hexagon
Properties: width (number), x (number), y (number)
Description: Creates a hexagon with equilateral sides and with the given width at the given x and y position on the canvas
*/

function Hexagon(coordinates, width, x, y) {
  this.coordinates = coordinates;
  this.regularRatio = 2/Math.sqrt(3)
  this.width = width;
  this.height = width / this.regularRatio;
  this.x = x;
  this.y = y;
  this.values = hexagonCalc(this.width, this.height);
  this.points = [];
  this.midpoint = {x: Math.floor(this.x + (this.values.z/2)), y: Math.floor(this.y + this.values.y) }
  this.neighbors = [];
  this.selected = false;
  this.init();
}

Hexagon.prototype = (function() {

  function calculatePoints() {
    this.points.push({x: this.x, y: this.y});
    this.points.push({x: this.x + this.values.z, y: this.y});
    this.points.push({x: this.x + this.values.z + this.values.x, y: this.y + this.values.y});
    this.points.push({x: this.x + this.values.z, y: this.y + this.values.y + this.values.y});
    this.points.push({x: this.x, y: this.y + this.values.y + this.values.y });
    this.points.push({x: this.x - this.values.x, y: this.y + this.values.y});
  }

  function calculateNeighbors() {
    if (this.coordinates.c > 0) {
      this.neighbors = [[-1, 0], [0, -1], [1, 0], [1, -1], [0, 1], [-1, -1]];
    }
    //if (this.coordinates.r )
    //  [-1, -1], [0, -1], [1, -1]
  }

  function draw() {
    ctx.strokeStyle = "#E7E7E7";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    if (this.selected) {
      ctx.fillStyle = "#E7E7E7";
      ctx.fill();
    }
  }

  function init() {
    calculatePoints.call(this);
    calculateNeighbors.call(this);
  }

  return {
    init: init,
    draw: draw
  }
})();
