// @flow
import React, { PureComponent } from "react";
import { Flex, Box } from 'grid-styled';
import styled from "styled-components";
import moment from 'moment';

type Props = {

};

const Growth = styled.article`
  background: ${props => props.theme.colors.white};
  overflow: hidden;
  font-family: ${props => props.theme.text.fontFamily};
  box-shadow:  ${props => props.theme.shadows.panel};
  border-radius: 4px;
  margin-bottom: 30px;
`;

const GrowthContent = styled.div`
  padding: 15px;
  
  > p {
    color: ${props => props.theme.colors.secondary};
    font-size: 16px;
    font-weight: normal;
    margin: 0 0 15px;
    line-height: 24px;
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

const GrowthDoB = styled(Box)`
  padding: 5px 10px;
  background: ${props => props.theme.overlay.blue0};
  font-size: 12px;
  border-radius: 15px;
  color: ${props => props.theme.colors.open.blue0};
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

class ProfileMain extends PureComponent<Props> {
  render() {
    const { growth, dob } = this.props;

    return (
      <Growth>
        <GrowthContent>
          <GrowthHeader justify="space-between" align="center">
            <GrowthTitle is='h3'>This Week's Growth</GrowthTitle>
            <GrowthDoB is='span'>{moment(dob).fromNow(true)} old</GrowthDoB>
          </GrowthHeader>

          <p>{growth.current.introduction}</p>
        </GrowthContent>

        <GrowthExpert p={15} align="center">
          <GrowthExpertImage mr={15}>
            <img src={growth.current.expert.avatar.url} alt="Expert" />
          </GrowthExpertImage>

          <GrowthExpertContent>
            <GrowthExpertName>{growth.current.expert.name}</GrowthExpertName>
            <GrowthExpertDiscipline>{growth.current.expert.discipline}</GrowthExpertDiscipline>
          </GrowthExpertContent>
        </GrowthExpert>
      </Growth>
    );
  }
}

export default ProfileMain;
