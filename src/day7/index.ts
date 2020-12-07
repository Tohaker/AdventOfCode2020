type BagContents = { colour: string; count: number }[];

const parseInput = (input: string[]) => {
  const output: Record<string, BagContents> = {};

  input.map((line) => {
    const [key, values] = line.trim().replace('.', '').split(' contain ');
    const innerBags = values
      .split(', ')
      .map((bag) => {
        if (/\d/.test(bag)) {
          const [count, col] = bag.trim().split(/(\d+)/).slice(1);

          return {
            colour: col.replace(/bag(s)?/, '').trim(),
            count: parseInt(count),
          };
        }
      })
      .filter((b) => b) as BagContents;
    output[key.replace(/bag(s)?/, '').trim()] = innerBags;
  });

  return output;
};

const findBagWithColour = (
  colour: string,
  globalInput: Record<string, BagContents>,
  listOfBags: string[],
  total: number
) => {
  let runningTotal = total;

  listOfBags.forEach((bagColour) => {
    if (globalInput[bagColour].some((contents) => contents.colour === colour)) {
      runningTotal++;
    } else {
      runningTotal = findBagWithColour(
        colour,
        globalInput,
        globalInput[bagColour].map(({ colour }) => colour),
        runningTotal
      );
    }
  });

  return runningTotal;
};

const part1 = (input: string[]) => {
  const globalInput = parseInput(input);
  const listOfBags = Object.keys(globalInput);
  const result: Record<string, number> = {};

  const ownBagColour = 'shiny gold';

  listOfBags.forEach((colour) => {
    result[colour] = globalInput[colour].some(
      (contents) => contents.colour === ownBagColour
    )
      ? 1
      : findBagWithColour(
          ownBagColour,
          globalInput,
          globalInput[colour].map(({ colour }) => colour),
          0
        );
  });

  return Object.values(result).filter((value) => value).length;
};

const countBags = (
  colour: string,
  globalInput: Record<string, BagContents>,
  total: number
) => {
  let runningTotal = total;

  globalInput[colour].forEach((contents) => {
    runningTotal += contents.count * countBags(contents.colour, globalInput, 1);
  });

  return runningTotal;
};

const part2 = (input: string[]) => {
  const globalInput = parseInput(input);

  return globalInput['shiny gold'].reduce(
    (count, contents) =>
      count +
      contents.count * countBags(contents.colour, globalInput, 0) +
      contents.count,
    0
  );
};

export default {
  part1,
  part2,
};
