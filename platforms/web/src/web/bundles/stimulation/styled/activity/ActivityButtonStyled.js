import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
  width: 165px;
  height: 139.6px;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: ${props => props.theme.shadows.panel};
  padding: 13px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }

  > svg {
    width: 46px;
  }

  > div:last-child {
    width: 90px;
    min-height: 30px;
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
