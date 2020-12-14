type Instruction = {
  mask: string;
  address: number;
  decimal: number;
};

const parseInput = (input: string[]): Instruction[] => {
  let mask = '';
  const output: Instruction[] = [];

  input.forEach((l) => {
    if (l.includes('mask')) {
      mask = l.split('mask = ')[1];
    } else {
      const aStart = l.indexOf('[');
      const aEnd = l.indexOf(']');
      const address = parseInt(l.substring(aStart + 1, aEnd));
      const decimal = parseInt(l.split('= ')[1]);

      output.push({ mask, address, decimal });
    }
  });

  return output;
};

const toBinary = (num: number) => Number(num).toString(2);

const applyMask = ({ mask, decimal }: Instruction) => {
  const valueArr = Array.from(toBinary(decimal).padStart(36, '0'));
  const maskArr = Array.from(mask);

  return valueArr
    .map((c, i) => {
      const maskValue = maskArr[i];

      if (maskValue === 'X') return c;
      else return maskValue;
    })
    .reduce((acc, curr) => acc + curr, '');
};

const applyV2Mask = ({ address, mask, decimal }: Instruction) => {
  const addressArr = Array.from(toBinary(address).padStart(36, '0'));
  const maskArr = Array.from(mask);

  const resultAddressArr = addressArr.map((c, i) => {
    const maskValue = maskArr[i];

    if (maskValue === '0') return c;
    else return maskValue;
  });

  const floatingBits = resultAddressArr.filter((v) => v === 'X').length;
  const addressesToChange = Math.pow(2, floatingBits);

  const possibleBinaryAdditions = [];
  for (let i = 0; i < addressesToChange; i++) {
    const value = toBinary(i).padStart(floatingBits, '0');
    possibleBinaryAdditions.push(Array.from(value));
  }

  const memoryPermutations = possibleBinaryAdditions.map((addition) => {
    let count = 0;
    return parseInt(
      resultAddressArr
        .map((v) => {
          let res;
          if (v === 'X') {
            res = addition[count];
            count++;
          } else {
            res = v;
          }

          return res;
        })
        .reduce((acc, curr) => acc + curr, ''),
      2
    );
  });

  const newInstructions = memoryPermutations.map((address) => ({
    address,
    decimal,
    mask,
  }));

  return newInstructions;
};

const part1 = (input: string[]) => {
  const instructions = parseInput(input);
  const mem: Record<number, string> = {};

  instructions.forEach((instruction) => {
    mem[instruction.address] = applyMask(instruction);
  });

  return Object.values(mem)
    .map((v) => parseInt(v, 2))
    .filter(Boolean)
    .reduce((acc, curr) => acc + curr, 0);
};

const part2 = (input: string[]) => {
  const instructions = parseInput(input);
  const mem: Record<number, number> = {};

  instructions.forEach((instruction) => {
    applyV2Mask(instruction).forEach((i) => {
      mem[i.address] = i.decimal;
    });
  });

  return Object.values(mem)
    .filter(Boolean)
    .reduce((acc, curr) => acc + curr, 0);
};

export default {
  part1,
  part2,
};
