import React from 'react';
import { Title } from 'web/elements';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 10px;
`;

export default () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Nubabi | Test</title>
      </Helmet>
      <Title>Test</Title>
    </Wrapper>
  );
};
