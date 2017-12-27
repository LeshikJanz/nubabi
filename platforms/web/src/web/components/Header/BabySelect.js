// @flow
import type { Baby } from 'core/types';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Modal from 'react-modal';
import onClickOutside from 'react-onclickoutside';
import { compose } from 'recompose';
import { Button } from 'web/elements';
import { getBabiesQuery } from './graphql';
import path from 'ramda/src/path';
import { connect } from 'react-redux';
import { selectBaby } from 'core/babies/actions';
import { withRouter, Link } from 'react-router-dom';
import {
  BabySelect,
  BabySelected,
  BabiesListWrapper,
  BabiesList,
  BabiesListItem,
  BabyProfileImage,
  PersonDefaultIcon,
  BabyImage,
  BabyImageContainer,
  BabyName,
  modalStyles,
  DefaultIcon,
  AddItem,
  BabyProfileDefaultIconCover,
} from './styled';

type Props = Baby;

type queryOptsType = {
  fetchPolicy: string,
  skip: boolean,
};

const BabyProfileDefaultImage = () => (
  <BabyProfileDefaultIconCover>
    <DefaultIcon />
  </BabyProfileDefaultIconCover>
);

const PersonDefaultImg = () => (
  <PersonDefaultIcon>
    <DefaultIcon />
  </PersonDefaultIcon>
);

class Select extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  handleClickOutside() {
    this.closeModal();
  }

  openModal = () => this.setState({ modalIsOpen: true });

  closeModal = () => this.setState({ modalIsOpen: false });

  redirectToBabyAdd = () => {
    this.props.history.push('/babyprofile');
    this.closeModal();
  };

  handleSelect = (babyId: string) => {
    this.props.handleBabySelect(babyId);
    this.props.history.push('/profile');
    this.closeModal();
  };

  renderAvatarOrDefault = avatar =>
    avatar ? <BabyProfileImage image={avatar} /> : <BabyProfileDefaultImage />;

  renderBabyAvatar = avatar =>
    avatar && avatar.url ? (
      <BabyImage image={avatar && avatar.url} />
    ) : (
      <PersonDefaultImg />
    );

  render() {
    const { name, id, babies = [], currentBabyId } = this.props;
    const avatar = this.props.avatar && this.props.avatar.url;
    return (
      <BabySelect className="BabySelect">
        <Link to={`/babyprofile/${id}`}>
          {this.renderAvatarOrDefault(avatar)}
        </Link>
        <BabySelected onClick={this.openModal}>{name}</BabySelected>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Edit Photo Menu"
          onRequestClose={this.closeModal}
          style={modalStyles}
          parentSelector={() => document.querySelector('.BabySelect')}
        >
          <BabiesListWrapper>
            <BabiesList>
              {babies.map(({ node }) => (
                <BabiesListItem
                  key={node.id}
                  onClick={() => this.handleSelect(node.id)}
                >
                  <BabyImageContainer isCurrent={currentBabyId === node.id}>
                    {this.renderBabyAvatar(node.avatar)}
                  </BabyImageContainer>
                  <BabyName isCurrent={currentBabyId === node.id}>
                    {node.name}
                  </BabyName>
                </BabiesListItem>
              ))}
              <AddItem justify="center" onClick={this.redirectToBabyAdd}>
                <Button plus /> Add Baby
              </AddItem>
            </BabiesList>
          </BabiesListWrapper>
        </Modal>
      </BabySelect>
    );
  }
}

const mapStateToProps = ({ auth, babies }) => ({
  isAuthenticated: auth.isAuthenticated,
  currentBabyId: babies.currentBabyId,
});

const mapDispatchToProps = dispatch => ({
  handleBabySelect: (babyId: string) => dispatch(selectBaby(babyId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  graphql(getBabiesQuery, {
    options: ({ isAuthenticated }) =>
      ({
        fetchPolicy: 'cache-and-network',
        skip: !isAuthenticated,
      }: queryOptsType),
    props: ({ data }) => ({
      data,
      babies: path(['viewer', 'babies', 'edges'], data),
    }),
  }),
)(onClickOutside(Select));
