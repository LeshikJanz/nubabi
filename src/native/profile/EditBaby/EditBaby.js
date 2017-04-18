// @flow
import type { Baby, State } from '../../../common/types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { compose, path, omit } from 'ramda';
import displayLoadingState from '../../components/displayLoadingState';
import BabyForm from './BabyForm';
import { getBabyTitle } from '../../navigation/shared';

class EditBaby extends Component {
  props: {
    baby: Baby,
    mutate: () => Promise<*>,
  };

  static navigationOptions = {
    ...getBabyTitle(),
    header: (_, defaultHeader) => ({
      ...defaultHeader,
      style: {
        ...defaultHeader.style,
        shadowOpacity: 0,
      },
    }),
  };

  state = {
    submitting: false,
  };

  scroll = null;
  resetSubmit = () => this.setState({ submitting: false });

  handleSubmit = values => {
    const input = {
      ...values,
      id: this.props.baby.id,
      avatar: values.avatar ? { url: values.avatar.url } : null,
      coverImage: values.coverImage ? { url: values.coverImage.url } : null,
    };

    this.setState({ submitting: true }, () => {
      this.props
        .mutate({ variables: { input } })
        .then(this.resetSubmit)
        .catch(this.resetSubmit);
    });
  };

  render() {
    return (
      <BabyForm
        mode="edit"
        initialValues={omit(['id', '__typename'], this.props.baby)}
        onSubmit={this.handleSubmit}
        loading={this.state.submitting}
      />
    );
  }
}

export default compose(
  connect(({ babies: { currentBabyId } }: State) => ({ currentBabyId })),
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
      // Since Firebase returns the same url for files we
      // workaround this by using refetchQueries
      options: {
        refetchQueries: ['getBaby', 'getBabyAvatar'],
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
