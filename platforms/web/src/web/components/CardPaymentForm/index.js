// @flow
import React from 'react';
import * as CardPaymentFormStyle from './styled/index';
import Button from 'web/elements/Button';
import { Field, reduxForm } from 'redux-form';
import TextInput from 'web/elements/TextInput/index';
import Dropdown from 'web/elements/DropDown/index';
import CVC from 'web/assets/images/cvc.png';
import * as mock from './mock';
import MasterCard from 'web/assets/images/MasterCard.png';

const Visa = require('web/assets/images/icons/visa.svg');

const CardPaymentForm = () => {
  return (
    <CardPaymentFormStyle.Form>
      <CardPaymentFormStyle.FieldsContainer>
        <CardPaymentFormStyle.FieldContainer>
          <CardPaymentFormStyle.FieldTitle>
            Name on card *
          </CardPaymentFormStyle.FieldTitle>
          <Field component={TextInput} name="nameOnCard" type="text" />
        </CardPaymentFormStyle.FieldContainer>
        <CardPaymentFormStyle.FieldContainer>
          <CardPaymentFormStyle.FieldTitle>
            Card number *
          </CardPaymentFormStyle.FieldTitle>
          <Field component={TextInput} name="cardNumber" type="number" />
        </CardPaymentFormStyle.FieldContainer>
        <CardPaymentFormStyle.FieldContainer>
          <CardPaymentFormStyle.FieldTitle>
            Card type *
          </CardPaymentFormStyle.FieldTitle>
          <CardPaymentFormStyle.DropdownWrapper>
            <Field
              component={Dropdown}
              name="cardType"
              props={{
                options: mock.optionsCardType,
                placeholder: 'Select card',
              }}
            />
            <CardPaymentFormStyle.LogoWrapper>
              <CardPaymentFormStyle.Logo>
                <Visa />
              </CardPaymentFormStyle.Logo>
              <CardPaymentFormStyle.Logo>
                <img src={MasterCard} alt="MaterCard" />
              </CardPaymentFormStyle.Logo>
            </CardPaymentFormStyle.LogoWrapper>
          </CardPaymentFormStyle.DropdownWrapper>
        </CardPaymentFormStyle.FieldContainer>
        <CardPaymentFormStyle.FieldContainer>
          <CardPaymentFormStyle.FieldTitle>
            Expiry date *
          </CardPaymentFormStyle.FieldTitle>
          <CardPaymentFormStyle.DropdownWrapper>
            <Field
              component={Dropdown}
              name="ExpiryMonth"
              props={{
                options: mock.optionsExpiryMonth,
                placeholder: 'What Month?',
              }}
            />
            <Field
              component={Dropdown}
              name="ExpiryYear"
              props={{
                options: mock.optionsExpiryYear,
                placeholder: 'What Year?',
              }}
            />
          </CardPaymentFormStyle.DropdownWrapper>
        </CardPaymentFormStyle.FieldContainer>
        <CardPaymentFormStyle.FieldContainer>
          <CardPaymentFormStyle.FieldTitle>
            CVC number *
          </CardPaymentFormStyle.FieldTitle>
          <CardPaymentFormStyle.CVC>
            <Field component={TextInput} name="cvcNumber" type="number" />
            <img src={CVC} alt="CVC code" />
          </CardPaymentFormStyle.CVC>
        </CardPaymentFormStyle.FieldContainer>
      </CardPaymentFormStyle.FieldsContainer>
      <CardPaymentFormStyle.ButtonWrapper>
        <Button>PAY NOW</Button>
      </CardPaymentFormStyle.ButtonWrapper>
    </CardPaymentFormStyle.Form>
  );
};

export default reduxForm({ form: 'CardPayment' })(CardPaymentForm);
