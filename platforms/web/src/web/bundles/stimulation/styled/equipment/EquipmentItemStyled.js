import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  padding: 15px 20px;
`;

export const SquareCheckbox = styled.input`
  ${props => props.theme.checkbox.squared};
`;

export const Text = styled.div`
  margin-left: 13px;

  div:first-child {
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.theme.colors.gray4};
  }
  div:last-child {
    font-size: 14px;
    line-height: 1.71;
    color: ${props => props.theme.colors.gray3};
  }
`;
