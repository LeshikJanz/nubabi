// @flow
import MediaPicker from 'react-native-image-crop-picker';
import { merge } from 'lodash';

export type MediaPickerOptions = {|
  cropping?: boolean,
  width?: number,
  height?: number,
  multiple?: boolean,
  includeBase64?: boolean,
  cropperActiveWidgetColor?: string,
  cropperStatusBarColor?: string,
  cropperToolbarColor?: string,
  cropperCircleOverlay?: string,
  maxFiles?: number,
  waitAnimationEnd?: boolean,
  smartAlbums?: Array<string>,
  useFrontCamera?: boolean,
  compressVideoPreset?: string,
  compressImageMaxWidth?: number,
  compressImageMaxWeight?: number,
  compressImageQuality?: number,
  loadingLabelText?: string,
  mediaType?: 'photo' | 'video' | 'any',
  showsSelectedCount?: boolean,
  showCropGuidelines?: boolean,
  hideBottomControls?: boolean,
  enableRotationGesture?: boolean,
|};

export type MediaPickerItem = {|
  path: string,
  width: number,
  height: number,
  mime: string,
  size: number,
  data?: string,
|};

export type MediaPickerResponse = Array<MediaPickerItem>;

const defaultOptions = {
  mediaType: 'any',
  multiple: true,
  includeBase64: true,
};

export function showMediaPicker(
  options?: MediaPickerOptions,
): Promise<MediaPickerResponse> {
  const imagePickerOptions = merge({}, defaultOptions, options || {});

  return MediaPicker.openPicker(imagePickerOptions);
}

export default showMediaPicker;
