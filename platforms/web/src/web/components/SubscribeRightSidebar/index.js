// @flow
import * as React from 'react';
import {
  RightSidebar,
  PlanContainer,
  Title,
  PlanTitle,
  Price,
  R,
  Asterisk,
  PM,
  Annually,
  Free,
  ChangePackage,
  Total,
  TotalaLabel,
  TotalAmount,
} from './styled';

type Props = {
  plan: {
    billedAmount: string,
    monthsFree: string,
    paymentTotal: number,
    price: number,
    title: string,
  },
  monthSubscription?: boolean,
};

const renderCurrentPlan = (plan, monthSubscription) => {
  return (
    <PlanContainer>
      <PlanTitle>{plan.title}</PlanTitle>
      <Price>
        <R>R</R>
        {monthSubscription ? null : <Asterisk>*</Asterisk>}
        <PM>p/m</PM>
        {plan.price.toFixed(2)}
      </Price>
      <Annually>{plan.billedAmount}</Annually>
      <Free>{plan.monthsFree}</Free>
      <ChangePackage>Change Package</ChangePackage>
      <Total>
        <TotalaLabel>Payment total</TotalaLabel>
        <TotalAmount>{`R${plan.paymentTotal.toFixed(2)}`}</TotalAmount>
      </Total>
    </PlanContainer>
  );
};

const SubscribeRightSidebar = ({ plan, monthSubscription }: Props) => {
  return (
    <RightSidebar>
      <Title>Your subscription:</Title>
      {renderCurrentPlan(plan, monthSubscription)}
    </RightSidebar>
  );
};

export default SubscribeRightSidebar;
