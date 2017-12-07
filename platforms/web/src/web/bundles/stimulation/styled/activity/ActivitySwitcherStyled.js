import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);

  .separator {
    height: 60px;
  }
`;

export const Text = styled(Flex)`
  flex-direction: column;

  > div:first-child {
    font-size: 14px;
    color: ${props => props.theme.colors.open.gray2};
  }

  > div:last-child {
    font-size: 14px;
    color: ${props => props.theme.colors.open.gray45};
  }
`;

export const Separator = styled.div`
  width: 2px;
  height: 60px;
  background-color: #e9ecf4;
`;

export const PreviousElement = styled(Flex)`
  align-items: center;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }

  > svg {
    margin: 0 15px;
  }
`;

export const NextElement = styled(Flex)`
  align-items: center;
  cursor: pointer;
  width: 100%;
  justify-content: flex-end;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }

  > svg {
    margin: 0 15px;
    transform: rotate(180deg);
  }
`;
