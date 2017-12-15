import formatPossessive from '../formatPossessive';

describe('formatPosessive', () => {
  it("returns a name with append 's if the name doesn't end with an s", () => {
    expect(formatPossessive('Alice')).toEqual("Alice's");
  });

  it("skips the final s if the name ends with a s", () => {
    expect(formatPossessive('Chris')).toEqual("Chris'");
  });
});
