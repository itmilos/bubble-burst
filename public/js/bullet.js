(function(root){
  var Bullets = root.Bullets = (root.Bullets || {});

  var Bullet = Bullets.Bullet = function(x, y, vx, vy){
    MovingObjects.MovingObject.call(this, x, y, vx, vy, Bullet.RADIUS, Bullet.COLOR);
    this.game = game;
  };
  
  Bullet.inherits(MovingObjects.MovingObject);
  
  Bullet.BULLETSPEED = 15;
  Bullet.RADIUS = 2;
  Bullet.COLOR = "red";

  Bullet.prototype.move = function() {
    this.x = (this.x + this.vx);
    this.y = (this.y + this.vy);
  };
      
})(this);
