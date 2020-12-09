import { permute } from '../common';

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

const part1 = (input: string[]) => calculateResult(input, 2);

const part2 = (input: string[]) => calculateResult(input, 3);

export default { part1, part2 };
