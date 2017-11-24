// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import EquipmentIcon from 'web/assets/images/icons/equipment.svg';
import CalendarIcon from 'web/assets/images/icons/calendar.svg';
import { Flex } from 'grid-styled';
import moment from 'moment';

const IconWrapper = styled.div`
  width: 100%;
  height: 69px;
  text-align: center;
`;

const Wrapper = styled(Flex)`
  flex-direction: column;
  position: relative;

  > svg {
    width: 69px;
    height: 69px;
  }
`;

const EquipmentContent = styled.div`
  background-color: #eaeef8;
  box-shadow: 0 -1px 0 0 #e9ecf4;
  text-align: center;
`;

const EquipmentText = styled.div`
  font-size: 18px;
  text-align: center;
  color: #454d57;
`;

class Equipment extends PureComponent<Props> {
  getNextWeekStart = () =>
    moment()
      .add(1, 'weeks')
      .startOf('isoWeek');

  getNextWeekEnd = () =>
    moment()
      .add(1, 'weeks')
      .endOf('isoWeek');

  render() {
    return (
      <Wrapper>
        <IconWrapper>
          <EquipmentIcon />
        </IconWrapper>
        <EquipmentContent>
          <EquipmentText>Equipment for next week</EquipmentText>
          <CalendarIcon />
          {`${this.getNextWeekStart().format(
            'DD MMMM',
          )} - ${this.getNextWeekEnd().format('DD MMMM YYYY')}`}
        </EquipmentContent>
      </Wrapper>
    );
  }
}

export default Equipment;
