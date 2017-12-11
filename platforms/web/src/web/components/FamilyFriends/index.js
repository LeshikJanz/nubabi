// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import PlusIco from 'web/assets/images/icons/plus_ico.svg';
import { Relative } from 'web/elements';

const FamilyFriensContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
`;

const Header = styled(Flex)`
  background-color: ${props => props.theme.colors.lightgrey};
  flex-direction: column;
  width: 100%;
  padding: 25px 30px;
  height: 120px;
  position: relative;
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.label};
  font-weight: 300;
  font-size: 18px;
  margin-top: 0;
`;

const SubTitle = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-size: 16px;
  font-weight: 300;
`;

const Add = styled(Flex)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.primary};
  position: absolute;
  box-shadow: 0 1px 7px -2px ${props => props.theme.colors.black1};
  margin: auto;
  top: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

const RelativesList = styled(Flex)`
  flex-direction: column;
  padding: 20px 30px 30px 30px;
`;

const Plus = styled(PlusIco)`
  position: absolute;
  margin: auto;
  top: 4px;
  bottom: 0;
  left: 0;
  right: 2px;
`;

const relatives = [
  {
    name: 'Leonard Massey',
    status: 'Uncle',
    isPending: false,
    avatar: '',
  },
  {
    name: 'Andy Jonson',
    status: 'Grandpa',
    isPending: true,
    avatar: '',
  },
  {
    name: 'Miranda Jonson',
    status: 'Grandma',
    isPending: true,
    avatar: '',
  },
];

const FamilyFriends = () => {
  return (
    <FamilyFriensContainer>
      <Header>
        <Title>Invite family & friends</Title>
        <SubTitle>
          Allow important people to view your baby’s weekly activities and
          memories.
        </SubTitle>
        <Add>
          <Plus />
        </Add>
      </Header>
      <RelativesList>
        {relatives.map((item, i) => <Relative key={i} {...item} />)}
      </RelativesList>
    </FamilyFriensContainer>
  );
};

export default FamilyFriends;
