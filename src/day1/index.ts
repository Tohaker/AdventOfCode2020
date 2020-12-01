// Had some help improving this one:
// https://stackoverflow.com/questions/37075180/combinations-of-size-n-from-an-array

const permute = (
  input: number[],
  degree: number,
  start: number[][] = [],
  total: number[] = []
) =>
  input.reduce((prev, current, index, input) => {
    degree > 1
      ? permute(
          input.slice(0, index).concat(input.slice(index + 1)),
          degree - 1,
          prev,
          (total.push(current), total)
        )
      : prev.push((total.push(current), total).slice(0));
    total.pop();
    return prev;
  }, start);

const calculateResult = (input: string[], degrees: number) => {
  const desiredResult = 2020;
  let actualResult = 0;

  const permutations = permute(input.map(Number), degrees);
  permutations.forEach((p) => {
    if (p.reduce((a, b) => a + b, 0) === desiredResult) {
      actualResult = p.reduce((a, b) => a * b, 1);
    }
  });

  return actualResult;
};

export const part1 = (input: string[]) => () => calculateResult(input, 2);

export const part2 = (input: string[]) => () => calculateResult(input, 3);
