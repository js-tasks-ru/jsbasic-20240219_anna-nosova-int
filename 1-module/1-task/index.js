function factorial(n) {
  let result = 1;
  if (n === 0) {
    return result;
  } else {
    for (let i = n; i >= 1; i--) {
      result = result * i;
    }
    return result;
  }
}
