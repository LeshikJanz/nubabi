// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex } from 'grid-styled';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';

type Props = {
  label: string,
  avatar: React.Component<*>,
  isActive: boolean,
};

const CustomLink = styled(Link)`
  height: 90px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: row;
  background-color: ${props =>
    props.isActive ? props.theme.colors.panel : props.theme.colors.white};
  border-left: 2px solid
    ${props =>
      props.isActive ? props.theme.colors.primary : props.theme.colors.white};

  &:hover {
    text-decoration: none;
    background-color: ${props => props.theme.colors.panel};
  }
`;

const AvatarBox = styled(Flex)`
  height: 100%;
  width: 90px;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
`;

const UserNameBox = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
`;

const UserName = styled.span`
  color: ${props => props.theme.colors.label};
  margin-bottom: 5px;
  font-size: 17px;
  font-weight: 400;
  position: relative;
  width: 100%;
`;

const RouteLabel = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-size: 14px;
  font-weight: 300;
`;

const Arrow = styled(ArrowRight)`
    position: absolute;
    right: 0;
    bottom 0;
    right: 30px;
    bottom: 2px;
`;

const MenuProfileDetails = (props: Props) => {
  const { label, avatar, isActive } = props;

  return (
    <CustomLink to="/settings" isActive={isActive}>
      <AvatarBox>
        <Image src={avatar} />
      </AvatarBox>
      <UserNameBox>
        <UserName>
          Savannah Cooper <Arrow />
        </UserName>
        <RouteLabel>{label}</RouteLabel>
      </UserNameBox>
    </CustomLink>
  );
};

export default MenuProfileDetails;
