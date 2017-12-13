// @flow
import React from 'react';
import BabyEditForm from 'web/components/Steps/BabyEditForm';
import * as BabyProfileStyled from '../styled';

type Props = {
  handleSubmit: Function,
};

const BabyProfile = ({ handleSubmit }: Props) => (
  <BabyProfileStyled.Wrapper>
    <BabyEditForm onSubmit={handleSubmit} />
  </BabyProfileStyled.Wrapper>
);

export default BabyProfile;
