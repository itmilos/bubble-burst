(function(root){
  var MovingObjects = root.MovingObjects = (root.MovingObjects || {});

  var MovingObject = MovingObjects.MovingObject = 
    function(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.move = function() {
    if (this.x + this.radius < 0) {
      this.x = Games.Game.DIM_X;
    }
    if (this.y + this.radius < 0) {
      this.y = Games.Game.DIM_Y;
    }
    this.x = (this.x + this.vx) % Games.Game.DIM_X;
    this.y = (this.y + this.vy) % Games.Game.DIM_Y;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
  
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI,
      false
    );
  
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var d = Math.sqrt(Math.pow((this.x - otherObject.x), 2) + Math.pow((this.y - otherObject.y), 2));
    if (d < (this.radius + otherObject.radius)){
      return true;
    } else {
      return false;
    }
  };
})(this);
