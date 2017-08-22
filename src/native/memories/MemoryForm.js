// @flow
import type { File, FileInput, State } from '../../common/types';
import React, { PureComponent } from 'react';
import { LayoutAnimation, View } from 'react-native';
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
  mode?: 'add' | 'edit',
  onSubmit: () => void,
  onAddVoiceNote: () => void,
  handleSubmit: (submit: Function) => void,
  submitting: boolean,
  change: (field: string, value: any) => void,
  files: ?Array<File>,
};

const dateDisplayFormat = 'D MMMM • H:mm';
const formatDate = memoize(dateStr => {
  return moment(dateStr).format(dateDisplayFormat).toUpperCase();
});

const parseImageOrVideo = (file: MediaPickerItem): FileInput => {
  return {
    url: file.path,
    contentType: file.mime,
    name: last(file.path.split('/')),
    size: file.size,
  };
};

const parseImagesOrVideos = (files: Array<MediaPickerItem>): Array<File> => {
  return compose(reject(isNil), map(parseImageOrVideo))(files);
};

const removeMediaAt = curry((index: number, files: Array<File>) => {
  return update(index, null, files);
});

class MemoryForm extends PureComponent {
  props: Props;
  state = {
    removeFiles: [],
  };

  handleAddMedia = () => {
    mediaPicker().then(assets => {
      const files = parseImagesOrVideos(assets);
      this.updateFiles(union(files, this.props.files));
    });
  };

  handleRemoveMedia = (index: number) => {
    const file = this.props.files[index];
    if (file && file.id) {
      this.setState(prevState => ({
        removeFiles: append(file.id, prevState.removeFiles),
      }));
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

  datePicker = null;

  openDatePicker = () => {
    if (this.datePicker) {
      this.datePicker.open();
    }
  };

  renderDatePicker = field => {
    // $FlowFixMe$
    const format = moment.defaultFormat;
    // TODO: this all would be easier if our DatePicker component
    // allowed for a custom label component or `children` to be passed
    return (
      <View style={{ flex: 1 }}>
        <ListItem onPress={this.openDatePicker} leftIcon="md-calendar">
          <Text color="secondary">
            {formatDate(field.input.value)}
          </Text>
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

  handleSubmit = this.props.handleSubmit(input => {
    return this.props.onSubmit({
      ...input,
      removeFiles: this.state.removeFiles,
    });
  });

  render() {
    const { layout } = this.props;
    const submitText = this.props.mode === 'edit' ? 'SAVE' : 'ADD MEMORY';

    return (
      <FormContainer>
        <Box flex={1}>
          <Field
            name="title"
            multiline
            placeholder="Add a title or comment..."
            underlineColorAndroid="transparent"
            component={renderTextInput}
            validate={[required]}
          />
          <Box flex={1}>
            <Field
              name="files"
              component={MemoryFormFileList}
              onRemoveMedia={this.handleRemoveMedia}
            />
          </Box>
          <Box>
            <List>
              <Field name="createdAt" component={this.renderDatePicker} />
              <ListItem leftIcon="ios-images" onPress={this.handleAddMedia}>
                <Text color="secondary">Photo/Video</Text>
              </ListItem>
              <ListItem leftIcon="ios-medal">
                <Text color="secondary">Event</Text>
              </ListItem>
              <ListItem
                leftIcon="ios-mic"
                onPress={this.handleAddVoiceNote}
                last
              >
                <Text color="secondary">Voice note</Text>
              </ListItem>
            </List>
          </Box>
        </Box>

        <Box flexDirection="row" alignItems="flex-end">
          <SubmitButton
            submitText={submitText}
            onPress={this.handleSubmit}
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
