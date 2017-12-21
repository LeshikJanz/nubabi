import styled from 'styled-components';
import { Flex } from 'grid-styled';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  padding: 28px 15px;
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-top: none;
  background-color: #fff;
`;

export const Heading = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const HeadingText = styled.div`
  ${props => props.theme.text.h3};
`;

export const Text = styled.div`
  padding-top: 10px;
  ${props => props.theme.text.default};
`;

export const Icon = styled.img`
  border-radius: 100%;
  max-height: 40px;
`;

export const TooltipWrapper = styled.div`
  position: relative;

  > svg {
    cursor: pointer;
  }
`;

export const FooterText = styled.div`
  ${props => props.theme.text.small};
`;

export const Footer = styled(Flex)`
  padding: 40px 0 15px 0;
  justify-content: space-between;
  align-items: center;

  > svg {
    cursor: pointer;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
`;
