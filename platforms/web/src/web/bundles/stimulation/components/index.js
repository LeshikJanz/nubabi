// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import Navbar from 'web/components/Navbar';

type Props = {
  baby: any,
};

export const Stimulation = ({ baby }: Props) => {
  const Wrapper = styled(Flex)``;

  return (
    <Wrapper>
      <Navbar {...baby} />
    </Wrapper>
  );
};
