type Instruction = {
  operation: string;
  argument: number;
};

const parseInstruction = (i: string): Instruction => {
  const [operation, arg] = i.trim().split(' ');
  return {
    operation,
    argument: parseInt(arg),
  };
};

const carryOutInstruction = (
  { operation, argument }: Instruction,
  lineNo: number,
  accumulator: number
) => {
  switch (operation) {
    case 'acc':
      return { lineNo: lineNo + 1, accumulator: accumulator + argument };
    case 'jmp':
      return { lineNo: lineNo + argument, accumulator };
    case 'nop':
    default:
      return { lineNo: lineNo + 1, accumulator };
  }
};

const runBootCode = (input: string[], changeIndex?: number, fix?: boolean) => {
  let lineNo = 0;
  let accumulator = 0;
  let nopJmpCount = 0;
  const runCounts = Array(input.length).fill(0);

  while (!runCounts.includes(2)) {
    const instruction = parseInstruction(input[lineNo]);

    if (fix) {
      if (instruction.operation === 'nop' || instruction.operation === 'jmp') {
        if (nopJmpCount === changeIndex) {
          instruction.operation === 'nop'
            ? (instruction.operation = 'jmp')
            : (instruction.operation = 'nop');
        }

        nopJmpCount++;
      }
    }

    ({ lineNo, accumulator } = carryOutInstruction(
      instruction,
      lineNo,
      accumulator
    ));

    // When the next instruction is not within the list of instructions,
    // we know we've hit the end of the program without looping.
    if (lineNo >= input.length) {
      return { success: true, accumulator };
    }

    runCounts[lineNo]++;
  }

  return { success: false, accumulator };
};

const part1 = (input: string[]) => runBootCode(input).accumulator;

const part2 = (input: string[]) => {
  let changeIndex = 0;
  let { success, accumulator } = runBootCode(input, changeIndex, true);

  while (!success) {
    changeIndex++;
    ({ success, accumulator } = runBootCode(input, changeIndex, true));
  }

  return accumulator;
};

export default {
  part1,
  part2,
};
