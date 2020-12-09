import { splitEntriesByBlankLine } from '../common';

const parseInput = (input: string[]): Array<{ form: string; count: number }> =>
  splitEntriesByBlankLine(input).map((line) => {
    const count = line.split(' ').length;
    return { form: line.replace(/\s+/g, ''), count };
  });

const countResponses = (form: string) => {
  const answers: Record<string, number> = {};
  for (const c of form) {
    answers[c] ? answers[c]++ : (answers[c] = 1);
  }

  return answers;
};

const countUniqueResponses = (form: string) =>
  Object.keys(countResponses(form)).length;

const countIdenticalResponses = (form: string, count: number) =>
  Object.values(countResponses(form)).filter((c) => c === count).length;

const part1 = (input: string[]) =>
  parseInput(input).reduce(
    (count, { form }) => count + countUniqueResponses(form),
    0
  );

const part2 = (input: string[]) =>
  parseInput(input).reduce(
    (count, current) =>
      count + countIdenticalResponses(current.form, current.count),
    0
  );

export default {
  part1,
  part2,
};
