// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import InfoIcon from 'web/assets/images/icons/info-icon.svg';
import ReactTooltip from 'react-tooltip';
import { Expert } from 'core/types';

const Wrapper = styled(Flex)`
  flex-direction: column;
  padding: 28px 15px;
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-top: none;
`;

const ExpertHeading = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ExpertHeadingText = styled.div`
  ${props => props.theme.text.h3};
`;

const ExpertText = styled.div`
  padding-top: 10px;
  ${props => props.theme.text.default};
`;

const ExpertIcon = styled.img`
  border-radius: 100%;
  max-height: 40px;
`;

const ExpertFooterText = styled.div`
  ${props => props.theme.text.small};
`;

const ExpertFooter = styled(Flex)`
  padding: 40px 0 15px 0;
  justify-content: space-between;
  align-items: center;

  > svg {
    cursor: pointer;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }

  .__react_component_tooltip {
    max-width: 345px;
    background-color: #fff !important;
    border: solid 1px ${props => props.theme.colors.open.white2};
    padding: 16px;
    line-height: 1.71;
    color: ${props => props.theme.colors.open.gray6b} !important;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.25);

    &:.type-warning.place-bottom:after {
    }
  }
`;

type Props = {
  expert: Expert,
  introduction: string,
};

const ActivityExpert = ({ expert, introduction }: Props) => (
  <Wrapper>
    <ExpertHeading>
      <ExpertHeadingText>
        Our expert {expert.name.split(' ')[0]} says
      </ExpertHeadingText>
      <ExpertIcon src={expert.avatar.url} />
    </ExpertHeading>
    <ExpertText>{introduction}</ExpertText>
    <ExpertFooter>
      <ExpertFooterText>
        {expert.name} <br />
        {expert.discipline}
      </ExpertFooterText>
      <div data-tip="React-tooltip">
        <InfoIcon />
      </div>
      <ReactTooltip place="bottom" type="warning" effect="solid">
        {expert.biography}
      </ReactTooltip>
    </ExpertFooter>
  </Wrapper>
);

export default ActivityExpert;
