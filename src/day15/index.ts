const parseInput = (input: string[]) => input.map(Number);

const findXthNumber = (starter: number[], x: number) => {
  const memory = new Map();
  let next = 0;

  for (let turn = 1; turn < x; turn++) {
    const current = turn <= starter.length ? starter[turn - 1] : next;
    next = memory.has(current) ? turn - memory.get(current) : 0;
    memory.set(current, turn);
  }
  return next;
};

const part1 = (input: string[]) => findXthNumber(parseInput(input), 2020);

const part2 = (input: string[]) => findXthNumber(parseInput(input), 30000000);

export default {
  part1,
  part2,
};
