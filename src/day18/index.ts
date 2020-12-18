const convertToJSON = (exp: string) => {
  const json = (
    '[' +
    exp
      .replace(/\(/g, '[')
      .replace(/\)\s/g, '], ')
      .replace(/\)/g, ']')
      .replace(/\s+/, ', ') +
    ']'
  )
    .replace(/[^\[\]\,\s]+/g, '"$&"')
    .replace(/" /g, '", ');

  return JSON.parse(json);
};

const evaluateExpression = (exp: any[]) => {
  let total = 0;
  let current = 0;
  let operator = '';

  exp.forEach((value, i) => {
    if (Array.isArray(value)) {
      // Recurse through each array
      current = evaluateExpression(value);
    } else {
      if (value === '+' || value === '*') {
        operator = value;
        return;
      } else {
        current = parseInt(value);
      }
    }

    // Add the first value to the total, otherwise perform the maths.
    if (i === 0) {
      total += current;
    } else {
      switch (operator) {
        case '+':
          total += current;
          break;
        case '*':
          total *= current;
          break;
        default:
          break;
      }
    }
  });

  return total;
};

const evaluateAdvancedExpression = (exp: string) => {
  if (!isNaN(Number(exp))) {
    Number(exp);
  }

  // Deep dive into the brackets to solve those first.
  while (exp.match(/\(/)) {
    exp = exp.replace(/\([^()]+\)/, (match) =>
      evaluateAdvancedExpression(match.slice(1, match.length - 1))
    );
  }

  // Addition is next priority, handle all these next.
  while (exp.match(/\+/)) {
    exp = exp.replace(/(\d+) \+ (\d+)/, (_, a, b) =>
      (parseInt(a) + parseInt(b)).toString()
    );
  }

  // Finally perform the multiplication.
  while (exp.match(/\*/)) {
    exp = exp.replace(/(\d+) \* (\d+)/, (_, a, b) =>
      (parseInt(a) * parseInt(b)).toString()
    );
  }

  return exp;
};

const part1 = (input: string[]) =>
  input.reduce((acc, curr) => acc + evaluateExpression(convertToJSON(curr)), 0);

const part2 = (input: string[]) =>
  input.reduce(
    (acc, curr) => acc + parseInt(evaluateAdvancedExpression(curr)),
    0
  );

export default {
  part1,
  part2,
};
