// @flow
import React from 'react';
import Activities from '../containers/activities';
import { Baby } from 'core/types';
import Equipment from './equipment/index';
import equipmentsMockData from 'web/assets/mock-data/stimulation/equipments.json';
import * as StimulationStyled from '../styled/index';

type Props = {
  baby: Baby,
};

const Stimulation = (data: Props) => (
  <StimulationStyled.Wrapper>
    <Activities {...data.baby} />
    <Equipment equipments={equipmentsMockData} />
  </StimulationStyled.Wrapper>
);

export default Stimulation;
