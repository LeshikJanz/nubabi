// @flow
import type { File, FileInput, State } from 'core/types';
import React, { PureComponent } from 'react';
import { Image, LayoutAnimation, View } from 'react-native';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import {
  append,
  compose,
  curry,
  isNil,
  last,
  map,
  memoize,
  reject,
  union,
  update,
} from 'ramda';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Box,
  DatePicker,
  FloatingRemoveButton,
  FormContainer,
  List,
  ListItem,
  Text,
  withLayout,
} from '../components';
import { isEditable, renderTextInput, required } from '../shared/forms';
import mediaPicker, { type MediaPickerItem } from '../components/mediaPicker';
import MemoryFormFileList from './MemoryFormFileList';
import { findSuggestedMemoryById } from './SuggestedMemoriesList';
import SuggestedMemoryCardContainer from './SuggestedMemoryCardContainer';
import theme from 'core/themes/defaultTheme';
import RemoveMemoryButton from './RemoveMemoryButton';

type Props = {
  mode?: 'add' | 'edit',
  onAddVoiceNote: () => void,
  onEditSticker: () => void,
  onRemoveMemory?: () => void,
  submitting: boolean,
  change: (field: string, value: any) => void,
  files: ?Array<File>,
  initialValues: Object,
  suggestedMemoryType: ?string,
  fromActivity?: { id: string, name: string },
  removeFiles: Array<string>,
  onMemoryRemoved?: () => void,
};

const dateDisplayFormat = 'D MMMM • H:mm';
const formatDate = memoize(dateStr => {
  return moment(dateStr)
    .format(dateDisplayFormat)
    .toUpperCase();
});

const parseImageOrVideo = (file: MediaPickerItem): FileInput => {
  const result = {
    url: file.path,
    contentType: file.mime,
    name: last(file.path.split('/')),
    size: file.size,
  };
  if (file.exif) {
    result.metadata = {
      _raw: JSON.stringify({
        exif: file.exif,
      }),
    };
  }

  return result;
};

const parseImagesOrVideos = (files: Array<MediaPickerItem>): Array<File> => {
  return compose(reject(isNil), map(parseImageOrVideo))(files);
};

const removeMediaAt = curry((index: number, files: Array<File>) => {
  return update(index, null, files);
});

class MemoryForm extends PureComponent {
  props: Props;

  datePicker = null;

  handleAddMedia = () => {
    mediaPicker().then(assets => {
      const files = parseImagesOrVideos(assets);
      console.log(files);
      this.updateFiles(union(files, this.props.files));
    });
  };

  handleRemoveMedia = (index: number) => {
    const file = this.props.files[index];

    if (file && file.id) {
      this.props.change('removeFiles', append(file.id, this.props.removeFiles));
    }

    this.updateFiles(removeMediaAt(index, this.props.files));
  };

  handleAddVoiceNote = () => {
    this.props.onAddVoiceNote();
  };

  updateFiles = (files: Array<File>) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.change('files', reject(isNil, files));
  };

  openDatePicker = () => {
    if (this.datePicker) {
      this.datePicker.open();
    }
  };

  handleRemoveSuggestedMemoryType = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.change('suggestedMemoryType', null);
  };

  renderDatePicker = field => {
    // $FlowFixMe$
    const format = moment.defaultFormat;
    // TODO: this all would be easier if our DatePicker component
    // allowed for a custom label component or `children` to be passed
    return (
      <View style={{ flex: 1 }}>
        <ListItem
          editable={field.editable}
          onPress={this.openDatePicker}
          leftIcon="md-calendar"
          iconColor={field.iconColor}
        >
          <Text color="secondary">{formatDate(field.input.value)}</Text>
        </ListItem>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'blue',
          }}
        >
          <DatePicker
            ref={ref => {
              this.datePicker = ref;
            }}
            mode="datetime"
            format={format}
            date={field.input.value}
            onChange={field.input.onChange}
            hideText
          />
        </View>
      </View>
    );
  };

  renderSuggestedMemoryType = field => {
    const suggestedMemoryId = field.input.value;

    if (!suggestedMemoryId) {
      return null;
    }

    const suggestedMemoryType = findSuggestedMemoryById(suggestedMemoryId);

    if (!suggestedMemoryType) {
      return null;
    }

    return (
      <SuggestedMemoryCardContainer>
        {this.props.mode === 'edit' &&
          isEditable(field) && (
            <FloatingRemoveButton
              onPress={this.handleRemoveSuggestedMemoryType}
            />
          )}
        <Image
          source={suggestedMemoryType.image}
          style={{ width: 52, height: 52 }}
        />
      </SuggestedMemoryCardContainer>
    );
  };

  render() {
    const {
      mode,
      suggestedMemoryType,
      onMemoryRemoved,
      submitting: isSubmitting,
      fromActivity,
    } = this.props;

    const editableProps = { editable: !isSubmitting };

    return (
      <FormContainer>
        <Box flex={1}>
          <Box flex={1} flexDirection="row" alignItems="center">
            {suggestedMemoryType && (
              <Field
                {...editableProps}
                name="suggestedMemoryType"
                component={this.renderSuggestedMemoryType}
              />
            )}
            <Field
              {...editableProps}
              name="title"
              multiline
              placeholder="Add a title or comment..."
              underlineColorAndroid="transparent"
              component={renderTextInput}
              validate={[required]}
            />
          </Box>
          <Box flex={1}>
            <Field
              {...editableProps}
              name="files"
              component={MemoryFormFileList}
              onRemoveMedia={this.handleRemoveMedia}
            />
          </Box>
          <Box>
            <List>
              <Field
                name="createdAt"
                component={this.renderDatePicker}
                iconColor={theme.colors.primary}
                {...editableProps}
              />
              <ListItem
                leftIcon="ios-images"
                onPress={this.handleAddMedia}
                iconColor={theme.colors.primary}
                {...editableProps}
              >
                <Text color="secondary">Photo/Video</Text>
              </ListItem>
              <ListItem
                leftIcon="md-flower"
                iconColor={theme.colors.primary}
                onPress={this.props.onEditSticker}
                last={!fromActivity}
                {...editableProps}
              >
                <Text color="secondary">Stickers</Text>
              </ListItem>
              {fromActivity && (
                <ListItem
                  editable={false}
                  leftIcon="ios-albums"
                  iconColor={theme.colors.primary}
                  last
                >
                  <Text color="secondary">{fromActivity.name}</Text>
                </ListItem>
              )}
            </List>
          </Box>
        </Box>

        {mode === 'edit' && (
          <Box flexDirection="row" alignItems="flex-end">
            <RemoveMemoryButton
              id={this.props.initialValues.id}
              goBack={onMemoryRemoved}
            />
          </Box>
        )}
      </FormContainer>
    );
  }
}

const selector = formValueSelector('memory');
export default compose(
  reduxForm({
    form: 'memory',
  }),
  connect((state: State) => ({
    files: selector(state, 'files'),
    removeFiles: selector(state, 'removeFiles'),
    suggestedMemoryType: selector(state, 'suggestedMemoryType'),
  })),
  withLayout,
)(MemoryForm);
