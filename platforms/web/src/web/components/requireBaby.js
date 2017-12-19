// @flow
import React from 'react';
import { branch, renderComponent } from 'recompose';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  height: 100%;
  width: 100%;
`;

const ImageBackground = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.source});
  background-size: cover;
`;

const Text = styled.h1`
  width: 100%;
  text-align: center;
  color: #fff;
`;

export const RequireBabyView = () => (
  <Wrapper>
    <ImageBackground
      source={require('core/images/growth-what-you-need-to-know.jpg')}
    >
      <Text size={4} marginTop={1}>
        You need to create or select a baby first.
      </Text>
    </ImageBackground>
  </Wrapper>
);

const requireBaby = branch(
  props => !props.currentBabyId,
  renderComponent(RequireBabyView),
);

export default requireBaby;
