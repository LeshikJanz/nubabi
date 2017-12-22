// @flow
import type { MemoryConnection } from 'core/types';
import React, { PureComponent } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import Button from 'web/elements/Button';
import { EmptyGalleryIcon, LibBackground } from 'web/assets/images';

type Props = {
  memories: MemoryConnection,
  name: string,
};

const Memories = styled.div``;

const MemoriesHeader = styled(Flex)`
  margin: 0 0 15px;
`;

const MemoriesTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0 0 10px;
  z-index: 2;
  color: ${props => props.theme.colors.open.black0};
`;

const AddButton = styled(Box)``;

const MemoriesList = styled(Flex)`
  margin: 0;
  padding: 0;

  &:after {
    content: '';
    width: 32%;
  }
`;

const MemoriesListItem = styled(Box)`
  padding: 0;
  box-shadow: ${props => props.theme.shadows.panel};
  background: ${props => props.theme.colors.white};
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: ${props => props.theme.transition('opacity')};

  &:hover {
    opacity: 0.8;
  }

  > h4 {
    font-size: 12px;
    font-weight: normal;
    color: ${props => props.theme.colors.open.gray3};
    margin: 15px;
  }
`;

const MemoriesListImage = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  height: 108px;
  background: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const MemoriesEmptyText = styled.div`
  text-align: center;
  font-family: SFUIText;
  font-size: 14px;
  line-height: 1.43;
  text-align: center;
  color: #748294;
`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 110px;
`;

const MemoriesEmptyContainer = styled(Flex)`
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 24px 0;

  > svg {
    z-index: 2;
    margin-top: 24px;
  }

  ${MemoriesTitle} {
    margin: 10px 15%;
  }

  ${MemoriesEmptyText} {
    margin: 25px 15% 0;
  }

  svg {
    width: 36px;
    height: 35px;
  }

  button {
    cursor: pointer;
    width: 157px;
    height: 35px;
    color: white;
    margin-top: 16px;
    font-family: SFUIText;
    font-size: 14px;
    border-radius: 100px;
    background-color: #ea3154;
    transition: 0.1s linear;

    span {
      opacity: 0.7;
    }

    &:hover {
      span {
        opacity: 1;
        transition: 0.1s linear;
      }
    }
  }
`;

class ProfileMain extends PureComponent<Props> {
  render() {
    const { name, memories } = this.props;

    // FIXME: memories.edges could be null as Flow correctly tells us
    return (
      <Memories>
        {memories.edges.length !== 0 && (
          <div>
            <MemoriesHeader justify="space-between" align="center">
              <MemoriesTitle is="h3">Recent Memories </MemoriesTitle>
              <AddButton is={Button} plus />
            </MemoriesHeader>

            <MemoriesList justify="space-between" wrap>
              {memories.edges.map(edge => {
                return (
                  <MemoriesListItem width="32%" key={edge.node.id}>
                    {edge.node.files.edges &&
                      edge.node.files.edges[0].node.thumb && (
                        <MemoriesListImage
                          image={edge.node.files.edges[0].node.thumb.url}
                        />
                      )}
                    <h4>{edge.node.title}</h4>
                  </MemoriesListItem>
                );
              })}
            </MemoriesList>
          </div>
        )}
        {memories.edges.length === 0 && (
          <MemoriesEmptyContainer>
            <EmptyGalleryIcon />
            <BackgroundImage src={LibBackground} />
            <MemoriesTitle is="h3">Recent Memories </MemoriesTitle>
            <MemoriesEmptyText>
              Upload voice notes, videos and photos of {name} to Memories and
              they’ll display here for you to enjoy.
            </MemoriesEmptyText>
            <button>
              <span>GO TO MEMORIES</span>
            </button>
          </MemoriesEmptyContainer>
        )}
      </Memories>
    );
  }
}

export default ProfileMain;
