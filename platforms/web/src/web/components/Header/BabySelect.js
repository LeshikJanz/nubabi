// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { gql, graphql } from 'react-apollo';
import Modal from 'react-modal';
import { Box } from 'grid-styled';
import onClickOutside from 'react-onclickoutside';
import { compose } from 'recompose';
import { Menu, Button } from 'web/elements';
import PersonDefaultIcon from 'web/assets/images/icons/person.svg';
import { Baby } from 'core/types';
import path from 'ramda/src/path';
import { connect } from 'react-redux';
import { selectBaby } from 'web/actions';

type Props = Baby;

const BabySelect = styled.div`
  margin: -10px 0 0 0;
  color: ${props => props.theme.colors.open.black1};
  font-family: ${props => props.theme.text.fontFamily};
  font-size: 16px;
  position: relative;

  &:after {
    content: '';
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.colors.open.gray2};
  }
`;

const BabySelected = styled.span`
  cursor: pointer;
  margin: 10px;
`;

const BabiesListWrapper = styled(Menu)`
  padding-top: 20px;
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: ${props => props.theme.shadows.light};
`;

const BabiesList = styled(Menu)`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const BabiesListItem = styled(Menu.Link)`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: center;
  padding: 15px;
  margin: 0;
  border-bottom: 1px solid ${props => props.theme.colors.open.white2};
  color: ${props => props.theme.colors.open.gray3};
  cursor: pointer;
  font-size: 14px;
  font-family: ${props => props.theme.text.fontFamily};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:last-child {
    border: none;
  }

  > button {
    margin-right: 10px;
  }
`;

const BabyProfileImage = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  left: 50%;
  top: 53px;
  transform: translate(-50%, -50%);
  border: 8px solid ${props => props.theme.colors.white};
  border-radius: 100%;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center;
  z-index: 3;
`;

const BabyImage = styled(Box)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 25px 0 0;
  border: 1px solid ${props => props.theme.colors.white2};
  border-radius: 100%;

  > img {
    max-width: 100%;
  }
`;

const BabyName = styled(Box)`
  font-size: 16px;
  font-weight: 400;
`;

const modalStyles = {
  overlay: {
    zIndex: 1,
    background: 'none',
    position: 'absolute',
  },
  content: {
    minWidth: '250px',
    position: 'absolute',
    top: '48px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    background: 'none',
    border: 'none',
    borderRadius: '0',
    padding: '0',
    transform: 'translateX(-50%)',
  },
};

const query = gql`
  query getBabies {
    viewer {
      babies {
        count
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

class Select extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClickOutside() {
    this.closeModal();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { name, babies = [] } = this.props;
    const avatar = this.props.avatar && this.props.avatar.url;

    const handleSelect = (babyId: string) => {
      this.props.handleBabySelect(babyId);
      this.closeModal();
    };

    return (
      <BabySelect className="BabySelect">
        {(avatar && <BabyProfileImage image={avatar} />) || (
          <PersonDefaultIcon />
        )}
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
                  onClick={() => handleSelect(node.id)}
                >
                  <BabyImage>
                    {(node.avatar &&
                      node.avatar.url && (
                        <img src={node.avatar.url} alt={node.nam} />
                      )) || <PersonDefaultIcon />}
                  </BabyImage>
                  <BabyName>{node.name}</BabyName>
                </BabiesListItem>
              ))}
              <BabiesListItem justify="center">
                <Button plus /> Add Baby
              </BabiesListItem>
            </BabiesList>
          </BabiesListWrapper>
        </Modal>
      </BabySelect>
    );
  }
}

const mapStateToProps = ({ auth }: State) => ({
  isAuthenticated: auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  handleBabySelect: (babyId: string) => dispatch(selectBaby(babyId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(query, {
    options: ({ isAuthenticated }) => ({
      fetchPolicy: 'cache-and-network', // TODO: remove when there's a way to set a default
      skip: !isAuthenticated,
    }),
    props: ({ data }) => ({
      data,
      babies: path(['viewer', 'babies', 'edges'], data),
    }),
  }),
)(onClickOutside(Select));
