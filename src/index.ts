import { part1 as day1part1, part2 as day1part2 } from './day1';
import { part1 as day2part1, part2 as day2part2 } from './day2';
import day1 from './inputs/day1.json';
import day2 from './inputs/day2.json';

const challenges = [
  [day1part1(day1), day1part2(day1)],
  [day2part1(day2), day2part2(day2)],
];
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
