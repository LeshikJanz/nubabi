// @flow
export const formatDuration = (duration: ?number) => {
  if (typeof duration === 'undefined') {
    return 'Unknown';
  }

  const date = new Date(0);
  date.setSeconds(duration);
  if (date.getUTCHours() > 0) {
    // we account for 1 since that's the default
    return date.toISOString().substr(11, 8);
  } else {
    return date.toISOString().substr(14, 5);
  }
};
