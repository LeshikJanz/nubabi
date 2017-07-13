// @flow
import type { State, File } from '../../common/types';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import {
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
  FormContainer,
  List,
  ListItem,
  SubmitButton,
  Text,
  withLayout,
} from '../components';
import { renderTextInput, required } from '../shared/forms';
import mediaPicker, { type MediaPickerItem } from '../components/mediaPicker';
import MemoryFormFileList from './MemoryFormFileList';

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean,
  change: (field: string, value: any) => void,
  files: ?Array<File>,
};

const dateDisplayFormat = 'D MMMM • H:mm';
const formatDate = memoize(dateStr => {
  return moment(dateStr).format(dateDisplayFormat).toUpperCase();
});

const parseImageOrVideo = (file: MediaPickerItem): File => {
  if (!file.data) {
    return null;
  }

  return {
    url: `data:${file.mime};base64,${file.data}`,
    contentType: file.mime,
    name: last(file.path.split('/')),
    size: file.size,
  };
};

const removeMediaAt = curry((index: number, files: Array<File>) => {
  return update(index, null, files);
});

const parseImagesOrVideos = (files: Array<MediaPickerItem>): Array<File> => {
  return compose(reject(isNil), map(parseImageOrVideo))(files);
};

class MemoryForm extends PureComponent {
  props: Props;

  handleAddMedia = () => {
    mediaPicker().then(parseImagesOrVideos).then(files => {
      this.updateFiles(union(files, this.props.files));
    });
  };

  handleRemoveMedia = (index: number) => {
    this.updateFiles(removeMediaAt(index, this.props.files));
  };

  updateFiles = (files: Array<File>) => {
    this.props.change('files', reject(isNil, files));
  };

  renderDatePicker = field => {
    // $FlowFixMe$
    const format = moment.defaultFormat;
    // TODO: this all would be easier if our DatePicker component
    // allowed for a custom label component or `children` to be passed
    return (
      <View>
        <DatePicker
          mode="datetime"
          format={format}
          date={field.input.value}
          onChange={field.input.onChange}
          hideText
        />
        <Text
          color="secondary"
          style={() => ({ position: 'absolute', top: -8, zIndex: -999 })}
        >
          {formatDate(field.input.value)}
        </Text>
      </View>
    );
  };

  render() {
    const { handleSubmit, onSubmit: submit, layout } = this.props;

    return (
      <FormContainer>
        <Box flex={1}>
          <Box flex={1}>
            <Field
              name="title"
              multiline
              placeholder="Add a title or comment..."
              underlineColorAndroid="transparent"
              component={renderTextInput}
              validate={[required]}
            />
          </Box>
          <Box flex={1} alignItems="flex-start">
            <Field
              name="files"
              component={MemoryFormFileList}
              onRemoveMedia={this.handleRemoveMedia}
            />
          </Box>
          <List>
            <ListItem leftIcon="md-calendar">
              <Field name="createdAt" component={this.renderDatePicker} />
            </ListItem>
            <ListItem leftIcon="ios-images" onPress={this.handleAddMedia}>
              <Text color="secondary">Photo/Video</Text>
            </ListItem>
            <ListItem leftIcon="ios-medal">
              <Text color="secondary">Event</Text>
            </ListItem>
            <ListItem leftIcon="ios-mic" last>
              <Text color="secondary">Voice note</Text>
            </ListItem>
          </List>
        </Box>

        <Box flex={1} flexDirection="row" alignItems="flex-end">
          <SubmitButton
            submitText="ADD MEMORY"
            onPress={handleSubmit(submit)}
            loading={this.props.submitting}
          />
        </Box>
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
  })),
  withLayout,
)(MemoryForm);
