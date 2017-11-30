// @flow
import React, { PureComponent } from 'react';
import { Box, FloatingRemoveButton } from '../components';
import { MemoryMediaSingle } from '../components/MemoryMedia';
import { isEditable } from '../shared/forms';

type Props = {
  input: any,
  onRemoveMedia: (index: number) => void,
  // used by isEditable
  // eslint-disable-next-line react/no-unused-prop-types
  editable: boolean,
};

class MemoryFormFileList extends PureComponent {
  props: Props;

  static defaultProps = {
    editable: true,
  };

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
            {isEditable(this.props) && (
              <FloatingRemoveButton onPress={onRemove} />
            )}
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
