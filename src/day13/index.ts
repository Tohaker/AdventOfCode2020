const parseInput = (input: string[]) => ({
  earliest: parseInt(input[0]),
  buses: input[1].split(','),
});

const getDepartureAfter = (time: number, bus: number) => {
  let departureTime = 0;

  while (departureTime <= time) {
    departureTime += bus;
  }

  return departureTime;
};

const part1 = (input: string[]) => {
  const { earliest, buses } = parseInput(input);
  const validBuses = buses.filter((b) => b !== 'x').map((b) => parseInt(b));

  const schedule: Record<number, number> = {};
  validBuses.forEach((bus) => {
    schedule[bus] = getDepartureAfter(earliest, bus);
  });

  let difference = -1;
  let earliestBus = '';

  for (const [bus, time] of Object.entries(schedule)) {
    const diff = time - earliest;
    if (difference < 0 || diff < difference) {
      difference = diff;
      earliestBus = bus;
    }
  }

  return parseInt(earliestBus) * difference;
};

const part2 = (input: string[]) => {
  const { buses } = parseInput(input);
  const validBuses = buses.filter((b) => b !== 'x').map((b) => parseInt(b));
  const timeDiffs: Record<string, number> = {};

  buses.forEach((t, i) => {
    if (t !== 'x') timeDiffs[t] = i;
  });

  let increment = validBuses[0];
  let i = increment;
  let nextBusIndex = 1;

  while (true) {
    // We'll have a valid run if the bus IDs are all perfect multiples of the time they arrive at (since they're all prime numbers)
    const isValid = Object.entries(timeDiffs).every(
      ([bus, diff]) => (i + diff) % parseInt(bus) === 0
    );

    if (isValid) return i;

    const nextBus = validBuses[nextBusIndex];

    // When we get the next bus matching the time interval, we multiply our increment by that and check with the next bus until we have checked all buses.
    if ((i + timeDiffs[nextBus]) % nextBus === 0) {
      increment *= nextBus;
      nextBusIndex++;
    }

    i += increment;
  }
};

export default {
  part1,
  part2,
};
