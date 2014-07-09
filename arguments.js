var sum = function(){
  var args = Array.prototype.slice.call(arguments);
  var total = 0;
  args.forEach(function(arg) {total += arg;});
  return total;
};
//console.log(sum(1, 2, 3, 4) === 10);
//console.log(sum(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind = function(context){
  var func = this;
  var boundArgs = Array.prototype.slice.call(arguments);
  return function(){
    var args = Array.prototype.slice.call(arguments);
    console.log(boundArgs.concat(args).slice(1));
    return func.apply(context, boundArgs.concat(args).slice(1));
  };
};

//var myObj = {};

//var myBoundFunction = sum.myBind(myObj, 1, 2);

//console.log(myBoundFunction(3));

var curriedSum = function(numArgs) {
  var numbers = [];
  var _curriedSum = function(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      var sum = 0;
      numbers.forEach(function(num) {
        sum += num;
      });
      return sum;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

// var sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1));

Function.prototype.curry = function(numArgs){
  var args = [];
  var func = this;
  var _curry = function(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return func.apply({}, args);
    } else {
      return _curry;
    }
  };
  return _curry;
};

var curriedSum = sum.curry(4);
console.log(curriedSum(5)(30)(20)(1));