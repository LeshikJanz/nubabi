// @flow
import type { NavigationOptions } from '../../../common/types';
import React, { Component } from 'react';
import { compose, path, assocPath, prepend } from 'ramda';
import { graphql, gql } from 'react-apollo';
import { Screen } from '../../components';
import BabyForm from './BabyForm';
import theme from '../../../common/themes/defaultTheme';

type Props = {
  mutate: (options: Object) => Promise<*>,
};

class AddBaby extends Component {
  props: Props;

  static navigationOptions: NavigationOptions = {
    headerTitle: 'Add Baby',
    headerStyle: {
      backgroundColor: theme.colors.white,
      shadowOpacity: 0,
    },
  };

  state = {
    submitting: false,
  };

  resetSubmit = () => this.setState({ submitting: false });

  handleSubmit = values => {
    console.log('handle submit called');
    const input = {
      ...values,
      avatar: values.avatar ? { url: values.avatar.url } : null,
      coverImage: values.coverImage ? { url: values.coverImage.url } : null,
    };

    this.setState({ submitting: true }, () => {
      this.props.mutate({ variables: { input } }).finally(this.resetSubmit);
    });
  };

  render() {
    return (
      <Screen>
        <BabyForm
          mode="add"
          onSubmit={this.handleSubmit}
          loading={this.state.submitting}
        />
      </Screen>
    );
  }
}

export default compose(
  graphql(
    gql`
      mutation CreateBaby($input: CreateBabyInput!) {
        createBaby(input: $input) {
          createdBaby {
            ...BabyForm
          }
        }
      }

      ${BabyForm.fragments.form}
    `,
    {
      options: {
        updateQueries: {
          ChooseBabyList: (previousData, { mutationResult }) => {
            const edges = ['viewer', 'babies', 'edges'];
            return assocPath(
              edges,
              prepend(
                mutationResult.data.createBaby.createdBaby,
                path(edges, previousData),
              ),
              previousData,
            );
          },
        },
      },
    },
  ),
)(AddBaby);
