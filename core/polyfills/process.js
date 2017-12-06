/* eslint-disable no-global-assign */
if (typeof process === 'undefined') {
  process = {};
}

if (typeof process.nextTick === 'undefined') {
  // eslint-disable-next-line no-undef
  process.nextTick = requestAnimationFrame;
}
