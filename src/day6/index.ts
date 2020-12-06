const parseInput = (
  input: string[]
): Array<{ form: string; count: number }> => {
  let currentForm = '';
  let currentCount = 0;
  return input
    .map((line, i) => {
      if (line) {
        currentForm = currentForm.concat(line);
        currentCount++;
        // When we reach the end of the input, anything we have collected becomes the final output.
        if (i === input.length - 1) {
          return { form: currentForm, count: currentCount };
        }
      } else {
        // This will clone the string and count so we can reset them on the next lines.
        const form = (' ' + currentForm).slice(1);
        const count = Number(currentCount);
        currentForm = '';
        currentCount = 0;
        return { form, count };
      }
    })
    .filter((p) => p) as Array<{ form: string; count: number }>;
};

const countResponses = (form: string) => {
  const answers: Record<string, number> = {};
  for (let c of form) {
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
