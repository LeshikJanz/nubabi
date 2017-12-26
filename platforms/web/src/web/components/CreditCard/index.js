// @flow
import React from 'react';
import * as CreditCardStyle from './styled/index';
import Secure from 'web/components/3DSecureBox/index';
import CardPaymentForm from 'web/components/CardPaymentForm/index';
import InfoBox from 'web/components/CreditCardInfoBox/index';

const CreditCard = () => {
  return (
    <CreditCardStyle.PaymentCard>
      <CreditCardStyle.PaymentWay>
        Credit/debit card payment
      </CreditCardStyle.PaymentWay>
      <CardPaymentForm />
      <Secure />
      <InfoBox />
    </CreditCardStyle.PaymentCard>
  );
};

export default CreditCard;
