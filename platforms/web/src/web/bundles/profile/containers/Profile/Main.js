// @flow
import React, { PureComponent } from "react";
import { Flex, Box } from 'grid-styled';
import styled from "styled-components";
import { Main } from "../../../../../web/elements";

type Props = {

};

const Growth = styled.article`
  background: ${props => props.theme.colors.white};
  overflow: hidden;
  font-family: ${props => props.theme.text.fontFamily};
`;

const GrowthContent = styled.div`
  padding: 15px;
  
  > p {
    color: ${props => props.theme.colors.secondary};
    font-size: 16px;
    margin: 0 0 15px;
  }
`;

const GrowthHeader = styled(Flex)`
  margin: 0 0 15px;
`;

const GrowthTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;

const GrowthExpert = styled(Flex)`
  border-top: 1px solid ${props => props.theme.colors.open.white2};
`;

const GrowthExpertImage = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  overflow: hidden;
  
  > img {
    max-width: 100%;
  }
`;

const GrowthExpertContent = styled.div`
  font-size: 14px;
`;

const GrowthExpertName = styled.div`
  color: ${props => props.theme.colors.open.black0};
`;

const GrowthExpertDiscipline = styled.div`
  color: ${props => props.theme.colors.secondary};
`;

const GrowthDoB = styled(Box)`
  padding: 5px 10px;
  background: ${props => props.theme.overlay.blue0};
  font-size: 12px;
  border-radius: 15px;
  color: ${props => props.theme.colors.open.blue0};
`;

const Ahead = styled.div``;

const Memories = styled.div``;

class ProfileMain extends PureComponent<Props> {
  render() {
    const { memories, growth, activities, name, dob } = this.props;

    console.log(memories);

    return (
      <Box width={4/7} is={Main} p={15}>
        <Growth>
          <GrowthContent>
            <GrowthHeader justify="space-between" align="center">
              <GrowthTitle is='h3'>This Week's Growth</GrowthTitle>
              <GrowthDoB is='span'>{dob} old</GrowthDoB>
            </GrowthHeader>

            <p>{growth.current.introduction}</p>
          </GrowthContent>

          <GrowthExpert p={15} align="center">
            <GrowthExpertImage mr={15}>
              <img src={growth.current.expert.avatar.url} />
            </GrowthExpertImage>

            <GrowthExpertContent>
              <GrowthExpertName>{growth.current.expert.name}</GrowthExpertName>
              <GrowthExpertDiscipline>{growth.current.expert.discipline}</GrowthExpertDiscipline>
            </GrowthExpertContent>
          </GrowthExpert>
        </Growth>

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
