// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { TextInput } from 'web/elements';

type Props = {
  isSectionVisible: boolean,
  visibleOnChange: Function,
  pwdFields: Array<{
    name: string,
    value: string,
    placeholder: string,
    type: string,
  }>,
};

const VisibilityLabel = styled.span`
  font-size: 11px;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const Label = styled.span`
  color: ${props => props.theme.colors.gray};
  font-family: sans-serif;
  font-size: 11px;
  font-weight: 300;
`;

const PasswordFields = styled(Flex)`
  display: ${props => (props.isvisible ? 'flex' : 'none')};
  flex-direction: column;
`;

const PwdChangerContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding-top: 20px;
`;

const renderPwdFields = (field, i) => {
  return (
    <InputContainer key={i}>
      <Label>{field.placeholder.toUpperCase()}</Label>
      <TextInput inputType={field.type} value={field.value} />
    </InputContainer>
  );
};

const PwdChanger = ({
  isSectionVisible,
  visibleOnChange,
  pwdFields,
}: Props) => {
  return (
    <PwdChangerContainer>
      <VisibilityLabel onClick={() => visibleOnChange(!isSectionVisible)}>
        {isSectionVisible ? 'Cancel' : 'Change Password'}
      </VisibilityLabel>
      <PasswordFields isvisible={isSectionVisible}>
        {pwdFields.map((field, i) => renderPwdFields(field, i))}
      </PasswordFields>
    </PwdChangerContainer>
  );
};

export default PwdChanger;
