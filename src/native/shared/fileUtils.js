// @flow
import { assoc, pick } from 'ramda';
import Platform from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

export const fileToBase64 = (path: string) => {
  return new Promise((resolve, reject) => {
    RNFetchBlob.fs
      .readStream(
        // file path
        path,
        // encoding, should be one of `base64`, `utf8`, `ascii`
        'base64',
        // (optional) buffer size, default to 4096 (4095 for BASE64 encoded data)
        // when reading file in BASE64 encoding, buffer size must be multiples of 3.
        4095,
      )
      .then(ifstream => {
        let data = '';
        ifstream.open();
        ifstream.onData(chunk => {
          // when encoding is `ascii`, chunk will be an array contains numbers
          // otherwise it will be a string
          data += chunk;
        });
        ifstream.onError(err => {
          reject(err);
        });

        ifstream.onEnd(() => {
          resolve(data);
        });
      });
  });
};

// We removed the file:/// prefix earlier
const isLocalFile = (file: string) => file.startsWith('/');

export const processFiles = async files => {
  return Promise.all(
    files.map(async file => {
      const url =
        Platform.OS === 'ios' ? file.url.replace('file:///', '') : file.url;

      if (isLocalFile(url)) {
        const input = assoc(
          'url',
          `data:${file.contentType};base64,${await fileToBase64(url)}`,
          file,
        );

        if (!file.size) {
          input.size = (await RNFetchBlob.fs.stat(url)).size;
        }

        return input;
      }

      return file;
    }),
  );
};
