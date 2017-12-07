// @flow
import type {
  ApolloQueryResult,
  Baby,
  NavigationOptions,
  UpdateBabyInput,
} from 'core/types';
import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import { gql, graphql } from 'react-apollo';
import { assoc, compose, merge, omit, path } from 'ramda';
import {
  displayLoadingState,
  Screen,
  SubmitFormNavButton,
  withCurrentBaby,
} from '../../components';
import BabyNameTitle from '../BabyNameTitle';
import BabyForm, { normalizeAvatarAndCoverImage } from './BabyForm';
import theme from 'core/themes/defaultTheme';
import {
  getContentTypeFromFilename,
  getTypenameForFile,
  optimisticResponse,
} from '../../../../libs/graphql-utils';

type Props = {
  baby: Baby,
  onSubmit: (input: UpdateBabyInput) => Promise<ApolloQueryResult<*>>,
  navigation: NavigationProp,
};

class EditBaby extends Component {
  props: Props;

  static navigationOptions: NavigationOptions = {
    title: <BabyNameTitle />,
    headerStyle: {
      backgroundColor: theme.colors.white,
      borderBottomWidth: 0,
    },
    headerRight: <SubmitFormNavButton form="baby" />,
  };

  scroll = null;

  handleUpdateWeight = () => this.props.navigation.navigate('updateWeight');
  handleUpdateHeight = () => this.props.navigation.navigate('updateHeight');

  render() {
    return (
      <Screen>
        <BabyForm
          mode="edit"
          initialValues={omit(['id', '__typename'], this.props.baby)}
          onSubmit={this.props.onSubmit}
          onUpdateWeight={this.handleUpdateWeight}
          onUpdateHeight={this.handleUpdateHeight}
        />
      </Screen>
    );
  }
}

export default compose(
  withCurrentBaby,
  graphql(
    gql`
      mutation UpdateBaby($input: UpdateBabyInput!) {
        updateBaby(input: $input) {
          edge {
            node {
              ...BabyForm
            }
          }
        }
      }

      ${BabyForm.fragments.form}
    `,
    {
      props: ({ mutate, ownProps: { currentBabyId, navigation } }) => ({
        onSubmit: values => {
          const input = normalizeAvatarAndCoverImage(
            assoc('id', currentBabyId, omit(['avatar', 'coverImage'], values)),
            values,
          );

          InteractionManager.runAfterInteractions(navigation.goBack);

          const response = optimisticResponse(
            'updateBaby',
            'UpdateBabyPayload',
            () => {
              const baby = merge(values, {
                __typename: 'Baby',
                id: currentBabyId,
              });

              /* eslint-disable no-param-reassign */
              if (baby.avatar) {
                baby.avatar.contentType = getContentTypeFromFilename(
                  values.avatar.url,
                );
                baby.avatar = assoc(
                  '__typename',
                  getTypenameForFile(values.avatar),
                  values.avatar,
                );
              }

              if (baby.coverImage) {
                baby.coverImage.contentType = getContentTypeFromFilename(
                  values.coverImage.url,
                );
                baby.coverImage = assoc(
                  '__typename',
                  getTypenameForFile(values.coverImage),
                  values.coverImage,
                );
              }
              /* eslint-enable no-param-reassign */

              return {
                edge: {
                  __typename: 'BabyEdge',
                  node: {
                    __typename: 'Baby',
                    ...baby,
                  },
                },
              };
            },
          );

          return mutate({
            variables: { input },
            optimisticResponse: response,
          });
        },
      }),
    },
  ),
  graphql(
    gql`
      query EditBaby($id: ID!) {
        viewer {
          baby(id: $id) {
            ...BabyForm
          }
        }
      }

      ${BabyForm.fragments.form}
    `,
    {
      options: ({ currentBabyId }) => {
        return {
          fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
          variables: { id: currentBabyId },
        };
      },
      props: ({ data }) => ({
        data,
        baby: path(['viewer', 'baby'], data),
      }),
    },
  ),
  displayLoadingState,
)(EditBaby);
