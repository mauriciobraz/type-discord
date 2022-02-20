import sum from '../source';

describe('sum', () => {
  it('should return 2', () => {
    const result = sum(1, 1);
    const expected = 2;

    expect(result).toBe(expected);
  });
});
