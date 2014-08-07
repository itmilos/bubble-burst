(function(root){
  var Ships = root.Ships = (root.Ships || {});

  var Ship = Ships.Ship = function(){
    MovingObjects.MovingObject.call(this, Games.Game.DIM_X / 2,
      Games.Game.DIM_Y /2, 0, 0, Ship.RADIUS, Ship.COLOR);
  };
  
  Ship.inherits(MovingObjects.MovingObject);
  
  Ship.RADIUS = 5;
  Ship.COLOR = "blue";
  
  Ship.prototype.friction = function(value) {
    if (Math.abs(this.vx) > .005) {
      if (this.vx > 0) {
        this.power(-value, 0);
      } else if (this.vx < 0) {
        this.power(value, 0);
      }
    }
    
    if (Math.abs(this.vy) > .005) {
      if (this.vy > 0) {
        this.power(-value, 0);
      } else if (this.vy < 0) {
        this.power(value, 0);
      }
    }
  }
  
  Ship.prototype.power = function(ix, iy){
    this.vx += ix;
    this.vy += iy;
  }
  
  Ship.prototype.fireBullet = function(){
    var speed = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2));
    var normvx = this.vx / speed;
    var normvy = this.vy / speed;
    if (speed > .005) {
      var bullet = new Bullets.Bullet(this.x, this.y, normvx * Bullets.Bullet.BULLETSPEED, 
        normvy * Bullets.Bullet.BULLETSPEED);
      return bullet;
    }
    return null;
  }
    
})(this);
