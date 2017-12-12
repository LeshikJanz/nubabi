// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { TextInput } from 'web/elements';

type Props = {
  infoFields: Array<{
    type: string,
    placeholder: string,
    value: string,
  }>,
};

const InfoChangerContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
`;

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Label = styled.span`
  color: ${props => props.theme.colors.gray};
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
`;

const renderField = (item, i) => {
  return (
    <InputContainer key={i}>
      <Label>{item.placeholder.toUpperCase()}</Label>
      <TextInput inputType={item.type} value={item.value} />
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
