// @flow
import React from 'react';
import Activities from '../containers/activities';
import { Baby } from 'core/types';
import Equipment from './equipment/index';
import equipmentsMockData from 'web/assets/mock-data/stimulation/equipments.json';
import * as StimulationStyled from '../styled/indexStyled';

type Props = {
  baby: Baby,
};

const Stimulation = ({ baby }: Props) => (
  <StimulationStyled.Wrapper>
    <Activities {...baby} />
    <Equipment equipments={equipmentsMockData} />
  </StimulationStyled.Wrapper>
);

export default Stimulation;
