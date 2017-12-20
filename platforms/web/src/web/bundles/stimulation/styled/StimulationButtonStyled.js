import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { LIGHT_GREY } from "core/themes/defaultTheme";

export const Text = styled.div``;

export const Icon = styled.div``;

export const Wrapper = styled(Flex)`
  border-radius: 4px;
  cursor: pointer;
  align-items: center;
  height: 68px;
  width: 23%;
  min-width: 130px;
  padding: 17px;
  margin: 15px 5px 0;
  box-shadow: ${props => props.theme.shadows.panel};
  justify-content: center;
  background-color: ${props => JSON.parse(props.active) ? props.theme.shadows.panel : '#fff'};
  border-top: 3px solid ${props => JSON.parse(props.active) ? props.theme.colors.primary : 'transparent'};

  ${Text} {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 0.9px;
    color: ${props => JSON.parse(props.active) ? props.theme.colors.primary : props.theme.colors.label};
  }
  
  ${Icon} {
    justify-content: center;

    > svg {
      max-height: 25px;
      max-width: 25px;
      margin-right: 10px;
      
      > g > g, > g > path, > path {
        fill: ${props => JSON.parse(props.active) ? props.theme.colors.primary : LIGHT_GREY};
      }
    }
  }
  
  &:hover {
    ${Text} {
      color: ${props => props.theme.colors.primary};
      text-decoration: underline;
      transition: all .2s;
    }
    ${Icon} > svg {
      > g > g, > g > path, > path {
        fill: ${props => props.theme.colors.primary};
        transition: fill .2s;
      }
    }
  }
`;


