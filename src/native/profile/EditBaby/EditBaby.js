// @flow
import type {
  ApolloQueryResult,
  Baby,
  NavigationOptions,
  UpdateBabyInput,
} from '../../../common/types';
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { assoc, compose, omit, path } from 'ramda';
import {
  displayLoadingState,
  Screen,
  SubmitFormNavButton,
  withCurrentBaby,
} from '../../components';
import BabyNameTitle from '../BabyNameTitle';
import BabyForm, { normalizeAvatarAndCoverImage } from './BabyForm';
import theme from '../../../common/themes/defaultTheme';

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
      shadowOpacity: 0,
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
          changedBaby {
            ...BabyForm
          }
        }
      }

      ${BabyForm.fragments.form}
    `,
    {
      props: ({ mutate, ownProps: { currentBabyId } }) => ({
        onSubmit: values => {
          const input = normalizeAvatarAndCoverImage(
            assoc('id', currentBabyId, omit(['avatar', 'coverImage'], values)),
            values,
          );

          return mutate({ variables: { input } });
        },
      }),
      // Since Firebase returns the same url for files we workaround this by using refetchQueries
      // TODO: confirm we need to refetch these. also, we're now able to upload different filenames
      // so URL would change
      options: {
        refetchQueries: ['Profile', 'getBabyAvatar'],
      },
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
