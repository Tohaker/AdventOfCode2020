const transformStep = (value: number, subject: number) => {
  let newValue = value * subject;
  newValue = newValue % 20201227;
  return newValue;
};

const calculateLoopSize = (publicKey: number, subject: number) => {
  let value = 1;
  let loopSize = 0;

  while (value !== publicKey) {
    value = transformStep(value, subject);
    loopSize++;
  }

  return loopSize;
};

const transformSubjectNumber = (loopSize: number, subject: number) => {
  let value = 1;

  for (let i = 0; i < loopSize; i++) {
    value = transformStep(value, subject);
  }

  return value;
};

const part1 = (input: string[]) => {
  const loopSizes = input
    .map(Number)
    .map((publicKey) => calculateLoopSize(publicKey, 7));

  const ek0 = transformSubjectNumber(loopSizes[1], parseInt(input[0]));
  const ek1 = transformSubjectNumber(loopSizes[0], parseInt(input[1]));

  if (ek0 === ek1) return ek0;
  else return 0;
};

const part2 = (input: string[]) => {
  console.log('There is no part 2 - go have fun!');
};

export default {
  part1,
  part2,
};
