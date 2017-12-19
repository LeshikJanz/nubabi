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
    billedAmount: number,
    monthsFree: number,
    paymentTotal: number,
    price: number,
    title: string,
  },
};

const renderCurrentPlan = plan => {
  return (
    <PlanContainer>
      <PlanTitle>{plan.title}</PlanTitle>
      <Price>
        <R>R</R>
        <Asterisk>*</Asterisk>
        <PM>p/m</PM>
        {plan.price.toFixed(2)}
      </Price>
      <Annually>{`*R${plan.billedAmount} Billed Annually`}</Annually>
      <Free>{`${plan.monthsFree} months free!`}</Free>
      <ChangePackage>Change Package</ChangePackage>
      <Total>
        <TotalaLabel>Payment total</TotalaLabel>
        <TotalAmount>{`R${plan.paymentTotal.toFixed(2)}`}</TotalAmount>
      </Total>
    </PlanContainer>
  );
};

const SubscribeRightSidebar = ({ plan }: Props) => {
  return (
    <RightSidebar>
      <Title>Your subscription:</Title>
      {renderCurrentPlan(plan)}
    </RightSidebar>
  );
};

export default SubscribeRightSidebar;
