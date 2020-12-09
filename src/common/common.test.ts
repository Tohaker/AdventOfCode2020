import { permute, splitEntriesByBlankLine } from '.';

describe('Common function', () => {
  describe('Permute', () => {
    it('should create all permuations of an array', () => {
      const input = ['A', 'B', 'C'];
      const expected = [
        ['A', 'B'],
        ['A', 'C'],
        ['B', 'A'],
        ['B', 'C'],
        ['C', 'A'],
        ['C', 'B'],
      ];

      expect(permute(input, 2)).toEqual(expected);
    });
  });

  describe('Split Entries', () => {
    it('should create a new array of line blocks', () => {
      const input = ['a', 'b', 'c', '', 'e', 'f'];
      const expected = ['a b c', 'e f'];

      expect(splitEntriesByBlankLine(input)).toEqual(expected);
    });
  });
});
