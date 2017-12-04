// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { ActivityConnection } from 'core/types';
import FavoriteIcon from 'web/assets/images/icons/favorite.svg';
import SeparatorIcon from 'web/assets/images/icons/separator.svg';
import PrintIcon from 'web/assets/images/icons/print.svg';
import { Button } from 'web/elements';

const ProfileLabel = styled.div``;

const MainLabels = styled(Flex)``;

const ProfileWrapper = styled(Flex)`
  flex-direction: column;
  border: solid 1px ${props => props.theme.colors.open.white2};
  position: relative;
  background-color: #fff;

  > ${MainLabels} {
    position: absolute;
    width: 100%;
    height: 80%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 2;

    ${ProfileLabel} {
      font-size: 22px;
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    button {
      background-color: #33b7eb;
      color: #fff;
      border: none;
      font-size: 12px;
      margin-top: 11px;
      cursor: default;
    }
  }
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0.2;
  border-radius: 0 0 45% 45%;
`;

const ProfileImageContainer = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  max-width: 100%;
  border-radius: 0 0 45% 45%;
`;

const Actions = styled(Flex)`
  justify-content: center;
  padding: 15px;

  > svg {
    cursor: pointer;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }

    &:first-child {
      g {
        fill: ${props =>
          JSON.parse(props.isfavorite) && props.theme.colors.open.red0};
      }
    }

    &:nth-child(2) {
      margin: 0 40px;
    }
  }
`;

type Props = {
  activity: ActivityConnection,
  isFavorite: boolean,
  handleFavorite: Function,
  handlePrint: Function,
};

const ActivityProfile = ({
  activity,
  isFavorite,
  handleFavorite,
  handlePrint,
}: Props) => (
  <ProfileWrapper>
    <MainLabels>
      <ProfileLabel>{activity.name}</ProfileLabel>
      <Button type="button">{activity.skillArea.name}</Button>
    </MainLabels>
    <ProfileImageContainer>
      <Backdrop />
      <ProfileImage src={activity.skillArea.image.large.url} />
    </ProfileImageContainer>
    <Actions isfavorite={`${isFavorite}`}>
      <FavoriteIcon onClick={handleFavorite} />
      <SeparatorIcon />
      <PrintIcon onClick={handlePrint} />
    </Actions>
  </ProfileWrapper>
);

export default ActivityProfile;
