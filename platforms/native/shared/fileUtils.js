// @flow
import { getContentTypeFromFilename } from 'core/helpers/graphqlUtils';

export const isNewFile = (file: ?{ url: string }) => {
  if (!file) {
    return false;
  }

  return !file.url.startsWith('https://firebasestorage.googleapis.com');
};

// Parse results from react-native-image-picker into File interface inout
// (do not confuse with react-native-image-crop-picker which already gives
// us the expected result
export const fileFromImagePickerResult = file => {
  return {
    size: file.fileSize,
    name: file.fileName,
    url: file.uri,
    contentType: getContentTypeFromFilename(file.fileName),
  };
};
