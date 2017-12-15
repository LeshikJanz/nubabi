// @flow
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Flex } from 'grid-styled';
import ArrowRight from 'web/assets/images/icons/arrowRight.svg';
import { path } from 'ramda';

type Props = {
  label: string,
  isactive: number,
  itemId: string,
  user: {
    firstName: string,
    lastName: string,
    avatar: {
      thumb: {
        url: string,
      },
    },
  },
};

const CustomLink = styled(Link)`
  height: 90px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  flex-direction: row;
  background-color: ${props =>
    props.isactive ? props.theme.colors.panel : props.theme.colors.white};
  border-left: 2px solid
    ${props =>
      props.isactive ? props.theme.colors.primary : props.theme.colors.white};

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

const Image = styled.div`
  background-image: url(${props => props.image});
  border-radius: 50%;
  background-size: cover;
  width: 50px;
  height: 50px;
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
  font-weight: 300;
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
  const { label, isactive, user, itemId } = props;

  return (
    <CustomLink to="/settings" isactive={isactive} key={itemId}>
      <AvatarBox>
        <Image image={path(['avatar', 'thumb', 'url'], user)} />
      </AvatarBox>
      <UserNameBox>
        <UserName>
          {`${path(['firstName'], user)}  ${path(['lastName'], user)}`}
          <Arrow />
        </UserName>
        <RouteLabel>{label}</RouteLabel>
      </UserNameBox>
    </CustomLink>
  );
};

export default MenuProfileDetails;
