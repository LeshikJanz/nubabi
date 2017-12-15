import pluralizeWithSubject from '../pluralizeWithSubject';

describe('pluralizeWithSubject', () => {
  it('pluralizes a string and includes the count', () => {
    expect(pluralizeWithSubject('cats', 0)).toEqual('0 cats');
    expect(pluralizeWithSubject('cats', 1)).toEqual('1 cat');
  });
});
