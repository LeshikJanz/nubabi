// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Box } from 'grid-styled';
import onClickOutside from 'react-onclickoutside';

import { Menu, Button } from '../../../../src/web/elements';
import IPerson from 'web/assets/images/icons/person.svg';

type Props = {};

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

class Select extends Component<Props> {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClickOutside(e) {
    this.closeModal();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <BabySelect className="BabySelect">
        <BabySelected onClick={this.openModal}>Charlotte</BabySelected>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Edit Photo Menu"
          onRequestClose={this.closeModal}
          style={modalStyles}
          parentSelector={() => document.querySelector('.BabySelect')}
        >
          <BabiesListWrapper>
            <BabiesList>
              <BabiesListItem>
                <BabyImage>
                  <IPerson />
                </BabyImage>
                <BabyName>Charlotte</BabyName>
              </BabiesListItem>

              <BabiesListItem>
                <BabyImage>
                  <IPerson />
                </BabyImage>
                <BabyName>Harry</BabyName>
              </BabiesListItem>

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

export default onClickOutside(Select);
