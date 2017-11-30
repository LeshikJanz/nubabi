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

  > ${MainLabels} {
    position: absolute;
    width: 100%;
    height: 80%;
    justify-content: center;
    flex-direction: column;
    align-items: center;

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
    }
  }
`;

const ProfileImage = styled.img`
  max-width: 100%;
  border-radius: 0 0 45% 45%;
`;

type Props = {
  activity: ActivityConnection,
  theme: any,
};

const ActivityProfile = ({ activity }: Props) => {
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
          fill: ${props => activity.isFavorite && props.theme.colors.open.red0};
        }
      }

      &:nth-child(2) {
        margin: 0 40px;
      }

      &:last-child {
        g {
          fill: ${props => activity.isFavorite && props.theme.colors.open.red0};
        }
      }
    }
  `;

  const handleFavorite = () => null;

  const handlePrint = () => null;

  const onClick = () => {
    console.log('onCLick');
  };

  return (
    <ProfileWrapper>
      <MainLabels>
        <ProfileLabel>{activity.name}</ProfileLabel>
        <Button type="button" onClick={onClick}>
          {activity.skillArea.name}
        </Button>
      </MainLabels>
      <ProfileImage src={activity.skillArea.image.large.url} />
      <Actions>
        <FavoriteIcon onClick={handleFavorite} />
        <SeparatorIcon />
        <PrintIcon onClick={handlePrint} />
      </Actions>
    </ProfileWrapper>
  );
};

export default ActivityProfile;
