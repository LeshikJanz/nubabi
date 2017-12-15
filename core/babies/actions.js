// @flow
import type { Action, SelectBabyAction, DeleteBabyAction, MutationResultAction } from '../types';
import { Observable } from 'rxjs/Observable';
import { path } from 'ramda';
import { gql } from 'react-apollo';
import { appError, appSuccess } from '../app/actions';
import { resetNavigation } from '../navigation/actions';
import formatPossessive from '../helpers/formatPossessive';
import { removeEdge } from '../../libs/graphql-utils';

export function selectBaby(id: string): SelectBabyAction {
  return {
    type: 'SELECT_BABY',
    payload: id,
  };
}

export function deleteBaby(id: string): DeleteBabyAction {
  return {
    type: 'DELETE_BABY',
    payload: id,
  };
}

export function getBabiesRequest(): Action {
  return {
    type: 'GET_BABIES_REQUEST',
  };
}

export function getBabiesSuccess(babies): Action {
  return {
    type: 'GET_BABIES_SUCCESS',
    payload: babies,
  };
}

export function getBabiesFailure(err): Action {
  return {
    type: 'GET_BABIES_FAILURE',
    payload: err,
    error: true,
  };
}

const createBabyEpic = (action$: any) => {
  return action$
    .filter((action: MutationResultAction) => {
      return (
        action.type === 'APOLLO_MUTATION_RESULT' &&
        action.operationName === 'CreateBaby'
      );
    })
    .mergeMap(({ result: { data } }) => {
      if (data.createBaby) {
        return [
          selectBaby(data.createBaby.createdBaby.id),
          resetNavigation('home'),
        ];
      }

      return Observable.of(null);
    });
};

const deleteBabyEpic = (action$: any, { apollo }: Deps) => {
  return action$
    .ofType('DELETE_BABY')
    .mergeMap(action => {
      return Observable.fromPromise(
        apollo.mutate({
          mutation: gql`
            mutation DeleteBaby($input: DeleteBabyInput!) {
              deleteBaby(input: $input) {
                edge {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            input: {
              id: action.payload,
            },
          },
          update: (store, data) => {
            const id = path(['data', 'deleteBaby', 'edge', 'node', 'id'], data);
            if (!id) {
              return;
            }
            const query = gql`
              query {
                viewer {
                  babies {
                    edges {
                      node {
                        id
                        name
                        avatar {
                          url
                        }
                      }
                    }
                  }
                }
              }
            `;

            const prev = store.readQuery({ query });
            const newData = removeEdge(
              ['viewer', 'babies', 'edges'],
              id,
              prev,
              data,
            );

            if (newData) {
              store.writeQuery({ query, data: newData });
            }
          },
        }),
      );
    })
    .mergeMap(() => {
      return Observable.fromPromise(
        apollo.query({
          query: gql`
            query ChooseFirstBaby {
              viewer {
                babies(first: 1) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          `,
        }),
      );
    })
    .mergeMap(data => {
      const newBaby = path(
        ['data', 'viewer', 'babies', 'edges', '0', 'node'],
        data,
      );

      const newBabyId = newBaby ? newBaby.id : null;
      const messageSuffix = newBaby
        ? `You're now viewing ${formatPossessive(newBaby.name)} profile.`
        : "You'll need to select or create a baby next.";

      const message = 'Baby was successfully deleted.';
      return [
        selectBaby(newBabyId),
        resetNavigation('home'),
        appSuccess(`${message} ${messageSuffix}`),
      ];
    })
    .catch(() =>
      Observable.of(
        appError(new Error('There was a problem deleting this baby.')),
      ),
    );
};

export const epics = [createBabyEpic, deleteBabyEpic];
