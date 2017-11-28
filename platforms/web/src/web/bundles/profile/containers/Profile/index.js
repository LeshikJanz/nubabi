// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import compose from 'ramda/src/compose';
import path from 'ramda/src/path';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import ProfileMain from './Main';
import DisplayLoadingState from 'web/components/displayLoadingState';

type Props = {
  navigation: any,
  baby: ?Baby,
  unitDisplay: {
    weight: 'kg' | 'lbs',
    height: 'cm' | 'in',
  },
  data: { loading: boolean },
};

const Wrapper = styled(Flex)`
  width: 100%;
  background: ${props => props.theme.bg.panel};
`;

class Profile extends PureComponent<Props> {
  static fragments = {
    baby: gql`
      fragment Profile on Baby {
        id
        name
        weight
        height
        coverImage {
          url
        }
        avatar {
          url
        }
        dob
        achievements {
          count
        }
      }
    `,
    growth: gql`
      fragment ProfileGrowth on Baby {
        id
        growth {
          current {
            id
            introduction
            title
            maximumAge
            expert {
              id
              name
              discipline
              avatar {
                url
              }
            }
          }
        }
      }
    `,
    activities: gql`
      fragment ProfileActivities on Baby {
        activities(first: 2) {
          edges {
            node {
              id
              name
              introduction
              skillArea {
                id
                icon
                image {
                  thumb {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
    recentMemories: gql`
      fragment RecentMemories on Baby {
        memories(first: 5) {
          edges {
            node {
              id
              title
              files(first: 1) {
                edges {
                  node {
                    id
                    contentType
                    url
                    ... on Image {
                      thumb {
                        url
                      }
                      large {
                        url
                      }
                    }
                    ... on Video {
                      thumb {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  };

  render() {
    const { baby } = this.props;

    return (
      <Wrapper>
        <ProfileMain {...baby} />
      </Wrapper>
    );
  }
}

const query = gql`
    query getBaby($id: ID!) {
        viewer {
            baby(id: $id) {
                ...Profile
                ...ProfileGrowth
                ...ProfileActivities
                ...RecentMemories
            }
        }
    }

    ${Profile.fragments.baby}
    ${Profile.fragments.growth}
    ${Profile.fragments.activities}
    ${Profile.fragments.recentMemories}
`;

export default compose(
  connect(({ babies, settings }) => ({
    currentBabyId: babies.currentBabyId,
    unitDisplay: settings.unitDisplay,
  })),
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
      variables: { id: currentBabyId },
      skip: !currentBabyId,
    }),
    props: ({ data }) => ({
      data,
      baby: path(['viewer', 'baby'], data),
    }),
  }),
  DisplayLoadingState,
)(Profile);
