import React from 'react';
import { Title } from 'web/elements';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
`;

export const Home = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Nubabi | Home</title>
      </Helmet>
      <Title>Home</Title>
    </Wrapper>
  );
};

export default Home;
