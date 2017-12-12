// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { Title } from 'web/components/UnitPreferences';
import PlanDetails from './PlanDetails';
import PaymentDetails from './PaymentDetails';

const SubscriptionContainer = styled(Flex)`
  flex-direction: column;
  padding: 30px;
  color: ${props => props.theme.colors.label};
  width: 100%;
`;

const Subscriptions = () => {
  return (
    <SubscriptionContainer>
      <Title>My Subscription</Title>
      <PlanDetails start="22/07/2017" plan="Nubabi Annual Subscription" />
      <PaymentDetails amount="R400" nextDue="22/07/2018" method="EFT" />
    </SubscriptionContainer>
  );
};

export default Subscriptions;
