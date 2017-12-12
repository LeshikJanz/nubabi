// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Title } from 'web/components/Subscriptions/PaymentDetails';

type Props = {
  plan: string,
  start: string,
};

const PaymentDetailsContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const Info = styled.span`
  color: ${props => props.theme.colors.label};
  margin-bottom: 5px;
  font-weight: 300;
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 300;
`;

const SwitchCancelStyles = styled(Flex)`
  font-size: 13px;
  justify-content: space-between;
  margin-top: 20px;
  font-weight: 300;
`;

const PlanManagement = styled(Flex)`
  flex-direction: column;
  width: 100%;
`;

const Lnk = styled.span`
  color: ${props => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LnkLabel = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 300;
`;

const Plan = styled(Info)``;
const Date = styled(Info)``;
const Switch = styled(SwitchCancelStyles)``;
const Cancel = styled(SwitchCancelStyles)``;

const PlanDetails = ({ plan, start }: Props) => {
  return (
    <PaymentDetailsContainer>
      <Title>Plan Details</Title>
      <Plan>
        <Label>Your Plan: </Label>
        {plan}
      </Plan>
      <Date>
        <Label>Start Date: </Label>
        {start}
      </Date>
      <PlanManagement>
        <Switch>
          <Lnk>Switch plan</Lnk>
          <LnkLabel>
            Switch your plan before your next payment date on 12/10/2017.
          </LnkLabel>
        </Switch>
        <Cancel>
          <Lnk>Cancel subscription</Lnk>
          <LnkLabel>
            You’ll still be able to access your content until 12/10/2017.
          </LnkLabel>
        </Cancel>
      </PlanManagement>
    </PaymentDetailsContainer>
  );
};

export default PlanDetails;
