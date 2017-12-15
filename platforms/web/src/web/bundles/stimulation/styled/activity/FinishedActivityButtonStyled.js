import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
  justify-content: center;
  margin-top: 24px;

  > div {
    margin: 0 8px;
  }
`;

export const Button = styled(Flex)`
  width: 70%;
  align-items: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  padding: 13px;
  text-align: center;
  cursor: pointer;
  height: 80px;
  justify-content: space-around;

  > svg {
    width: 46px;
    height: 100%;
  }

  > div:last-child {
    width: 90px;
    min-height: 30px;
  }

  > button {
    border-radius: 100px;
    background-color: #ea3154;
    color: #fff;
    border: none;
    font-size: 14px;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
`;

export const MainText = styled.div`
  color: ${props => props.theme.colors.open.gray45};
  font-size: 13px;
  line-height: 1.31;
`;

export const AdditionalText = styled.div`
  color: ${props => props.theme.colors.open.gray74};
  font-size: 13px;
  line-height: 1.31;
`;
