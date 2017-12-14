// @flow
import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import BabyPhotoImg from 'web/assets/images/baby_photo.png';
import { compose, withHandlers, withState } from 'recompose';

type Props = {
  preview: string,
  onDrop: Function,
};

const Avatar = styled.div`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
`;

const Wrapper = styled.div`
  ${Avatar}, .dropzone-area {
    width: 60px;
    height: 60px;
    border: 2px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.panel};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-position: center;
    cursor: pointer;
  }

  .dropzone-area {
    background-image: url(${props => props.backgroundImage});
    background-size: 90%;

    &.dropzone-area-active {
      border-color: green;
    }

    &.dropzone-area-reject {
      border-color: red;

      p.default {
        display: none;
      }

      p.reject-warning {
        display: block;
      }
    }
  }
`;

const DropzoneField = ({ onDrop, preview }: Props) => (
  <Wrapper backgroundImage={BabyPhotoImg}>
    <Dropzone
      onDrop={onDrop}
      accept="image/jpeg, image/png, image/svg"
      className="dropzone-area"
      activeClassName="dropzone-area-active"
      rejectClassName="dropzone-area-reject"
    >
      {preview && <Avatar backgroundImage={preview} alt="" />}
    </Dropzone>
  </Wrapper>
);

export default compose(
  withState('preview', 'handlePreview', null),
  withHandlers({
    onDrop: ({ handlePreview }) => acceptedFiles => {
      if (acceptedFiles.length) {
        handlePreview(acceptedFiles[0].preview);

        const reader = new FileReader();
        // TODO: save image data in needed format(after implementation it on server)
        reader.onload = (/* event */) => {
          // input.onChange(event.target.result);
        };

        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
  }),
)(DropzoneField);
