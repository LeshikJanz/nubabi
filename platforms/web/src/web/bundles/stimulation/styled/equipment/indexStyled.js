import styled from 'styled-components';
import { Flex } from 'grid-styled';

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
  margin-top: 30px;

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

export const Text = styled.div`
  font-size: 18px;
  text-align: center;
  color: #454d57;
  line-height: 2;
`;

export const CalendarText = styled.div`
  color: #748294;

  > svg {
    margin-right: 10px;
    margin-bottom: 5px;
  }
`;
