// @flow
import React, { PureComponent } from "react";
import { Flex, Box } from 'grid-styled';
import styled from "styled-components";
import { Main } from "../../../../../web/elements";
import Growth from './Growth';

type Props = {

};


const Ahead = styled.div``;

const Memories = styled.div``;

class ProfileMain extends PureComponent<Props> {
  render() {
    const { memories, growth, activities, name, dob } = this.props;

    console.log(memories);

    return (
      <Box width={4/7} is={Main} p={15} pt={25}>
        <Growth growth={growth} dob={dob}/>

        <Ahead>
          <h3>{name}'s week ahead</h3>
          <ul>
            {activities.edges.map(edge => {
              return (
                <li key={edge.node.id}>
                  <h4>{edge.node.name}</h4>
                  <p>{edge.node.introduction}</p>
                </li>
              );
            })}
          </ul>
        </Ahead>

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
