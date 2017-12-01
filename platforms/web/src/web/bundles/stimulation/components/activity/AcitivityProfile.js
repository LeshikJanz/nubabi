// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import { ActivityConnection } from 'core/types';

const ProfileWrapper = styled(Flex)`
  flex-direction: column;
  background-color: #fff;
`;

const ProfileImage = styled.img``;

type Props = {
  activity: ActivityConnection,
};

const ActivityProfile = ({ activity }: Props) => (
  <ProfileWrapper>
    <ProfileImage src={activity.skillArea.image.large.url} />
  </ProfileWrapper>
);

export default ActivityProfile;
