type Rules = Record<number, number[][] | string>;

const parseInput = (input: string[]) => {
  const separator = input.findIndex((v) => v === '');
  const rulesSlice = input.slice(0, separator);
  const messages = input.slice(separator + 1);

  const rules: Rules = {};
  rulesSlice.forEach((line) => {
    const parts = line.split(': ');
    const key = parseInt(parts[0]);
    const value = parts[1].trim();

    if (isNaN(Number(value[0]))) {
      rules[key] = value.replace(/\"/g, '').trim();
    } else {
      const subrules = value.split('|');
      rules[key] = subrules.reduce((arr: number[][], curr) => {
        arr.push(
          curr
            .split(' ')
            .filter(Boolean)
            .map((v) => Number(v))
        );
        return arr;
      }, []);
    }
  });

  return {
    rules,
    messages,
  };
};

// Got stuck here, used the solution from https://gist.github.com/p-a/a2a59736d358ae4b7f8bba23043157a2
const checkIfValid = (
  message: string,
  rules: Rules,
  [rule, ...rest]: number[]
): boolean => {
  // Checks if the rules are exhausted, and returns true if the message has been depleted
  if (!rule) return !message;

  // Get the next rule in the list.
  const nextRule = rules[rule];

  // If the rule is an array, we have to keep recursing down the list of rules in that chain, including the next rules to follow.
  // Otherwise, we check if the first character of the message matches the rule (which could be 'a' or 'b') and then check if the rest of the message matches the rest of the rules in sequence. As we reduce the substring by 1 char each time, we can hit the case on line 42.
  return Array.isArray(nextRule)
    ? nextRule.some((r) => checkIfValid(message, rules, r.concat(rest)))
    : message[0] === nextRule &&
        checkIfValid(message.substring(1), rules, rest);
};

const part1 = (input: string[]) => {
  const { rules, messages } = parseInput(input);
  return messages
    .map((m) => (rules[0] as number[][]).some((r) => checkIfValid(m, rules, r)))
    .filter(Boolean).length;
};

const part2 = (input: string[]) => {
  const newInput = input.map((l) =>
    l
      .replace('8: 42', '8: 42 | 42 8')
      .replace('11: 42 31', '11: 42 31 | 42 11 31')
  );
  const { rules, messages } = parseInput(newInput);
  return messages
    .map((m) => (rules[0] as number[][]).some((r) => checkIfValid(m, rules, r)))
    .filter(Boolean).length;
};

export default {
  part1,
  part2,
};
