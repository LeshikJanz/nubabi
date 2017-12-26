// @flow
import React from 'react';
import styled from 'styled-components';
import Bitmap from 'web/assets/images/Bitmap.png';

const text =
  'PLEASE NOTE: To finalise your payment, you may be guided to your banks 3D Secure process. This is completely safe, and is simply used to authenticate and protect your information';

const Secure = () => {
  return (
    <Box>
      <img src={Bitmap} alt="Bitmap" />
      <Text>{text}</Text>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-self: stretch;
  padding: 20px;
  background: #f8f9fc;
  border: 1px solid #cfd6df;
  border-radius: 4px;
  align-items: center;
`;

export const Text = styled.div`
  color: #748294;
  font-size: 12px;
  margin-left: 20px;
`;

export default Secure;
