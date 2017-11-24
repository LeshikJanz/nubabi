// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import EquipmentIcon from 'web/assets/images/icons/equipment.svg';
import CalendarIcon from 'web/assets/images/icons/calendar.svg';
import { Flex } from 'grid-styled';
// import moment from 'moment';

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
  // Try without
  // getNextWeekStart() {
  //   const today = moment();
  //   const daystoMonday = 0 - (today.isoWeekday() - 1) + 7;
  //   const nextMonday = today.subtract('days', daystoMonday);
  //
  //   return nextMonday;
  // };
  //
  // getNextWeekEnd() {
  //   const nextMonday = this.getNextWeekStart();
  //   const nextSunday = nextMonday.add('days', 6);
  //
  //   return nextSunday;
  // };

  render() {
    return (
      <Wrapper>
        <IconWrapper>
          <EquipmentIcon />
        </IconWrapper>
        <EquipmentContent>
          <EquipmentText>Equipment for next week</EquipmentText>
          <CalendarIcon />
        </EquipmentContent>
      </Wrapper>
    );
  }
}

export default Equipment;
