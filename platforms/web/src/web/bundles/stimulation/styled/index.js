import { Flex } from 'grid-styled';
import styled, { css } from 'styled-components';

export const media = {
  handheld: (...args) => css`
    @media (max-width: 1200px) {
      ${css(...args)};
    }
  `,
};

export const Wrapper = styled(Flex)`
  margin-top: 40px;
  background: ${props => props.theme.bg.panel};
  flex-direction: column;
`;

export const Buttons = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 34px;
  ${media.handheld`
    justify-content: center;
  `};
`;
