/*
Class: Hexagon
Properties: width (number), x (number), y (number)
Description: Creates a hexagon with equilateral sides and with the given width at the given x and y position on the canvas
*/

function Hexagon(coordinates, width) {
  this.x = coordinates.x;
  this.y = coordinates.y;
  this.z = coordinates.z;
  this.q = this.x;
  this.r = this.z;
  this.points = [];
  this.neighbors = [];
  this.width = width || 40;
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
      ctx.fillStyle = "#E7E7E7";
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
    this.xPosition = (window.innerWidth/2) + (this.width * 3/2 * this.q);
    this.yPosition = (window.innerHeight/2) + (this.width * Math.sqrt(3) * (this.r + this.q/2));
  }

  function findNeighbors(directions) {
    // console.log(directions);
    // console.log("It's a beautiful day in the neighborhood");
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
