import styled from 'styled-components';
import { Flex } from 'grid-styled';

const categoryImageWidth = '290px';
const laptopWidth = '1350px';
const skillWidth = '200px';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  padding: 0 1%;

  @media (max-width: ${laptopWidth}) {
    padding: 0;
  }
`;

export const CategoryLabel = styled.div`
  font-size: 18px;
  text-align: center;
  color: ${props => props.theme.colors.open.black0};
`;

export const Category = styled(Flex)`
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.9;
  margin: 10px;
  box-shadow: ${props => props.theme.shadows.light};

  &:hover {
    opacity: 1;
  }

  label {
    position: absolute;
    cursor: pointer;
    color: #fff;
    font-size: 24px;
    z-index: 1;
    letter-spacing: 2px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  img {
    max-width: ${categoryImageWidth};
  }
`;

export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  max-width: ${categoryImageWidth};
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0.2;
  border-radius: 5%;
`;

export const Categories = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: ${laptopWidth}) {
    justify-content: center;
  }
`;

export const Skills = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: ${laptopWidth}) {
    justify-content: center;
  }
`;

export const SkillIcon = styled.div``;

export const Skill = styled(Flex)`
  position: relative;
  border-radius: 5%;
  background-color: #fff;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: ${skillWidth};
  height: 130px;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.panel};

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }

  label {
    padding-bottom: 5px;
    cursor: pointer;
  }

  margin: 10px;

  > ${SkillIcon} {
    background-color: #fde4e9;
    padding: 5px;
    border-radius: 50%;
    height: 48px;

    > img {
      max-width: 40px;
      max-height: 40px;
      padding: 5px;
    }
  }

  &:nth-child(even) ${SkillIcon} {
    background-color: #edf0f9;
  }
`;
