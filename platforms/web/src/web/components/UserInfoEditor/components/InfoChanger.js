// @flow
import * as React from 'react';
import { TextInput } from 'web/elements';
import { Field } from 'redux-form';
import { Label, InputContainer, InfoChangerContainer } from '../styled';

type Props = {
  infoFields: Array<{
    type: string,
    placeholder: string,
    value: string,
  }>,
};

const renderField = (item, i) => {
  return (
    <InputContainer key={i}>
      <Label>{item.placeholder.toUpperCase()}</Label>
      <Field name={item.type} component={TextInput} type="text" />
    </InputContainer>
  );
};

const InfoChanger = ({ infoFields }: Props) => {
  return (
    <InfoChangerContainer>
      {infoFields.map((item, i) => renderField(item, i))}
    </InfoChangerContainer>
  );
};

export default InfoChanger;
