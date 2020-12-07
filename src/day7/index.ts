type BagContents = { colour: string; count: number }[];

const ownBagColour = 'shiny gold';

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

const countBagsWithColour = (
  colour: string,
  globalInput: Record<string, BagContents>,
  listOfBags: string[],
  total: number
): number =>
  listOfBags.reduce((runningTotal, bagColour) => {
    // If the colour we're looking for is inside the bag we're currently
    // on, we just up the count found in this run. Otherwise, we keep
    // going deeper into the bags and retain that total.
    return globalInput[bagColour].some((contents) => contents.colour === colour)
      ? runningTotal + 1
      : countBagsWithColour(
          colour,
          globalInput,
          globalInput[bagColour].map(({ colour }) => colour),
          runningTotal
        );
  }, total);

const countContainedBags = (
  colour: string,
  globalInput: Record<string, BagContents>,
  total: number
): number =>
  // We need to count the contained bags, including the one that's currently being counted.
  globalInput[colour].reduce(
    (runningTotal, contents) =>
      runningTotal +
      contents.count * countContainedBags(contents.colour, globalInput, 1),
    total
  );

const part1 = (input: string[]) => {
  const globalInput = parseInput(input);
  const listOfBags = Object.keys(globalInput);

  // Loop through the top level of the global input, which
  // can only contain unique values. We look in each top
  // level bag to see if that contains our bag, otherwise
  // invoke the recursion.
  return (
    listOfBags
      .map((colour) =>
        globalInput[colour].some((contents) => contents.colour === ownBagColour)
          ? 1
          : countBagsWithColour(
              ownBagColour,
              globalInput,
              globalInput[colour].map(({ colour }) => colour),
              0
            )
      )
      // We just need to know how many values above 0 there are.
      .filter((v) => v).length
  );
};

const part2 = (input: string[]) => {
  const globalInput = parseInput(input);

  // We simply need to start counting the number of bags contained within
  // our own bag. The recursion will handle the rest, but need to start
  // with the bag itself first (the '1' as a starting value).
  return globalInput[ownBagColour].reduce(
    (count, contents) =>
      count +
      contents.count * countContainedBags(contents.colour, globalInput, 1),
    0
  );
};

export default {
  part1,
  part2,
};
