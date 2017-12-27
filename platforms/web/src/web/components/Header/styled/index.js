import { Box, Flex } from 'grid-styled';
import styled from 'styled-components';
import { Menu } from 'web/elements';
import PersonIcon from 'web/assets/images/icons/person.svg';

export const BabySelect = styled.div`
  margin: -12px 0 0 0;
  export: ${props => props.theme.colors.open.black1};
  font-family: ${props => props.theme.text.fontFamily};
  font-size: 16px;
  position: relative;
`;

export const BabySelected = styled.span`
  cursor: pointer;
  margin: 10px 0 0 -15px;
  font-family: sans-serif;
  font-weight: 300;
  color: #3d414b;

  &:after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.colors.open.gray2};
  }
`;

export const BabiesListWrapper = styled(Menu)`
  padding-top: 30px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: ${props => props.theme.shadows.light};
`;

export const BabiesList = styled(Menu)`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const BabiesListItem = styled(Menu.Link)`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: center;
  height: 70px;

  margin: 0;
  font-family: sans-serif;
  color: ${props => props.theme.colors.open.gray3};
  cursor: pointer;
  font-family: ${props => props.theme.text.fontFamily};
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:hover > div:last-child {
    color: ${props => props.theme.colors.primary};
  }
`;

export const BabyProfileImage = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 53px;
  transform: translate(-50%, -50%);
  border: 8px solid ${props => props.theme.colors.white};
  border-radius: 100%;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center;
  z-index: 3;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
`;

export const PersonDefaultIcon = styled(Flex)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #e9ecf4;
  background-color: #f8f9fc;
  position: relative;
`;

export const BabyImage = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  height: 42px;
  width: 42px;
  border-radius: 50%;
`;

export const BabyImageContainer = styled(Box)`
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 10px;
  border-radius: 50%;
  border: 2px solid
    ${props =>
      props.isCurrent ? 'rgba(233, 49, 84, .6)' : props.theme.colors.white};

  > img {
    height: 100%;
    max-width: 100%;
  }
`;

export const BabyName = styled(Box)`
  font-size: 15px;
  font-weight: 400;
  text-decoration: none;
  font-family: sans-serif;
  font-weight: 300;
  color: ${props => (props.isCurrent ? props.theme.colors.primary : '#3D414B')};
`;

export const modalStyles = {
  overlay: {
    zIndex: 1,
    background: 'none',
    position: 'absolute',
  },
  content: {
    minWidth: '330px',
    position: 'absolute',
    top: '51px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    background: 'none',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    transform: 'translateX(-50%)',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.25)',
  },
};

export const DefaultIcon = styled(PersonIcon)`
  opacity: 0.5;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const AddItem = styled(BabiesListItem)`
  font-family: sans-serif;
  border-top: 1px solid #e9ecf4;
  color: #748294;
  font-weight: 300;
  font-size: 15px;

  & > button {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

export const BabyProfileDefaultIconCover = styled(Flex)`
  width: 70px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 53px;
  transform: translate(-50%, -50%);
  border: 8px solid ${props => props.theme.colors.white};
  border-radius: 100%;
  z-index: 99;
  background-color: #f8f9fc;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
`;
