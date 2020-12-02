type ParsedLine = {
  min: number;
  max: number;
  pattern: string;
  password: string;
};

const parseLine = (line: string): ParsedLine => {
  const parts = line.trim().split(' ');
  const min = Number(parts[0].split('-')[0]);
  const max = Number(parts[0].split('-')[1]);
  const pattern = parts[1].replace(':', '');
  const password = parts[2];

  return {
    min,
    max,
    pattern,
    password,
  };
};

const isPatternCompliant = ({
  password,
  pattern,
  min,
  max,
}: ParsedLine): boolean => {
  const regex = new RegExp(pattern, 'g');
  const count = (password.match(regex) || []).length;

  return count >= min && count <= max;
};

const countOccurrences = (arr: string[], val: string) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

const arePositionsComplient = ({
  password,
  pattern,
  min,
  max,
}: ParsedLine): boolean =>
  countOccurrences(
    [password.charAt(min - 1), password.charAt(max - 1)],
    pattern
  ) === 1;

export const part1 = (input: string[]) => () => {
  let count = 0;
  input.forEach((line) => {
    if (isPatternCompliant(parseLine(line))) {
      count++;
    }
  });

  return count;
};

export const part2 = (input: string[]) => () => {
  let count = 0;
  input.forEach((line) => {
    if (arePositionsComplient(parseLine(line))) {
      count++;
    }
  });

  return count;
};
