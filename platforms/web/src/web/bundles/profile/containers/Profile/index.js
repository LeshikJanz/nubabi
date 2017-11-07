// @flow
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { gql, graphql } from "react-apollo";
import compose from "ramda/src/compose";
import path from "ramda/src/path";
import { Loader } from "web/components";

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
    `
  };

  render() {
    console.log(this.props);
    const { baby } = this.props;

    if (!baby) {
      return <Loader active={true} />;
    }

    return (
      <div>
        <img src={baby.avatar.url} style={{ width: "50px", height: "50px" }} />
        <h2>{baby.name}</h2>
        <img
          src={baby.coverImage.url}
          style={{ width: "400px", height: "100px" }}
        />
        <p>Date of Birth: {baby.dob}</p>
        <p>Height: {baby.height}</p>
        <p>Weight: {baby.weight}</p>
      </div>
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
      }
    }
  }

  ${Profile.fragments.baby}
  ${Profile.fragments.growth}
  ${Profile.fragments.activities}
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
