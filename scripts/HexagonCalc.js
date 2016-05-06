// The quadratic equation necessary to calculate the side length of a hexagon based on its width

function hexagonCalc(width, height) {
  var values = {};

  var a = -3;
  var b = -2 * height;
  var c = (Math.pow(width, 2)) + (Math.pow(height, 2));

  values.y = height/2;
  values.z = (-b - Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);
  values.x = (width - values.z)/2;

  return values;
}
