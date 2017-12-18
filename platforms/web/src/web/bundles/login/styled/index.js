import styled from 'styled-components';
import { Flex } from 'grid-styled';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1166px;
`;

export const UserDataInputContainer = styled(Flex)`
  background-color: white;
  flex-direction: row;
  border-radius: 4px;
  box-shadow: 0 1px 9px -1px ${props => props.theme.colors.gray};
  overflow: hidden;
  height: 334px;
  position: relative;
  margin: 35px 0px 20px 0;
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
