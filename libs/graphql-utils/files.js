// @flow
import {
  always,
  compose,
  cond,
  last,
  memoize,
  prop,
  startsWith,
  T,
} from 'ramda';
import mime from 'mime/lite';

const getContentTypeFromExtension = memoize((extension: string) => {
  return mime.getType(extension);
});

export const getContentTypeFromFilename = (filename: string) => {
  return getContentTypeFromExtension(last(filename.split('.')));
};

export const getTypenameForFile = (file: { contentType: string }) => {
  return compose(
    cond([
      [startsWith('image'), always('Image')],
      [startsWith('video'), always('Video')],
      [startsWith('audio'), always('Audio')],
      [T, always('GenericFile')],
    ]),
    prop('contentType'),
  )(file);
};
