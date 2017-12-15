import formatDate from '../formatDate';

describe('formatDate', () => {
  it('formats a Date for activity display', () => {
    expect(formatDate('2017-06-02')).toEqual('JUNE 2 2017');
  });
});
