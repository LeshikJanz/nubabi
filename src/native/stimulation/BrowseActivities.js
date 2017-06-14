// @flow
import type { SkillArea, LayoutProps } from '../../common/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { compose, path } from 'ramda';
import { graphql, gql } from 'react-apollo';
import mapEdgesToProp from '../shared/mapEdgesToProp';
import { Box, Text, displayLoadingState, withLayout } from '../components';
import BrowseActivitiesButton from './BrowseActivitiesButton';
import { toGlobalId } from 'graphql-relay';

type Props = {
  skillAreas: Array<SkillArea>,
  onBrowseAll: () => void,
  onBrowseFiltered: () => void,
  layout: LayoutProps,
};
/*
  <Box flex={1} alignItems="center" justifyContent="center">
        <BrowseActivitiesButton onPress={onBrowseAll} />
      </Box>
 */
const skillAreaMargin = 15;

// TODO: remove this being hardcoded when we devise a better way
// or requirements change
const indoorsCategoryOptions = {
  title: 'Indoors',
  filter: { categories: toGlobalId('Category', 1) },
};
const outdoorCategoryOptions = {
  title: 'Outdoors',
  filter: { categories: toGlobalId('Category', 2) },
};

export const BrowseActivities = ({
  skillAreas,
  onBrowseAll,
  onBrowseFiltered,
  layout,
}: Props) => {
  const browseAllActivitiesHeight = Math.round(layout.viewportWidth * 0.2);
  const skillAreaButtonWidth = Math.round(
    layout.viewportWidth * 0.5 - skillAreaMargin,
  );
  const skillAreaButtonHeight = Math.round(
    layout.viewportWidth * 0.3 - skillAreaMargin,
  );

  return (
    <Box as={ScrollView} flex={1}>
      <Box
        flex={1}
        contentSpacing
        style={() => ({ height: browseAllActivitiesHeight, marginBottom: 0 })}
      >
        <BrowseActivitiesButton
          text="Browse All Activities"
          onPress={onBrowseAll}
        />
      </Box>
      <Box flex={1}>
        <Box contentSpacing>
          <Text medium size={4}>Development Skill</Text>
        </Box>
        <Box
          flex={1}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent="center"
        >
          {skillAreas.map(skillArea => (
            <Box
              key={skillArea.id}
              style={() => ({
                width: skillAreaButtonWidth,
                height: skillAreaButtonHeight,
                margin: 5,
              })}
            >
              <BrowseActivitiesButton
                text={skillArea.name}
                image={skillArea.image}
                onPress={() =>
                  onBrowseFiltered({
                    title: skillArea.name,
                    filter: { skillAreas: [skillArea.id] },
                  })}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box flex={1}>
        <Box flex={1} contentSpacing>
          <Text size={4} medium>Category</Text>
        </Box>
        <Box
          flex={1}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Box
            style={() => ({
              width: skillAreaButtonWidth,
              height: skillAreaButtonHeight,
              margin: 5,
            })}
          >
            <BrowseActivitiesButton
              text="Indoors"
              onPress={() => {
                onBrowseFiltered(indoorsCategoryOptions);
              }}
            />
          </Box>
          <Box
            style={() => ({
              width: skillAreaButtonWidth,
              height: skillAreaButtonHeight,
              margin: 5,
            })}
          >
            <BrowseActivitiesButton
              text="Outdoors"
              onPress={() => {
                onBrowseFiltered(outdoorCategoryOptions);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default compose(
  graphql(
    gql`
    query BrowseActivities {
      viewer {
        allSkillAreas {
          edges {
            node {
              id
              name
              image {
                url
              }
            }
          }
        }
      }
    }
  `,
    {
      props: mapEdgesToProp('viewer.allSkillAreas', 'skillAreas'),
    },
  ),
  displayLoadingState,
  withLayout,
)(BrowseActivities);
