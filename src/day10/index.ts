const createFullSortedChain = (input: string[]) => {
  const sortedInput = input.map(Number).sort((a, b) => a - b);
  const chargingOutlet = 0;
  const builtInJoltage = sortedInput[sortedInput.length - 1] + 3;
  return [chargingOutlet, ...sortedInput, builtInJoltage];
};

const part1 = (input: string[]) => {
  const sortedInput = createFullSortedChain(input);
  const result: Record<number, number> = {};

  sortedInput.forEach((v, i) => {
    const nextValue = sortedInput[i + 1];
    if (!nextValue) return;

    const difference = nextValue - v;
    result[difference] ? result[difference]++ : (result[difference] = 1);
  });

  return result[1] * result[3];
};

const part2 = (input: string[]) => {
  const sortedInput = createFullSortedChain(input);

  // Solution from https://github.com/constb/aoc2020/blob/main/10/index2.js
  // I'm not smart enough to figure this out myself :(

  // Find the length of all contiguous blocks - i.e. all blocks separated by 1.
  // These are the blocks that cannot be changed or the whole sequence fails.
  const contiguous = [];
  for (let i = 0; i < sortedInput.length - 1; i++) {
    if (sortedInput[i + 1] - sortedInput[i] === 1) {
      const start = i;
      while (sortedInput[i + 1] - sortedInput[i] === 1) {
        i++;
      }
      contiguous.push(i - start + 1);
    }
  }

  // In each contiguous block, create a fibonacci-like sequence to get the possible variant lengths,
  // and multiply together.
  return contiguous
    .map((v) =>
      Array.from({ length: v - 1 }).reduce((acc: number, _, i) => acc + i, 1)
    )
    .reduce((a, v) => a * v, 1);
};

export default {
  part1,
  part2,
};
