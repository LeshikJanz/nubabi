import { formatAge } from '../formatAge';

Date.now = jest.fn(() => new Date(2017, 3, 31)); // 2017-4-31

describe('formatAge', () => {
  it('returns a timeago formatted date', () => {
    expect(formatAge('2017-4-20')).toEqual('1 week old');
    expect(formatAge('2017-4-12')).toEqual('2 weeks old');
    expect(formatAge('2017-3-20')).toEqual('1 month old');
    expect(formatAge('2017-3-30')).toEqual('1 month old');
    expect(formatAge('2017-3-31')).toEqual('1 month old');
    expect(formatAge('2017-2-29')).toEqual('2 months old');
    expect(formatAge('2017-2-31')).toEqual('1 month old');
    expect(formatAge('2016-4-20')).toEqual('1 year old');
  });
});
