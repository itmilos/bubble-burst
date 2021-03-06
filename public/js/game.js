(function(root){
  var Games = root.Games = (root.Games || {});
  
  var Game = Games.Game = function(canvas){
    this.ctx = canvas.getContext("2d");
    this.asteroids = [];
    this.ship = new Ships.Ship();
    this.bullets = [];
    this.score = 0;
  };
  
  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 30;
  
  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  }
  
  Game.prototype.draw = function() {
    var curGame = this;
    
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    //Asteroids
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(curGame.ctx);
    })
    
    //Ship
    this.ship.draw(curGame.ctx);
    
    //Bullets
    this.bullets.forEach(function(bullet) {
      bullet.draw(curGame.ctx);
    })
  }
  
  Game.prototype.move = function() {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    })
    
    this.ship.move();
    
    this.bullets.forEach(function(bullet) {
      bullet.move();
    })
    this.hitAsteroids();
    
    
  }
  
  Game.prototype.removeOffScreenBullets = function(){
    var curGame = this;
    this.bullets.forEach(function(bullet){
      if (curGame.offScreen(bullet)) {
        curGame.removeBullet(bullet);
      }
    })
  }

  Game.prototype.offScreen = function(obj){
    if ((obj.x + obj.radius) < 0) {
      return true;
    }
    if ((obj.x - obj.radius) > Game.DIM_X) {
      return true;
    }
    if ((obj.y + obj.radius) < 0) {
      return true;
    }
    if ((obj.y - obj.radius) < Game.DIM_Y) {
      return true;
    }
  }
  
  Game.prototype.step = function() {
    this.ship.friction(.02);
    this.checkKeys();
    this.move();
    this.draw();
    if (this.checkCollisions() === true) {
      alert('Game Over!');
      this.stop();
    }
    
    if (this.asteroids.length === 0) {
      alert('You Win!')
      this.stop();
    }
  }
  
  Game.prototype.start = function() {
    this.timer = setInterval(this.step.bind(this), Game.FPS);
  }
  
  Game.prototype.checkCollisions = function() {
    var curGame = this;
    var collided = false;
    this.asteroids.forEach(function(asteroid){
      if (curGame.ship.isCollidedWith(asteroid)) {
        collided = true;
      }
    })
    return collided;
  }
  
  Game.prototype.stop = function() {
    clearInterval(this.timer);
  }
  
  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fireBullet(); 
    if (bullet !== null) {
      this.bullets.push(bullet);
    }
  }
  
  Game.prototype.checkKeys= function(){
    var curGame = this;
    
    if (key.isPressed('up')) {
      curGame.ship.power(0, -.1);
    }
    
    if (key.isPressed('left')) {
      curGame.ship.power(-.1, 0);
    }
    
    if (key.isPressed('down')) {
      curGame.ship.power(0, .1);
    }
    
    if (key.isPressed('right')) {
      curGame.ship.power(.1, 0);
    }
    
    key('space', function() {
      curGame.fireBullet();
    });
  }
  
  Game.prototype.hitAsteroids = function(){
    var curGame = this;
    curGame.bullets.forEach(function(bullet){
      curGame.asteroids.forEach(function(asteroid){
        if(bullet.isCollidedWith(asteroid)){
          curGame.removeAsteroid(asteroid);
          curGame.removeBullet(bullet);
          curGame.score++;
          $(".score").html(curGame.score);
        }
      });
    });
  }
  
  Game.prototype.removeAsteroid = function(asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  }

  Game.prototype.removeBullet = function(bullet) {
    var index = this.bullets.indexOf(bullet);
    this.bullets.splice(index, 1);
  }

})(this);
