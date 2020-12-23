const rotateAnticlockwise = (array: number[], toMove: number) =>
  array.slice(toMove).concat(array.slice(0, toMove));

const completeMove = (cups: number[]) => {
  const current = cups[0];
  const pickedUp = cups.splice(1, 3);

  const sorted = [...cups].sort((a, b) => b - a);
  const destination = rotateAnticlockwise(sorted, sorted.indexOf(current))[1];

  // Splice in the picked up cups, then rotate one so the next current cup is always at the front.
  return rotateAnticlockwise(
    [
      ...cups.slice(0, cups.indexOf(destination) + 1),
      ...pickedUp,
      ...cups.slice(cups.indexOf(destination) + 1),
    ],
    1
  );
};

const part1 = (input: string[]) => {
  let cups = Array.from(input[0]).map(Number);

  for (let i = 0; i < 100; i++) {
    cups = completeMove(cups);
  }

  return rotateAnticlockwise(cups, cups.indexOf(1))
    .slice(1)
    .reduce((a, c) => a + c, '');
};

const part2 = (input: string[]) => {
  const MAX_CUPS = 1000000;
  const cups = Array.from(input[0]).map((cup) => Number(cup) - 1);

  // Create a linked list, so we can quickly find the index of the next and previous cup.
  const nextCup = new Array(MAX_CUPS).fill(0).map((_, i) => i + 1);
  const prevCup = new Array(MAX_CUPS).fill(0).map((_, i) => i - 1);

  // Make the list circular.
  nextCup[MAX_CUPS - 1] = 0;
  prevCup[0] = MAX_CUPS - 1;

  let current = MAX_CUPS - 1;

  // Initialise the list for our starting, non sequential list.
  for (const cup of cups) {
    nextCup[prevCup[cup]] = nextCup[cup];
    prevCup[nextCup[cup]] = prevCup[cup];
    nextCup[cup] = nextCup[current];
    prevCup[cup] = current;
    prevCup[nextCup[current]] = cup;
    nextCup[current] = cup;
    current = cup;
  }

  current = MAX_CUPS - 1;

  for (let i = 0; i < 10000000; i++) {
    current = nextCup[current];

    // Find the next three cups to pick.
    const picked1 = nextCup[current];
    const picked2 = nextCup[picked1];
    const picked3 = nextCup[picked2];

    // The new current cup is the next one along.
    nextCup[current] = nextCup[picked3];

    // Find the destination by trying each 1 lower until we loop around or find a non-picked one.
    let destination = current - 1 < 0 ? MAX_CUPS - 1 : current - 1;
    while (
      destination === picked1 ||
      destination === picked2 ||
      destination === picked3
    ) {
      destination = destination === 0 ? MAX_CUPS - 1 : destination - 1;
    }

    // The next item after the last picked goes to the one after the destination.
    nextCup[picked3] = nextCup[destination];

    // The next item after the destination is the first picked item (which then links around as expected)
    nextCup[destination] = picked1;
  }

  return (nextCup[0] + 1) * (nextCup[nextCup[0]] + 1);
};

export default {
  part1,
  part2,
};
