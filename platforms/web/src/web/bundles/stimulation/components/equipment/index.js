// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import EquipmentIcon from 'web/assets/images/icons/equipment.svg';
import CalendarIcon from 'web/assets/images/icons/calendar.svg';
import { Flex } from 'grid-styled';
import moment from 'moment';
import EquipmentItem from './EquipmentItem';

const IconWrapper = styled.div`
  position: absolute;
  width: 90px;
  height: 100px;
  left: 50%;
  top: 20px;
  transform: translate(-50%, -50%);
  border: 8px solid rgb(234, 238, 248);
  border-radius: 100%;
`;

const Wrapper = styled(Flex)`
  flex-direction: column;
  position: relative;
  margin-top: 30px;

  > svg {
    width: 69px;
    height: 69px;
  }
`;

const EquipmentContent = styled.div`
  background-color: #eaeef8;
  box-shadow: 0 -1px 0 0 #e9ecf4;
  text-align: center;
  padding-top: 60px;
`;

const EquipmentText = styled.div`
  font-size: 18px;
  text-align: center;
  color: #454d57;
  line-height: 2;
`;

const CalendarText = styled.div`
  color: #748294;

  > svg {
    margin-right: 10px;
    margin-bottom: 5px;
  }
`;

const EquipmentList = styled(Flex)`
  flex-direction: column;
  text-align: left;
  margin-top: 18px;
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

  handleCheckbox = ({ target }) => target;

  render() {
    const { equipments } = this.props;

    return (
      <Wrapper>
        <IconWrapper>
          <EquipmentIcon />
        </IconWrapper>
        <EquipmentContent>
          <EquipmentText>Equipment for next week</EquipmentText>
          <CalendarText>
            <CalendarIcon />
            {`${this.getNextWeekStart().format(
              'DD MMMM',
            )} - ${this.getNextWeekEnd().format('DD MMMM YYYY')}`}
          </CalendarText>
          <EquipmentList>
            {equipments.map(e => (
              <EquipmentItem
                key={e.id}
                {...e}
                handleCheckbox={this.handleCheckbox}
              />
            ))}
          </EquipmentList>
        </EquipmentContent>
      </Wrapper>
    );
  }
}

export default Equipment;
