// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { gql, graphql } from "react-apollo";
import compose from "ramda/src/compose";
import path from "ramda/src/path";
import { Flex, Box } from 'grid-styled';
import { Loader, Aside } from "web/components";

type Props = {
  navigation: any,
  baby: ?Baby,
  unitDisplay: {
    weight: "kg" | "lbs",
    height: "cm" | "in"
  },
  data: { loading: boolean }
};

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
    `
  };

  render() {
    const { baby } = this.props;

    if (!baby) {
      return <Loader active={true} />;
    }

    const { memories, growth, activities } = baby;

    console.log(memories);

    return (
      <Flex wrap justify='space-between'>
        <Box width={1}>
          <img src={baby.avatar.url} style={{ width: "50px", height: "50px" }} />
          <h2>{baby.name}</h2>
          <img
            src={baby.coverImage.url}
            style={{ width: "400px", height: "100px" }}
          />
          <p>Date of Birth: {baby.dob}</p>
          <p>Height: {baby.height}</p>
          <p>Weight: {baby.weight}</p>
        </Box>

        <Box width={1/4}>
          menu here
        </Box>

        <Box width={4/7}>
          <h3>This Week's Growth</h3>
          <p>{growth.current.introduction}</p>
          <p>
            Expert: {growth.current.expert.name} <br />
            <img
              src={growth.current.expert.avatar.url}
              style={{ width: "50px", height: "50px" }}
            />
          </p>
          <h3>{baby.name}'s week ahead</h3>
          <ul>
            {activities.edges.map(edge => {
              return (
                <li key={edge.node.id}>
                  <h4>{edge.node.name}</h4>
                  <p>{edge.node.introduction}</p>
                </li>
              );
            })}
          </ul>

          <h3>Recent Memories</h3>
          <ul>
            {memories.edges.map(edge => {
              return (
                <li key={edge.node.id}>
                  <p>{edge.node.title}</p>
                  {edge.node.files.edges && (
                    <img src={edge.node.files.edges[0].node.thumb.url} />
                  )}
                </li>
              );
            })}
          </ul>
        </Box>

        <Box width={1/6} is={Aside}>Aside here</Box>
      </Flex>
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
    unitDisplay: settings.unitDisplay
  })),
  graphql(query, {
    options: ({ currentBabyId }) => ({
      fetchPolicy: "cache-and-network", // TODO: remove when there's a way to set a default
      variables: { id: currentBabyId },
      skip: !currentBabyId
    }),
    props: ({ data }) => ({
      data,
      baby: path(["viewer", "baby"], data)
    })
  })
)(Profile);
