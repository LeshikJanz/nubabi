// @flow
import React, { PureComponent } from 'react';
import EquipmentIcon from 'web/assets/images/icons/equipment.svg';
import CalendarIcon from 'web/assets/images/icons/calendar.svg';
import moment from 'moment';
import EquipmentList from './EquipmentList';
import * as EquipmentStyled from '../../styled/equipment/index';

class Equipment extends PureComponent<Props> {
  getNextWeekStart = () =>
    moment()
      .add(1, 'weeks')
      .startOf('isoWeek');

  getNextWeekEnd = () =>
    moment()
      .add(1, 'weeks')
      .endOf('isoWeek');

  handleCheckbox = ({ target }) => {
    return target;
  };

  render() {
    const { equipments } = this.props;
    const weekInterval = `${this.getNextWeekStart().format('DD MMMM')}
     - ${this.getNextWeekEnd().format('DD MMMM YYYY')}`;

    return (
      <EquipmentStyled.Wrapper>
        <EquipmentStyled.IconWrapper>
          <EquipmentIcon />
        </EquipmentStyled.IconWrapper>
        <EquipmentStyled.Content>
          <EquipmentStyled.Text>Equipment for next week</EquipmentStyled.Text>
          <EquipmentStyled.CalendarText>
            <CalendarIcon /> {weekInterval}{' '}
          </EquipmentStyled.CalendarText>
          <EquipmentList
            equipments={equipments}
            handleCheckbox={this.handleCheckbox}
          />
        </EquipmentStyled.Content>
      </EquipmentStyled.Wrapper>
    );
  }
}

export default Equipment;
