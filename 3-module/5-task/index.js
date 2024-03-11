function getMinMax(str) {
  const result = str
    .split(' ')
    .filter((item) => !isNaN(item))
    .map((item) => item = Number(item));
  return {
    min: Math.min.apply(null, result),
    max: Math.max.apply(null, result),
  };
}
