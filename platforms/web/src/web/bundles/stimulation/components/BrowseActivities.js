// @flow
import type { SkillAreaConnection } from 'core/types';
import React from 'react';
import indoorActivity from 'web/assets/images/indoor-activity.png';
import outdoorActivity from 'web/assets/images/outdoor-activity.png';
import iconMappings from 'web/common/iconMappings';
import { INDOOR_CATEGORY_ID, OUTDOOR_CATEGORY_ID } from '../constants/index';
import * as BrowseActivitiesStyled from '../styled/BrowseActivitiesStyled';

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
  <BrowseActivitiesStyled.Wrapper>
    <BrowseActivitiesStyled.CategoryLabel>
      By Category
    </BrowseActivitiesStyled.CategoryLabel>
    <BrowseActivitiesStyled.Categories>
      <BrowseActivitiesStyled.Category
        onClick={() => handleCategoryFilter(INDOOR_CATEGORY_ID)}
      >
        <label>Indoors</label>
        <BrowseActivitiesStyled.Backdrop />
        <img src={indoorActivity} alt="indoors" />
      </BrowseActivitiesStyled.Category>
      <BrowseActivitiesStyled.Category
        onClick={() => handleCategoryFilter(OUTDOOR_CATEGORY_ID)}
      >
        <label>Outdoors</label>
        <BrowseActivitiesStyled.Backdrop />
        <img src={outdoorActivity} alt="outdoors" />
      </BrowseActivitiesStyled.Category>
    </BrowseActivitiesStyled.Categories>
    <BrowseActivitiesStyled.CategoryLabel>
      Development Skills
    </BrowseActivitiesStyled.CategoryLabel>
    <BrowseActivitiesStyled.Skills>
      {skillAreas.edges.map(({ node }) => (
        <BrowseActivitiesStyled.Skill
          key={node.id}
          onClick={() => handleSkillFilter(node.id)}
        >
          <BrowseActivitiesStyled.SkillIcon>
            <img src={iconMappings(node.icon)} alt={node.label} />
          </BrowseActivitiesStyled.SkillIcon>
          <label>{node.name}</label>
        </BrowseActivitiesStyled.Skill>
      ))}
    </BrowseActivitiesStyled.Skills>
  </BrowseActivitiesStyled.Wrapper>
);

export default BrowseActivities;
