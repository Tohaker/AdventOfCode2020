import { permute } from '../common';

const checkIfValid = (value: number, preamble: number[]) =>
  !permute(preamble, 2).every((p) => {
    if (p.reduce((a, b) => a + b, 0) === value) return false;
    return true;
  });

const parseInput = (input: string[]) => input.map((v) => parseInt(v));

const part1 = (input: string[], preambleLength = 25) => {
  const parsedInput = parseInput(input);
  for (let i = preambleLength; i < input.length - preambleLength; i++) {
    const value = parsedInput[i];
    const preamble = parsedInput.slice(i - preambleLength, i);
    if (!checkIfValid(value, preamble)) return value;
  }

  return 0;
};

const part2 = (input: string[], preambleLength = 25) => {
  const valueToFind = part1(input, preambleLength);
  const parsedInput = parseInput(input);
  let startingIndex = 0;
  let currentTotal = 0;

  while (startingIndex < parsedInput.length) {
    for (let i = startingIndex; i < parsedInput.length; i++) {
      currentTotal += parsedInput[i];

      // Start the addition further along, and reset the running count.
      if (currentTotal > valueToFind) {
        startingIndex++;
        currentTotal = 0;
        break;
      }

      // Grab the min and max value of the values counted.
      if (currentTotal === valueToFind) {
        const contiguousSet = parsedInput
          .slice(startingIndex, i)
          .sort((a, b) => a - b);
        return contiguousSet[0] + contiguousSet[contiguousSet.length - 1];
      }
    }
  }
};

export default { part1, part2 };
