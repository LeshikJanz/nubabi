// @flow
import type { Baby } from 'core/types';
import React from 'react';
import BabyEditForm from 'web/components/Steps/BabyEditForm';
import * as BabyProfileStyled from '../styled';

type Props = {
  handleSubmit: Function,
  editableBaby: Baby,
};

const addDefaultUnits = editableBaby => ({
  ...editableBaby,
  weightUnits: 'kg',
  heightUnits: 'cm',
});

const BabyProfile = ({ handleSubmit, editableBaby }: Props) => (
  <BabyProfileStyled.Wrapper>
    <BabyEditForm
      onSubmit={handleSubmit}
      initialValues={addDefaultUnits(editableBaby)}
    />
  </BabyProfileStyled.Wrapper>
);

export default BabyProfile;
