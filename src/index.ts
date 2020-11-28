import { part1 } from './day1';

const challenges = [[part1]];
const cliArgs = process.argv.slice(2);

if (cliArgs.length) {
  const dayArg = parseInt(cliArgs[0]);
  if (dayArg > 0) challenges[dayArg - 1].forEach((c) => c());
} else {
  challenges.forEach((day) => {
    day.forEach((callback) => callback());
  });
}
