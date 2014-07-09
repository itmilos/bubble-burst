Function.prototype.inherits = function(SuperClass){
  function Surrogate () {};
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
}

function MovingObject() {};
MovingObject.prototype.move = function(){console.log("Hey I'm moving!");};

function Ship () {};
Ship.inherits(MovingObject);
Ship.prototype.sail = function(){console.log("Hey I'm sailing!");};

function Asteroid () {};
Asteroid.inherits(MovingObject);
Asteroid.prototype.float = function(){console.log("Hey I'm floating!");};

var ob = new MovingObject();
var ship = new Ship();
var asteroid = new Asteroid();