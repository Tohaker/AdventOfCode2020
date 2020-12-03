type Angle = {
  down: number;
  right: number;
};

const calculateTrees = (map: string[], angle: Angle) => {
  const sectionWidth = map[0].length;
  const maxWidth = Math.ceil((angle.right * map.length) / sectionWidth);

  const completeMap = map.map((line) => line.repeat(maxWidth));

  return completeMap.reduce((previous, current, i) => {
    if (i % angle.down !== 0) return previous;
    if (current.charAt((i / angle.down) * angle.right) === '#')
      return previous + 1;
    return previous;
  }, 0);
};

const part1 = (input: string[]) => {
  const angle = {
    down: 1,
    right: 3,
  };

  return calculateTrees(input, angle);
};

const part2 = (input: string[]) =>
  [
    { down: 1, right: 1 },
    { down: 1, right: 3 },
    { down: 1, right: 5 },
    { down: 1, right: 7 },
    { down: 2, right: 1 },
  ].reduce((previous, current) => previous * calculateTrees(input, current), 1);

export default {
  part1,
  part2,
};
