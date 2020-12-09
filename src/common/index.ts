/**
 * Had some help improving this one:
 * https://stackoverflow.com/questions/37075180/combinations-of-size-n-from-an-array
 * @param {number[]} input Array from which to derive permutations.
 * @param {number} degree How many unique values should be in each permutation.
 * @param {Array<number[]>} start (Optional) The starting permutation array.
 * @param {number[]} total (Optional) The total list of permutations.
 * @return {Array<number[]>} Array of number arrays, containing the permutations.
 */
export const permute = (
  input: number[],
  degree: number,
  start: number[][] = [],
  total: number[] = []
) =>
  input.reduce((prev, current, index, input) => {
    degree > 1
      ? permute(
          input.slice(0, index).concat(input.slice(index + 1)),
          degree - 1,
          prev,
          (total.push(current), total)
        )
      : prev.push((total.push(current), total).slice(0));
    total.pop();
    return prev;
  }, start);
