const rows = 127;
const cols = 7;

type Seat = {
  row: number;
  col: number;
};

export const binarySearch = (pass: string): Seat => {
  const row = { lower: 0, upper: rows };
  const col = { lower: 0, upper: cols };

  for (let i = 0; i < pass.length; i++) {
    switch (pass.charAt(i)) {
      case 'F':
        row.upper -= Math.ceil((row.upper - row.lower) / 2);
        break;
      case 'B':
        row.lower += Math.ceil((row.upper - row.lower) / 2);
        break;
      case 'L':
        col.upper -= Math.ceil((col.upper - col.lower) / 2);
        break;
      case 'R':
        col.lower += Math.ceil((col.upper - col.lower) / 2);
        break;
      default:
        break;
    }
  }

  // Doesn't actually matter which one we take, as they'll be identical.
  return {
    row: row.upper,
    col: col.upper,
  };
};

const getID = (seat: Seat) => seat.row * 8 + seat.col;

const part1 = (input: string[]) =>
  input.reduce((prev, current) => {
    const id = getID(binarySearch(current));
    if (id > prev) return id;
    return prev;
  }, 0);

const part2 = (input: string[]) =>
  input
    .map((pass) => getID(binarySearch(pass)))
    .sort((a, b) => a - b)
    .reduce((prev, current, i, array) => {
      if (i !== array.length - 1 && array[i + 1] !== current + 1) {
        return current + 1;
      }
      return prev;
    }, 0);

export default {
  part1,
  part2,
};
