// @flow
import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Box } from '../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { type MediaPickerItem } from '../components/mediaPicker';
import { MemoryMediaSingle } from './MemoryMedia';

type Props = {
  input: any,
  onRemoveMedia: (index: number) => void,
};

class MemoryFormFileList extends PureComponent {
  props: Props;

  renderFiles() {
    let fileList;
    const files = this.props.input.value;

    if (files && files.length > 0) {
      fileList = files.map((file, index) => {
        const onRemove = () => this.props.onRemoveMedia(index);
        return (
          <Box
            margin={0.5}
            key={file.id || file.name}
            style={() => ({
              width: 120,
              height: 80,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 3,
              shadowOffset: {
                height: 1,
                width: 0,
              },
            })}
          >
            <Box
              as={TouchableOpacity}
              onPress={onRemove}
              style={() => ({
                position: 'absolute',
                top: -5,
                right: -5,
                zIndex: 999,
                width: 20,
                height: 20,
                backgroundColor: 'transparent',
              })}
            >
              <Box
                flex={1}
                backgroundColor="primary"
                style={() => ({
                  borderRadius: 20 / 2,
                  overflow: 'hidden',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowColor: '#000',
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  shadowOffset: {
                    height: 1,
                    width: 0,
                  },
                })}
              >
                <Icon
                  name="ios-close"
                  size={18}
                  color="#fff"
                  style={{ marginTop: 1 }}
                />
              </Box>
            </Box>
            <MemoryMediaSingle
              media={file}
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
            />
          </Box>
        );
      });
    }

    return (
      <Box
        flex={1}
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {fileList}
      </Box>
    );
  }

  render() {
    return this.renderFiles();
  }
}

export default MemoryFormFileList;
