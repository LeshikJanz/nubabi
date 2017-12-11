// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import RelativeDefaultIcon from 'web/assets/images/icons/elipsis.svg';
import CloseIcon from 'web/assets/images/icons/close_icon.svg';

type Props = {
  name: string,
  status: string,
  isPending: boolean,
  avatar: string,
};

const RelativeItem = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 86px;
  flex-direction: row;
  position: relative;

  &:hover div:last-child {
    display: flex;
  }
`;

const AvatarBox = styled(Flex)`
  height: 100%;
  width: 70px;
  align-items: center;
  justify-content: flex-start;
`;

const Avatar = styled(Flex)`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.lightgrey};
  align-items: center;
  justify-content: center;
`;

const Info = styled(Flex)`
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const Name = styled.span`
  margin-bottom: 5px;
  font-weight: 300;
  color: ${props =>
    props.isPending ? props.theme.colors.gray : props.theme.colors.label};
`;

const Status = styled.span`
  color: ${props => props.theme.colors.gray};
  font-size: 10px;
`;

const Close = styled(Flex)`
  position: absolute;
  right: 0;
  cursor: pointer;
  top: 27px;
  display: none;
`;

const Relative = (props: Props) => {
  const { avatar, name, status, isPending } = props;

  return (
    <RelativeItem>
      <AvatarBox>
        {!avatar &&
          !avatar.length && (
            <Avatar>
              <RelativeDefaultIcon />
            </Avatar>
          )}
      </AvatarBox>
      <Info>
        <Name isPending={isPending}>
          {name}
          {isPending && ' (Pending)'}
        </Name>
        <Status>{status}</Status>
      </Info>
      <Close>
        <CloseIcon />
      </Close>
    </RelativeItem>
  );
};

export default Relative;
