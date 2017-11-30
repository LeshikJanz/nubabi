// @flow
import type { LayoutProps, SkillArea } from 'core/types';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import { compose } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { mapEdgesToProp } from 'core/helpers/graphqlUtils';
import {
  Box,
  Card,
  displayLoadingState,
  Text,
  withLayout,
} from '../components';
import BrowseActivitiesButton from './BrowseActivitiesButton';
import { toGlobalId } from 'graphql-relay';
import iconMappings, { backgroundMappings } from './iconMappings';
import ScreenActionSubheader from './ScreenActionSubheader';

type Props = {
  skillAreas: Array<SkillArea>,
  onBrowseAll: () => void,
  onBrowseFiltered: () => void,
  layout: LayoutProps,
};

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

const indoorsCategoryImage = require('core/images/category-indoors.png');
const outdoorsCategoryImage = require('core/images/category-outdoors.png');

export const BrowseActivities = ({
  skillAreas,
  onBrowseAll,
  onBrowseFiltered,
  layout,
}: Props) => {
  const skillAreaButtonWidth = Math.round(
    layout.viewportWidth * 0.5 - skillAreaMargin,
  );
  const skillAreaButtonHeight = Math.round(
    layout.viewportWidth * 0.3 - skillAreaMargin,
  );

  return (
    <Box as={ScrollView} flex={1}>
      <ScreenActionSubheader
        leftIcon="ios-search"
        leftTitle={['Custom', 'Search']}
        rightIcon="ios-eye"
        rightTitle={['View all', 'Activities']}
        onLeftPress={() => {}}
        onRightPress={onBrowseAll}
      />

      <Box flex={1}>
        <Box flex={1} contentSpacing>
          <Text size={6}>By Category</Text>
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
              image={indoorsCategoryImage}
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
              image={outdoorsCategoryImage}
              onPress={() => {
                onBrowseFiltered(outdoorCategoryOptions);
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box flex={1}>
        <Box contentSpacing>
          <Text size={6}>Development Skills</Text>
        </Box>
        <Box
          flex={1}
          flexDirection="row"
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent="center"
        >
          {skillAreas.map(skillArea => (
            <Card
              padding={0}
              key={skillArea.id}
              alignItems="center"
              justifyContent="center"
              style={() => ({
                width: skillAreaButtonWidth,
                margin: 5,
                flex: 0,
              })}
              onPress={() =>
                onBrowseFiltered({
                  title: skillArea.name,
                  filter: { skillAreas: [skillArea.id] },
                })
              }
            >
              <Box
                style={() => ({
                  width: 45,
                  height: 45,
                  backgroundColor: backgroundMappings(skillArea.icon),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 45 / 2,
                  marginTop: 16,
                })}
              >
                <Image
                  source={iconMappings(skillArea.icon)}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  resizeMode="contain"
                />
              </Box>
              <Text size={4} marginBottom={0.5}>
                {skillArea.name}
              </Text>
            </Card>
          ))}
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
                icon
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
