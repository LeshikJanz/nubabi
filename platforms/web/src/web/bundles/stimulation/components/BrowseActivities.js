// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';
import indoorActivity from 'web/assets/images/indoor-activity.png';
import outdoorActivity from 'web/assets/images/outdoor-activity.png';
import iconMappings from 'web/common/iconMappings';
import { SkillAreaConnection } from 'core/types';
import { INDOOR_CATEGORY_ID, OUTDOOR_CATEGORY_ID } from './constants/index';

const categoryImageWidth = '328px';
const skillWidth = '200px';

const Wrapper = styled(Flex)`
  flex-direction: column;
  margin-top: 50px;
`;

const CategoryLabel = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 15px;
  color: ${props => props.theme.colors.open.black0};
`;

const Category = styled(Flex)`
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

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  max-width: ${categoryImageWidth};
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0.2;
  border-radius: 5%;
`;

const Categories = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
`;

const Skills = styled(Flex)`
  flex-wrap: wrap;
  justify-content: center;
`;

const SkillIcon = styled.div``;

const Skill = styled(Flex)`
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

type Props = {
  skillAreas: SkillAreaConnection[],
  handleSkillFilter: Function,
  handleCategoryFilter: Function,
};

const BrowseActivities = ({
  skillAreas,
  handleSkillFilter,
  handleCategoryFilter,
}: Props) => (
  <Wrapper>
    <CategoryLabel>By Category</CategoryLabel>
    <Categories>
      <Category onClick={() => handleCategoryFilter(INDOOR_CATEGORY_ID)}>
        <label>Indoors</label>
        <Backdrop />
        <img src={indoorActivity} alt="indoors" />
      </Category>
      <Category onClick={() => handleCategoryFilter(OUTDOOR_CATEGORY_ID)}>
        <label>Outdoors</label>
        <Backdrop />
        <img src={outdoorActivity} alt="outdoors" />
      </Category>
    </Categories>
    <CategoryLabel>Development Skills</CategoryLabel>
    <Skills>
      {skillAreas.edges.map(({ node }) => (
        <Skill key={node.id} onClick={() => handleSkillFilter(node.id)}>
          <SkillIcon>
            <img src={iconMappings(node.icon)} alt={node.label} />
          </SkillIcon>
          <label>{node.name}</label>
        </Skill>
      ))}
    </Skills>
  </Wrapper>
);

export default BrowseActivities;
