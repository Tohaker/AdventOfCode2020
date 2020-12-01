import { part1, part2 } from './day1';
import day1 from './inputs/day1.json';

const challenges = [[part1(day1), part2(day1)]];
const cliArgs = process.argv.slice(2);

if (cliArgs.length) {
  const dayArg = parseInt(cliArgs[0]);
  if (dayArg > 0)
    challenges[dayArg - 1].forEach((callback, i) => {
      console.log(`Day ${dayArg} - Part ${i + 1}: ${callback()}`);
    });
} else {
  challenges.forEach((day, i) => {
    day.forEach((callback, j) =>
      console.log(`Day ${i + 1} - Part ${j + 1}: ${callback()}`)
    );
  });
}
