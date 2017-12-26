import React from 'react';
import styled from 'styled-components';

const InfoBox = () => {
  return (
    <Info>
      <div>©2017 Nubabi. About Us • FAQ & Support • Contact Us • Log Out </div>
      <div>
        All rights reserved. Use of this website is regulated by our website
        Terms of Use and Privacy Policy.
      </div>
    </Info>
  );
};

const Info = styled.div`
  position: absolute;
  bottom: -115px;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div:first-child {
    border-bottom: 1px solid #748294;
  }

  & > div {
    color: #748294;
    font-size: 12px;
    padding: 10px 5px;
  }
`;

export default InfoBox;
