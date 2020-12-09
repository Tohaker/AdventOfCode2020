/**
 * Creates an array of all possible permutations of an array, given a number of degrees of freedom.
 * Had some help improving this one:
 * https://stackoverflow.com/questions/37075180/combinations-of-size-n-from-an-array
 * @param {T[]} input Array from which to derive permutations.
 * @param {number} degree How many unique values should be in each permutation.
 * @param {Array<T[]>} start (Optional) The starting permutation array.
 * @param {T[]} total (Optional) The total list of permutations.
 * @return {Array<T[]>} Array of number arrays, containing the permutations.
 */
export const permute = <T>(
  input: T[],
  degree: number,
  start: T[][] = [],
  total: T[] = []
): Array<T[]> =>
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

export const splitEntriesByBlankLine = (input: string[]) => {
  const blankLineIndexes = input
    .reduce((p: number[], c, i) => {
      c.trim() === '' && p.push(i);
      return p;
    }, [])
    .concat(input.length);

  return blankLineIndexes.reduce((p: string[], c, i) => {
    const lineBlock = input.slice(blankLineIndexes[i - 1] || 0, c);
    return p.concat(
      lineBlock.reduce((line, current) => line + current + ' ', '').trim()
    );
  }, []);
};
