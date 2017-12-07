import { Flex, Box } from 'grid-styled';
import styled, { css } from 'styled-components';

export const media = {
  handheld: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)};
    }
  `,
};

export const ListWrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  margin-left: ${props => props.theme.margins.appLeft};
  margin-right: ${props => props.theme.margins.appRight};
`;

export const Buttons = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  ${media.handheld`
    justify-content: center;
  `};
`;

export const ListHeader = styled(Flex)`
  margin: 54px 0 15px;
`;

export const ListTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;
