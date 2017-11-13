// @flow
import React, { PureComponent } from "react";
import { Flex, Box } from 'grid-styled';
import styled from "styled-components";
import { Main } from "../../../../../web/elements";
import Growth from './Growth';
import Activities from './Activities';

type Props = {

};

const Memories = styled.div``;

class ProfileMain extends PureComponent<Props> {
  render() {
    const { memories, growth, activities, name, dob } = this.props;

    console.log('activities', activities);

    return (
      <Box width={4/7} is={Main} p={15} pt={25}>
        <Growth growth={growth} dob={dob}/>

        <Activities name={name} activities={activities}/>

        <Memories>
          <h3>Recent Memories</h3>
          <ul>
            {memories.edges.map(edge => {
              return (
                <li key={edge.node.id}>
                  <p>{edge.node.title}</p>
                  {edge.node.files.edges && (
                    <img src={edge.node.files.edges[0].node.thumb.url} />
                  )}
                </li>
              );
            })}
          </ul>
        </Memories>
      </Box>
    );
  }
}

export default ProfileMain;
