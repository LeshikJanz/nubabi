// @flow
import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const IconWrapper = styled.div`
  position: absolute;
  width: 90px;
  height: 100px;
  left: 50%;
  top: 20px;
  transform: translate(-50%, -50%);
  border: 8px solid rgb(234, 238, 248);
  border-radius: 100%;
`;

export const Wrapper = styled(Flex)`
  flex-direction: column;
  position: relative;
  margin-top: 62px;
  padding-bottom: 30px;
  background-color: #eaeef8;

  > svg {
    width: 69px;
    height: 69px;
  }
`;

export const Content = styled.div`
  background-color: #eaeef8;
  box-shadow: 0 -1px 0 0 #e9ecf4;
  text-align: center;
  padding-top: 60px;
`;

export const SkittlesName = styled.div`
  ${props => props.theme.text.default};
  color: #ea3154;
  position: relative;
`;

export const Text = styled.div`
  ${props => props.theme.text.default};
`;
