// @flow
import React from 'react';
import DatePickerComponent from 'react-native-datepicker';
import theme from '../../common/themes/defaultTheme';

type Props = {
  onChange: () => void,
  date: string | Date,
  mode?: 'date' | 'datetime' | 'time',
  format?: string,
  minDate?: string | Date,
  maxDate?: string | Date,
  showIcon?: boolean,
  placeholder?: string,
  onOpen?: () => void,
  onClose?: () => void,
  confirmBtnText?: string,
  cancelBtnText?: string,
};

export const DatePicker = ({
  date,
  onChange,
  format = 'YYYY-MM-DD',
  mode = 'date',
  showIcon = false,
  minDate,
  maxDate,
  placeholder = '',
  onOpen,
  onClose,
  confirmBtnText = 'Confirm',
  cancelBtnText = 'Cancel',
}: Props) => {
  return (
    <DatePickerComponent
      style={{ flex: 1, width: null }}
      date={date}
      mode={mode}
      format={format}
      minDate={minDate}
      maxDate={maxDate}
      showIcon={showIcon}
      placeholder={placeholder}
      onDateChange={onChange}
      onOpenModal={onOpen}
      onCloseModal={onClose}
      confirmBtnText={confirmBtnText}
      cancelBtnText={cancelBtnText}
      customStyles={styles.datepicker}
    />
  );
};

const styles = {
  datepicker: {
    dateInput: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderWidth: 0,
    },
    placeholderText: {
      color: '#4e555f',
      fontSize: 16,
    },
    dateText: {
      color: '#4e555f',
      fontSize: 16,
    },
    btnTextConfirm: {
      color: theme.colors.primary,
    },
  },
};
export default DatePicker;
