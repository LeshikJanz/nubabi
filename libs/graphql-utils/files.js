// @flow
import { memoize, last } from 'ramda';
import mime from 'mime/lite';

const getContentTypeFromExtension = memoize((extension: string) => {
  return mime.getType(extension);
});

export const getContentTypeFromFilename = (filename: string) => {
  return getContentTypeFromExtension(last(filename.split('.')));
};
