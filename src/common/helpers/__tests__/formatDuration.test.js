/* eslint-disable no-mixed-operators */
import { formatDuration } from '../formatDuration';

const SECONDS = 1;
const MINUTES = 60;
const HOURS = 60 * 60;

describe('formatDuration', () => {
  it('returns "Unknown" if no duration is given', () => {
    expect(formatDuration()).toEqual('Unknown');
  });

  it('returns "00:00" if duration is null', () => {
    expect(formatDuration(null)).toEqual('00:00');
  });

  it('returns MM:SS if the duration is shorter than a minute', () => {
    const duration = 20 * SECONDS;

    expect(formatDuration(duration)).toEqual('00:20');
  });

  it('returns MM:SS if the duration is shorter than an hour', () => {
    const duration = 5 * MINUTES + 20 * SECONDS;

    expect(formatDuration(duration)).toEqual('05:20');
  });

  it('returns HH:MM:SS if the duration is longer than an hour', () => {
    const duration = 1 * HOURS + 5 * MINUTES + 20 * SECONDS;

    expect(formatDuration(duration)).toEqual('01:05:20');
  });
});

/* eslint-enable no-mixed-operators */
