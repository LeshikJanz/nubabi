import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Title } from "web/elements";

const Wrapper = styled.div`padding: 10px;`;

const NotFound = () => (
  <Wrapper>
    <Helmet>
      <title>Nubabi | Not Found</title>
    </Helmet>
    <Title>404 Page Not Found</Title>
    <h4>We are sorry but the page you are looking for does not exist.</h4>
  </Wrapper>
);

export default NotFound;
