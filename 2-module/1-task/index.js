function sumSalary(salaries) {
  const sortedValues = Object.values(salaries).filter((item) => typeof item === 'number' && isFinite(item));
  if (sortedValues.length === 0) {
    return 0;
  } else {
    return sortedValues.reduce((acc, number) => acc + number);
  }
}
