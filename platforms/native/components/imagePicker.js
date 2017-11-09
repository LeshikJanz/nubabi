import ImagePicker from 'react-native-image-picker';
import { merge } from 'lodash';

const defaultOptions = {
  title: 'Select Image',
  mediaType: 'photo',
  noData: true, // Excludes Base64 generation
};

export default function show(options = {}) {
  const imagePickerOptions = merge({}, defaultOptions, options);

  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker(imagePickerOptions, response => {
      if (response.error) {
        reject(new Error(response.error));
      }

      // TODO: handle didCancel, we don't want a promise that could
      // never resolve
      if (!response.didCancel) {
        resolve(response);
      }
    });
  });
}
