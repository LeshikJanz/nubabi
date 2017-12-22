// @flow
import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import BabyPhotoImg from 'web/assets/images/baby_photo.png';
import { compose, withHandlers, withState } from 'recompose';
import { setBabyPhoto } from 'core/babies/actions';

type Props = {
  preview: string,
  onDrop: Function,
  input: any,
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

const DropzoneField = (props: Props) => (
  <Wrapper backgroundImage={BabyPhotoImg}>
    <Dropzone
      {...props.input}
      onDrop={props.onDrop}
      multiple={false}
      accept="image/jpeg, image/png, image/svg"
      className="dropzone-area"
      activeClassName="dropzone-area-active"
      rejectClassName="dropzone-area-reject"
    >
      {props.preview && <Avatar backgroundImage={props.preview} alt="" />}
    </Dropzone>
  </Wrapper>
);

export default compose(
  connect(null),
  withState('preview', 'handlePreview', null),
  withHandlers({
    onDrop: props => acceptedFiles => {
      if (acceptedFiles.length) {
        props.handlePreview(acceptedFiles[0].preview);

        const reader = new FileReader();

        reader.onload = () => {
          props.dispatch(setBabyPhoto(reader.result));
        };

        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
  }),
)(DropzoneField);
