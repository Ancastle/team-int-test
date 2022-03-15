function sum(x) {
  if (typeof x === "number") {
    function sum1(y) {
      if (typeof y === "number") {
        x = x + y;
        return sum1;
      } else {
        return y(x);
      }
    }
    return sum1;
  } else {
    return x(0);
  }
}

module.exports = sum;
