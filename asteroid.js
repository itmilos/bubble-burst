(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Asteroid = Asteroids.Asteroid = function(x, y, vx, vy, radius, color){
    MovingObjects.MovingObject.call(this, x, y, vx, vy, radius, color);
  };
  
  Asteroid.inherits(MovingObjects.MovingObject);
  Asteroid.COLOR = '#000000';
  Asteroid.RADIUS = 10;
  Asteroid.MAXV = 5;
  
  var randomColor = function() {
    var colorHex = "#";
  
    for (var i = 0; i < 6; i++) {
      var randomNum = parseInt(Math.random() * 15);
    
      if (randomNum === 10) {
        randomNum = "a";
      } else if (randomNum === 11) {
        randomNum = "b";
      } else if (randomNum === 12) {
        randomNum = "c";
      } else if (randomNum === 13) {
        randomNum = "d";
      } else if (randomNum === 14) {
        randomNum = "e";
      } else if (randomNum === 15) {
        randomNum = "f";
      } else {
        randomNum = randomNum.toString();
      }
    
      colorHex = colorHex + randomNum;
    }
  
    return colorHex;
  }
  
  Asteroid.randomAsteroid = function(dimX, dimY){
    var x = dimX * Math.random();
    var y = dimY * Math.random();
    
    var upOrDown = parseInt(Math.random());
    
    if (upOrDown === 0) {
      var vx = (this.MAXV * Math.random()) - 1;
      var vy = (this.MAXV * Math.random()) - 1;
    } else {
      var vx = (this.MAXV * Math.random()) + 1;
      var vy = (this.MAXV * Math.random()) + 1;
    }
    
    var color = randomColor();
    
    return new Asteroid(x, y, vx, vy, this.RADIUS, color);
  }

})(this);
