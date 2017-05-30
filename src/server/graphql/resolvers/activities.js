// @flow
import S from 'string';
import type {
  Context,
  ConnectionArguments,
  RawActivity,
  RawActivityMedia,
} from './common';
import * as connector from '../connectors/babiesConnector';
import {
  connectionFromArray,
  connectionFromPromisedArray,
  connectionFromPromisedArrayWithCount,
  mutationWithClientMutationId,
  fromGlobalId,
  globalIdField,
  prop,
} from './common';

export const resolvers = {
  Viewer: {
    allActivities: (
      _: mixed,
      args: ConnectionArguments,
      { token }: Context,
    ) => {
      return connectionFromPromisedArrayWithCount(
        connector.getAllActivities(token),
        args,
      );
    },
    allSkillAreas: (
      _: mixed,
      args: ConnectionArguments,
      { token }: Context,
    ) => {
      return connectionFromPromisedArray(connector.getSkillAreas(token), args);
    },
  },
  Mutation: {
    swoopActivity: mutationWithClientMutationId(({ id, babyId }, { token }) =>
      connector
        .swoopActivity(token, fromGlobalId(babyId).id, fromGlobalId(id).id)
        .then(newActivity => {
          // We need to return babyId to join steps
          // TODO: in the future we need to have better firebase/API joining
          return {
            newActivity: { ...newActivity, babyId: fromGlobalId(babyId).id },
            oldActivityId: id,
          };
        }),
    ),

    changeActivity: mutationWithClientMutationId(
      ({ id, babyId, level }, { token }) =>
        connector
          .changeActivityLevel(
            token,
            fromGlobalId(babyId).id,
            fromGlobalId(id).id,
            level,
          )
          .then(newActivity => {
            // See comment in swoopActivity
            return {
              newActivity: { ...newActivity, babyId: fromGlobalId(babyId).id },
              oldActivityId: id,
            };
          }),
    ),

    toggleActivityFavorite: mutationWithClientMutationId(
      ({ id, babyId, favorite }, { token }) => {
        return connector
          .toggleActivityFavorite(
            token,
            fromGlobalId(babyId).id,
            fromGlobalId(id).id,
            favorite,
          )
          .then(() => ({ wasFavorited: favorite }));
      },
    ),
  },
  Activity: {
    id: globalIdField(),
    skillArea: (obj: RawActivity, _: mixed, { token }: Context) => {
      return connector.getSkillArea(token, obj['skill_area_id']); // eslint-disable-line dot-notation
    },
    expert: (obj: RawActivity, _: mixed, { token }: Context) => {
      return connector.getExpert(token, obj['expert_id']);
    }, // eslint-disable-line dot-notation
    steps: (
      { id, babyId, steps }: RawActivity,
      _: mixed,
      { connectors: { firebase } }: Context,
      info,
    ) => {
      return connector.getSteps(firebase, babyId, id, steps);
    },
    categories: (obj: RawActivity, args: mixed, { token }: Context) => {
      return connectionFromPromisedArray(
        connector.getCategoriesFor(token, prop('category_ids')(obj)),
        args,
      );
    },
    introduction: (
      { introduction, babyId },
      _,
      { connectors: { firebase } },
    ) => {
      return connector.getActivityIntroduction(firebase, babyId, introduction);
    },
    media: (obj: RawActivity, args: ConnectionArguments) => {
      return connectionFromArray(obj.media, args);
    },
  },

  ActivityMedia: {
    type: (obj: RawActivityMedia) => {
      return obj.video ? 'VIDEO' : 'IMAGE';
    },
    url: prop('large_url'),
    thumb: prop('thumb_url'),
  },

  SkillArea: {
    id: globalIdField(),
    completedIcon: prop('completed_icon'),
    image: connector.getSkillAreaImage,
  },

  Category: {
    id: globalIdField(),
  },
};

export default resolvers;
