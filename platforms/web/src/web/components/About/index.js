// @flow
import React from 'react';
import { Title } from 'web/elements';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
`;

export const About = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Nubabi | About</title>
      </Helmet>
      <Title>About</Title>
    </Wrapper>
  );
};

export default About;
