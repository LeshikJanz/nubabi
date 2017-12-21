// @flow
import type { Expert } from 'core/types';
import React from 'react';
import { InfoIcon } from 'web/assets/images';
import * as ActivityExpertStyled from '../../styled/activity/ActivityExpertStyled';
import { Tooltip } from 'web/elements';
import { compose, withState } from 'recompose';

type Props = {
  expert: Expert,
  introduction: string,
  isTooltipOpen: boolean,
  handleTooltip: Function,
};

const ActivityExpert = ({
  expert,
  introduction,
  isTooltipOpen,
  handleTooltip,
}: Props) => (
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
      <ActivityExpertStyled.TooltipWrapper>
        <InfoIcon onClick={handleTooltip} />
        <Tooltip
          isOpen={isTooltipOpen}
          handleOpen={handleTooltip}
          width="345"
          height="192"
        >
          {expert.biography}
        </Tooltip>
      </ActivityExpertStyled.TooltipWrapper>
    </ActivityExpertStyled.Footer>
  </ActivityExpertStyled.Wrapper>
);

export default compose(withState('isTooltipOpen', 'handleTooltip', false))(
  ActivityExpert,
);
