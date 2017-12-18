import styled from 'styled-components';
import { Section } from 'web/elements';

export const Wrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  background: ${props => props.theme.bg.panel};
  padding-bottom: 50px;
  min-height: 100%;
`;

export const AppContent = styled(Section)`
  max-width: 1200px;
  min-width: 768px;
  margin: 0 auto;
  margin-top: 2px;
  height: 100%;
  display: flex;
  justify-content: center;
`;
