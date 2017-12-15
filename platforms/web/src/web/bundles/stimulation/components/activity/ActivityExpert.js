// @flow
import type { Expert } from 'core/types';
import React from 'react';
import InfoIcon from 'web/assets/images/icons/info-icon.svg';
import ReactTooltip from 'react-tooltip';
import * as ActivityExpertStyled from '../../styled/activity/ActivityExpertStyled';

type Props = {
  expert: Expert,
  introduction: string,
};

const ActivityExpert = ({ expert, introduction }: Props) => (
  <ActivityExpertStyled.Wrapper>
    <ActivityExpertStyled.Heading>
      <ActivityExpertStyled.HeadingText>
        Our expert {expert.name.split(' ')[0]} says
      </ActivityExpertStyled.HeadingText>
      <ActivityExpertStyled.Icon src={expert.avatar.url} />
    </ActivityExpertStyled.Heading>
    <ActivityExpertStyled.Text>{introduction}</ActivityExpertStyled.Text>
    <ActivityExpertStyled.Footer>
      <ActivityExpertStyled.FooterText>
        {expert.name} <br />
        {expert.discipline}
      </ActivityExpertStyled.FooterText>
      <div data-tip="React-tooltip">
        <InfoIcon />
      </div>
      <ReactTooltip place="bottom" type="warning" effect="solid">
        {expert.biography}
      </ReactTooltip>
    </ActivityExpertStyled.Footer>
  </ActivityExpertStyled.Wrapper>
);

export default ActivityExpert;
