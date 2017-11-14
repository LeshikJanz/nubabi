// @flow
import React, { PureComponent } from "react";
import { Flex, Box } from 'grid-styled';
import styled from "styled-components";

type Props = {

};

const Memories = styled.div``;

const MemoriesTitle = styled.h3`
  font-weight: normal;
  font-size: 18px;
  margin: 0 0 15px;
  color: ${props => props.theme.colors.open.black0};
`;

const MemoriesList = styled(Flex)`
  margin: 0;
  padding: 0;
  
  &:after {
    content: "";
    width: 32%
  }
`;

const MemoriesListItem = styled(Box)`
  padding: 0;
  box-shadow:  ${props => props.theme.shadows.panel};
  background:  ${props => props.theme.colors.white};
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
  
  >h4 {
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
  background-size:cover;
  background-position: center;
  background-repeat: no-repeat;
`;

class ProfileMain extends PureComponent<Props> {
  render() {
    const { memories } = this.props;

    return (
      <Memories>
        <MemoriesTitle>Recent Memories</MemoriesTitle>

        <MemoriesList justify='space-between' wrap>
          {memories.edges.map(edge => {
            return (
              <MemoriesListItem width='32%' key={edge.node.id}>

                {edge.node.files.edges && (
                  <MemoriesListImage image={edge.node.files.edges[0].node.thumb.url} />
                )}

                <h4>{edge.node.title}</h4>
              </MemoriesListItem>
            );
          })}
        </MemoriesList>
      </Memories>
    );
  }
}

export default ProfileMain;
