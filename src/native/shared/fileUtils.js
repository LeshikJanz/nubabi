// @flow
import { path, prop } from 'ramda';

export const isNewFile = (file: ?{ url: string }) => {
  if (!file) {
    return false;
  }

  return !file.url.startsWith('https://firebasestorage.googleapis.com');
};
