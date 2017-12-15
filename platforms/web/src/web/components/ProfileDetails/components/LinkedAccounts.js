// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

type Props = {
  linkedAccounts: Array<{
    name: string,
    network: string,
    icon: mixed,
  }>,
};

const LinkedAccountsContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding-top: 20px;
`;

const Title = styled.h3`
  font-weight: 300;
  font-size: 18px;
  margin: 0;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Account = styled(Flex)`
  align-items: center;
  position: relative;
  margin-top: 20px;
`;

const Name = styled.span``;

const UnlinkLabel = styled.span`
  position: absolute;
  right: 0;
  color: ${props => props.theme.colors.gray};
  font-size: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;

const renderAccount = (item, i) => {
  return (
    <Account key={i}>
      <Icon src={item.icon} />
      <Name>{item.name}</Name>
      <UnlinkLabel>Unlink</UnlinkLabel>
    </Account>
  );
};

const LinkedAccounts = ({ linkedAccounts }: Props) => {
  return (
    <LinkedAccountsContainer>
      <Title>Linked Accounts</Title>
      {linkedAccounts.map((item, i) => renderAccount(item, i))}
    </LinkedAccountsContainer>
  );
};

export default LinkedAccounts;
