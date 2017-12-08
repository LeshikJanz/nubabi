import { gql } from 'react-apollo';

export const HeaderFragments = {
  skillArea: gql`
    fragment HeaderSkill on SkillArea {
      name
      image {
        large {
          url
        }
      }
    }
  `,
  activity: gql`
    fragment HeaderActivity on Activity {
      name
    }
  `,
};

export const ExpertInfoFragments = {
  expert: gql`
    fragment ExpertInfo on Expert {
      id
      name
      discipline
      avatar {
        url
      }
      biography
    }
  `,
  activity: gql`
    fragment ExpertInfoActivity on Activity {
      introduction
    }
  `,
};

export const StepsFragments = {
  steps: gql`
    fragment Steps on Activity {
      name
      steps
      media {
        edges {
          node {
            type
            thumb
            url
          }
        }
      }
    }
  `,
};

export const ActivityActionsFragments = {
  activity: gql`
    fragment ActivityActionsActivity on Activity {
      name
      isCompleted
    }
  `,
  skill: gql`
    fragment ActivityActionsSkill on SkillArea {
      icon
    }
  `,
};

export const ActivityFragments = {
  activity: gql`
      fragment Activity on Activity {
          id
          isFavorite
          ...HeaderActivity
          ...ExpertInfoActivity
          ...ActivityActionsActivity
          expert {
              ...ExpertInfo
          }
          skillArea {
              id
              name
              image {
                  large {
                      url
                  }
              }
              ...HeaderSkill
              ...ActivityActionsSkill
          }
          ...Steps
      }

      ${HeaderFragments.skillArea}
      ${HeaderFragments.activity}
      ${ExpertInfoFragments.expert}
      ${ExpertInfoFragments.activity}
      ${StepsFragments.steps}
      ${ActivityActionsFragments.activity}
      ${ActivityActionsFragments.skill}
  `,

  activityNavigation: gql`
    fragment ActivityNavigation on ActivityConnection {
      edges {
        cursor
        node {
          id
          name
          skillArea {
            id
            name
          }
        }
      }
    }
  `,
};

export const ActivityListFragment = {
  activities: gql`
    fragment ActivityList on Activity {
      id
      name
      skillArea {
        id
        name
        image {
          thumb {
            url
          }
        }
        icon
        completedIcon
      }
      equipment
      isCompleted
    }
  `,
};
