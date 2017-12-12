// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

type Props = {
  amount: string,
  nextDue: string,
  method: string,
};

const PaymentDetailsContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
`;

export const Title = styled.h3`
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 300;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 5px;
  margin-bottom: 20px;
`;

const Info = styled.span`
  color: ${props => props.theme.colors.label};
  margin-bottom: 5px;
  font-weight: 300;
`;

const Method = styled(Info)``;
const NextDue = styled(Info)``;
const Amount = styled(Info)``;

const Label = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 300;
`;

const PaymentDetails = ({ amount, nextDue, method }: Props) => {
  return (
    <PaymentDetailsContainer>
      <Title>Payment Details</Title>
      <Method>
        <Label>Payment method: </Label>
        {method}
      </Method>
      <NextDue>
        <Label>Next Payment Due: </Label>
        {nextDue}
      </NextDue>
      <Amount>
        <Label>Amount: </Label>
        {amount}
      </Amount>
    </PaymentDetailsContainer>
  );
};

export default PaymentDetails;
