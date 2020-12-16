const parseInput = (input: string[]) => {
  const rulesSlice = input.slice(0, input.indexOf(''));
  const yourTicket = input[input.indexOf('your ticket:') + 1]
    .split(',')
    .map(Number);
  const nearbyTickets = input
    .slice(input.indexOf('nearby tickets:') + 1)
    .map((v) => v.split(',').map(Number));

  const rules: Record<string, number[]> = {};
  rulesSlice.forEach((rule) => {
    const split = rule.split(':');
    const key = split[0];
    const values = split[1].split(' or ').flatMap((range) => {
      const [s, e] = range.trim().split('-');
      return Array(parseInt(e) - parseInt(s) + 1)
        .fill(0)
        .map((_, i) => parseInt(s) + i);
    });

    rules[key] = values;
  });

  return {
    rules,
    yourTicket,
    nearbyTickets,
  };
};

const part1 = (input: string[]) => {
  const { nearbyTickets, rules } = parseInput(input);
  const invalidValues: number[] = [];
  const ruleValues = Object.values(rules).flat();

  nearbyTickets.forEach((ticket) => {
    ticket.forEach((value) => {
      if (!ruleValues.includes(value)) invalidValues.push(value);
    });
  });

  return invalidValues.reduce((acc, curr) => acc + curr, 0);
};

export const determineOrder = (input: string[]) => {
  const { nearbyTickets, rules } = parseInput(input);
  const ruleValues = Object.values(rules).flat();

  const validTickets = nearbyTickets
    .map((ticket) => {
      let valid = true;
      ticket.forEach((value) => {
        if (!ruleValues.includes(value)) valid = false;
      });

      return valid ? ticket : [];
    })
    .filter((a) => a.length);

  // Transpose rows and columns
  const columns: number[][] = [];
  for (let i = 0; i < validTickets[0].length; i++) {
    columns.push(validTickets.reduce((acc, curr) => acc.concat(curr[i]), []));
  }

  // Check every value for each column and verify that it fits to a rule.
  const possibilities: Record<string, number[]> = {};
  for (let i = 0; i < columns.length; i++) {
    Object.entries(rules).forEach(([rule, values]) => {
      if (columns[i].every((val) => values.includes(val))) {
        possibilities[rule]
          ? possibilities[rule].push(i)
          : (possibilities[rule] = [i]);
      }
    });
  }

  // Find which rules can be reduced to 1 possibility,
  // and if they only have one set that in the result object.
  const result: Record<string, number> = {};
  let done = false;

  while (!done) {
    Object.entries(possibilities).forEach(([rule, values]) => {
      if (values.length === 1) {
        result[rule] = values[0];
        return;
      }

      possibilities[rule] = values.filter(
        (v) => !Object.values(result).includes(v)
      );
    });

    // If all keys have been filled, we're done.
    if (Object.keys(result).length === columns.length) {
      done = true;
    }
  }

  return result;
};

const part2 = (input: string[]) => {
  const { yourTicket } = parseInput(input);
  const rules = determineOrder(input);

  return Object.entries(rules)
    .filter(([rule, _]) => rule.includes('departure'))
    .reduce((acc, [_, value]) => yourTicket[value] * acc, 1);
};

export default {
  part1,
  part2,
};
