// @flow
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose, path } from 'ramda';
import { gql } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import { isEmptyPath } from '../../../libs/graphql-utils';
import LinkFacebook from './LinkFacebook';
import LinkedAccountItem from './LinkedAccountItem';

type Props = {
  linkedAccounts: LinkedAccountsConnection,
  onUnlinkAccount: (id: string, providerId: string) => Promise<*>,
};

export class LinkedAccountsList extends PureComponent<Props> {
  static fragments = {
    list: gql`
      fragment LinkedAccounts on User {
        linkedAccounts {
          edges {
            node {
              ...LinkedAccountItem
            }
          }
        }
      }
      ${LinkedAccountItem.fragments.item}
    `,
  };

  renderItem = ({ item }) => {
    return (
      <LinkedAccountItem
        {...item.node}
        onUnlinkItem={this.props.onUnlinkAccount}
      />
    );
  };

  render() {
    const { linkedAccounts } = this.props;

    return (
      <FlatList
        data={linkedAccounts.edges}
        keyExtractor={path(['node', 'id'])}
        renderItem={this.renderItem}
      />
    );
  }
}

export default compose(
  branch(
    isEmptyPath(['linkedAccounts', 'edges']),
    renderComponent(LinkFacebook),
  ),
)(LinkedAccountsList);
