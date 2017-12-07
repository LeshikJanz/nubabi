import styled from 'styled-components';
import { Flex } from 'grid-styled';

export const Label = styled.div``;

export const MainLabels = styled(Flex)``;

export const Wrapper = styled(Flex)`
  flex-direction: column;
  border: solid 1px ${props => props.theme.colors.open.white2};
  position: relative;
  background-color: #fff;

  > ${MainLabels} {
    position: absolute;
    width: 100%;
    height: 80%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    z-index: 2;

    ${Label} {
      font-size: 22px;
      color: #ffffff;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    button {
      background-color: #33b7eb;
      color: #fff;
      border: none;
      font-size: 12px;
      margin-top: 11px;
      cursor: default;
    }
  }
`;

export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0.2;
  border-radius: 0 0 75% 75%;
`;

export const ImageContainer = styled(Flex)`
  justify-content: center;
  align-items: flex-start;
  position: relative;
  height: 250px;
`;

export const Image = styled(Flex)`
  border-radius: 0 0 75% 75%;
  height: 100%;
  width: 100%;
  transform: scale(1);
  background-size: cover;
  flex: 1;
  -webkit-align-self: stretch;
  -ms-flex-item-align: stretch;
  background: url(${props => props.src}) no-repeat;
  background-size: cover;
  background-color: #fff;
  transform: scale(1);
`;

export const Actions = styled(Flex)`
  justify-content: center;
  padding: 15px;

  > svg {
    cursor: pointer;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }

    &:first-child {
      g {
        fill: ${props =>
          JSON.parse(props.isfavorite) && props.theme.colors.open.red0};
      }
    }

    &:nth-child(2) {
      margin: 0 40px;
    }
  }
`;
