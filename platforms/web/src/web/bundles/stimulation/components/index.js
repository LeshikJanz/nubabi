// @flow
import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import NavBar from 'web/components/Navbar';

type Props = {
  baby: any,
};

const Stimulation = ({ baby }: Props) => {
  const Wrapper = styled(Flex)``;

  return (
    <Wrapper>
      <h1>Stimulation</h1>
    </Wrapper>
  );
};

export default Stimulation;
