/*
Class: Unit
Properties: hex (object), color (string), radius (number, optional)
Description: Creates a unit at the given hex position with the given radius and fill color
*/

function Unit(hex, color, radius) {
  this.hex = hex;
  this.x = hex.midpoint.x;
  this.y = hex.midpoint.y;
  this.radius = radius || 15;
  this.color = color;
  this.selected = false;
}

Unit.prototype = (function() {

  function draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  function checkClick(x, y) {
    if (x > this.x - this.radius && x < this.x + this.radius && y > this.y - this.radius && y < this.y + this.radius) {
      return true;
    } else {
      return false;
    }
  }

  function move(hex) {
    var dx = (hex.midpoint.x - this.hex.midpoint.x) / (hex.width / 2);
    var dy = (hex.midpoint.y - this.hex.midpoint.y) / (hex.width / 2);
    if (this.x != hex.midpoint.x) {
      this.x += dx;
    }
    if (this.y != hex.midpoint.y) {
      this.y += dy;
    }
    if (this.y == hex.midpoint.y && this.x == hex.midpoint.x) {
      this.hex = hex;
    }
  }

  return {
    draw: draw,
    checkClick: checkClick,
    move: move
  }
})();

// function findTarget(currentIndex) {
//   var index = currentIndex;
//   var nextHex = getRandomInt(1, 6);
//   if (nextHex == 1) {
//     index -= 11;
//   } else if (nextHex == 2) {
//     index -= 10;
//   } else if (nextHex == 3) {
//     index -= 9;
//   } else if (nextHex == 4) {
//     index += 1;
//   } else if (nextHex == 5) {
//     index += 10;
//   } else if (nextHex == 6) {
//     index -= 1;
//   }
//   return index;
// }
//
// var currentIndex = 88;
// var targetIndex = findTarget(currentIndex);

// var currentHex = hexes[currentIndex];
// var target = hexes[targetIndex];
// var dx = (target.midpoint.x - currentHex.midpoint.x) / 60;
// var dy = (target.midpoint.y - currentHex.midpoint.y) / 60;
// if (y != target.midpoint.y) {
//   y += dy;
// }
// if (x != target.midpoint.x) {
//   x += dx;
// }
// if (y == target.midpoint.y && x == target.midpoint.x) {
//   currentIndex = targetIndex;
//   targetIndex = findTarget(currentIndex);
// }
