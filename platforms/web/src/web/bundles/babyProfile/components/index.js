// @flow
import React from 'react';
import BabyEditForm from 'web/components/Steps/BabyEditForm';
import * as BabyProfileStyled from '../styled';
import type { Baby } from 'core/types';

type Props = {
  handleSubmit: Function,
  editableBaby: Baby,
};

const BabyProfile = ({ handleSubmit, editableBaby }: Props) => (
  <BabyProfileStyled.Wrapper>
    <BabyEditForm onSubmit={handleSubmit} initialValues={editableBaby} />
  </BabyProfileStyled.Wrapper>
);

export default BabyProfile;
